import { BASE_URL } from "../config/api.config";
import { regenAccessTokenApi } from "./user.api";

export const getUserProfile = async () => {
  let res = await fetch(`${BASE_URL}/v1/users/profile`, {
    method: "GET",
    credentials: "include",
  });

  if (res.status === 401) {
    try {
      await regenAccessTokenApi();
      res = await fetch(`${BASE_URL}/v1/users/profile`, {
        method: "GET",
        credentials: "include",
      });
    } catch (err) {
      window.location.href = "/login";
      throw new Error("Session expired");

    }
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch profile");
  }

  return data;
};



//update profile
export const updateUserProfile = async (payload: any) => {
  let res = await fetch(`${BASE_URL}/v1/users`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (res.status === 401) {
    try {
      await regenAccessTokenApi();

      res = await fetch(`${BASE_URL}/v1/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
    } catch (err) {
      window.location.href = "/login";
      throw new Error("Session expired");
    }
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to update profile");
  }

  return data;
};
