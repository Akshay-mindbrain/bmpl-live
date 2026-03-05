import { BASE_URL } from "../config/api.config";
import { regenAccessTokenApi } from "./user.api";

export interface PurchasePayload {
  BV: number;
  dp_amount: number;
  plan_amount: number;
  payment_mode: string;
  payment_proof_uri: string;
  is_income_generated: string;
  purchase_type: string;
  plan_id: string; // plan id (uuid)
  // user: number;
}

export const purchasePlan = async (payload: PurchasePayload) => {
  let res = await fetch(`${BASE_URL}/planpurchase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  //handel refresh token
  if (res.status === 401) {
    try {
      await regenAccessTokenApi();
      res = await fetch(`${BASE_URL}/planpurchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
    } catch (err) {
      window.location.href = "/login";
      throw new Error("Session Expired");
    }
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Plan purchase failed");
  }

  return data;
};