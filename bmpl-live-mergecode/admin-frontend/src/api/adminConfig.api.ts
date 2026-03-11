import { BASE_URL } from "../config/api.config";
import { refreshTokeApi } from "./auth.api";
import type { ConfigPayload } from "../types/config";

export const postConfigApi = async (
  payload?: Partial<ConfigPayload>
) => {
  let res = await fetch(`${BASE_URL}/v1/config/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload ?? {}),
  });

  if (res.status === 401) {
    await refreshTokeApi();
    res = await fetch(`${BASE_URL}/v1/config/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload ?? {}),
    });
  }

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.msg || "Config request failed");
  }

  return json.data;
};