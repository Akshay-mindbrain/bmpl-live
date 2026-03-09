import { BASE_URL } from "../config/api.config";
import { refreshTokeApi } from "./auth.api";

// CREATE ADMIN
export const createAdminApi = async (payload: any) => {
  let res = await fetch(`${BASE_URL}/v1/admin/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (res.status === 401) {
    await refreshTokeApi();
    res = await fetch(`${BASE_URL}/v1/admin/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.msg || "Create admin failed");
  }

  return data;
};

// GET ADMIN
export const getAdminApi = async () => {
  let res = await fetch(`${BASE_URL}/v1/admin/get`, {
    method: "GET",
    credentials: "include",
  });

  if (res.status === 401) {
    try {
      await refreshTokeApi();
      res = await fetch(`${BASE_URL}/v1/admin/get`, {
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
    throw new Error(data?.msg || "Fetch admin failed");
  }

  return data;
};

// UPDATE ADMIN
export const updateAdminApi = async (id: number, payload: any) => {
  let res = await fetch(`${BASE_URL}/v1/admin/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (res.status === 401) {
    await refreshTokeApi();
    res = await fetch(`${BASE_URL}/v1/admin/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.msg || "Update failed");
  }

  return data;
};

// DELETE ADMIN
export const deleteAdminApi = async (id: number) => {
  let res = await fetch(`${BASE_URL}/v1/admin/delete/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (res.status === 401) {
    await refreshTokeApi();
    res = await fetch(`${BASE_URL}/v1/admin/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.msg || "Delete failed");
  }

  return data;
};
