import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../../config/api.config";
import { regenAccessTokenApi } from "../../api/user.api";

interface PurchasePayload {
    BV: number;
    dp_amount: number;
    plan_amount: number;
    payment_mode: string;
    payment_proof_uri: string;
    is_income_generated: "YES" | "NO";
    purchase_type: "FIRST_PURCHASE" | "SHARE_PURCHASE | REPURCHASE";
    plan_id: string;
}

export const usePurchasePlan = () => {
    return useMutation({
        mutationFn: async (payload: PurchasePayload) => {
            let res = await fetch(
                `${BASE_URL}/v1/planpurchase`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(payload),
                }
            );

            if (res.status === 401) {
                try {
                    await regenAccessTokenApi();
                    res = await fetch(`${BASE_URL}/v1/planpurchase`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify(payload),
                    });
                } catch (err) {
                    window.location.href = "/login";
                    throw new Error("Session Expired");
                }
            }

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err?.message || "Plan purchase failed");
            }
            

            return res.json();
        },
    });
};