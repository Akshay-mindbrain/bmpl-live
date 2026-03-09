import { BASE_URL } from "../config/api.config";
import { refreshTokeApi } from "./auth.api";

export interface GetUsersParams {
  search?: string;
  page?: number;
  limit?: number;
}


//get user/agents
export const getUserApi = async ({
  search = "",
  page = 1,
  limit = 20,
}: GetUsersParams) => {
  const query = new URLSearchParams({
    search,
    page: String(page),
    limit: String(limit),
  }).toString();

  let res = await fetch(`${BASE_URL}/v1/user/getuser?${query}`, {
    method: "GET",
    credentials: "include",
  });

  if (res.status === 401) {
    try {
      await refreshTokeApi();
      res = await fetch(`${BASE_URL}/v1/user/getuser?${query}`, {
        method: "GET",
        credentials: "include",
      });
    } catch {
      window.location.href = "/login";
      throw new Error("Session expired");
    }
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch users");
  }

  return data;
};



export const updateUserStatus = async (id: number, status: string) => {
  try {
    let response = await fetch(`${BASE_URL}/v1/user/status/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ status }), // ← correct body
    });

    // Token refresh logic
    if (response.status === 401) {
      try {
        await refreshTokeApi();
        response = await fetch(`${BASE_URL}/v1/user/status/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ status }),
        });
      } catch (refreshErr) {
        window.location.href = '/login';
        throw new Error('Session expired');
      }
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.msg || 'Failed to update user status');
    }

    return data;
  } catch (err: any) {
    console.error('Update user status error:', err);
    throw err;
  }
};