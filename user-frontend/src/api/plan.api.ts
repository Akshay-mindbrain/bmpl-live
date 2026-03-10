import { BASE_URL } from "../config/api.config";
import { regenAccessTokenApi } from "./user.api";

export interface Purchase {
  id: string;
  planName: string;
  amount: number;
  status: "SUCCESS" | "FAILED" | "PENDING";
  createdAt: string;
}

export interface GetPurchasesResponse {
  success: boolean;
  purchases: Purchase[];
  total: number;
}

// Get all plans
export const getPlans = async () => {
  try {
    let res = await fetch(`${BASE_URL}/v1/package`, {
      method: "GET",
      credentials: "include",
    });

    // Retry if access token expired
    if (res.status === 401) {
      try {
        await regenAccessTokenApi();
        res = await fetch(`${BASE_URL}/v1/package`, {
          method: "GET",
          credentials: "include",
        });
      } catch {
        window.location.href = "/login";
        throw new Error("Session expired");
      }
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to fetch plans");

    return data.data;
  } catch (err: any) {
    console.error("getPlans error:", err.message || err);
    throw err;
  }
};

// Get purchases by user
export const getPurchasesByUser = async (): Promise<GetPurchasesResponse> => {
  try {
    let res = await fetch(`${BASE_URL}/v1/planpurchase/my-purchases`, {
      method: "GET",
      credentials: "include",
    });

    // Retry if access token expired
    if (res.status === 401) {
      try {
        await regenAccessTokenApi();
        res = await fetch(`${BASE_URL}/v1/planpurchase/my-purchases`, {
          method: "GET",
          credentials: "include",
        });
      } catch {
        window.location.href = "/login";
        throw new Error("Session expired");
      }
    }

    const data = await res.json();
    console.log(data);



    if (!res.ok) throw new Error(data?.message || "Failed to fetch purchases");

    return data;
  } catch (err: any) {
    console.error("getPurchasesByUser error:", err.message || err);
    throw err;
  }
};