import { BASE_URL } from "../config/api.config";
import { refreshTokeApi } from "./auth.api";

export const createPlanApi = async (payload: any) => {
    let res = await fetch(`${BASE_URL}/v1/plan/createplan`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
    });

    // If session expired, refresh token and retry once
    if (res.status === 401) {
        try {
            await refreshTokeApi();
            res = await fetch(`${BASE_URL}/v1/plan/createplan`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });
        } catch (err) {
            throw new Error("Session expired. Please login again.");
        }
    }

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || "Create plan failed");
    }

    return data; // This will contain { msg, plan } as per your backend
};


// GET ALL PLANS
export const getPlansApi = async () => {
    let res = await fetch(`${BASE_URL}/v1/plan/getplan`, {
        method: "GET",
        credentials: "include",
    });

    if (res.status === 401) {
        try {
            await refreshTokeApi();
            res = await fetch(`${BASE_URL}/v1/plan/getplan`, {
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
        throw new Error(data?.message || "Fetch plans failed");
    }

    return data;
};

// GET PLAN BY ID
export const getPlanByIdApi = async (id: string) => {
    let res = await fetch(`${BASE_URL}/v1/plan/getplan/${id}`, {
        method: "GET",
        credentials: "include",
    });

    if (res.status === 401) {
        await refreshTokeApi();
        res = await fetch(`${BASE_URL}/v1/plan/getplan/${id}`, {
            method: "GET",
            credentials: "include",
        });
    }

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || "Fetch plan failed");
    }

    return data;
};

// UPDATE PLAN
export const updatePlanApi = async (id: string, payload: any) => {
    let res = await fetch(`${BASE_URL}/v1/plan/updateplan/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
    });

    if (res.status === 401) {
        await refreshTokeApi();
        res = await fetch(`${BASE_URL}/v1/plan/updateplan/${id}`, {
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
        throw new Error(data?.message || "Update plan failed");
    }

    return data;
};

// DELETE PLAN
export const deletePlanApi = async (id: string) => {
    let res = await fetch(`${BASE_URL}/v1/plan/deleteplan/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (res.status === 401) {
        await refreshTokeApi();
        res = await fetch(`${BASE_URL}/v1/plan/deleteplan/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
    }

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || "Delete plan failed");
    }

    return data;
};
