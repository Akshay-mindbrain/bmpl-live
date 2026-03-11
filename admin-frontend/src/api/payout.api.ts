import { BASE_URL } from "../config/api.config";
import { refreshTokeApi } from "./auth.api";


// GENERATE PAYOUT
export const generatePayoutApi = async () => {
    let res = await fetch(`${BASE_URL}/v1/payout/generate`, {
        method: "POST",
        credentials: "include",
    });

    if (res.status === 401) {
        try {
            await refreshTokeApi();
            res = await fetch(`${BASE_URL}/v1/payout/generate`, {
                method: "POST",
                credentials: "include",
            });
        } catch {
            window.location.href = "/login";
            throw new Error("Session expired");
        }
    }

    const data = await res.json();

    if (!res.ok || data.success === false) {
        throw new Error(data?.msg || "Payout generation failed");
    }

    return data;
};


// GET PAYOUT LIST
export const getPayoutApi = async (
    page: number,
    limit: number
) => {
    let res = await fetch(
        `${BASE_URL}/v1/payout/get?page=${page}&limit=${limit}`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (res.status === 401) {
        try {
            await refreshTokeApi();
            res = await fetch(
                `${BASE_URL}/v1/payout/get?page=${page}&limit=${limit}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
        } catch (error) {
            window.location.href = "/login";
            throw new Error("Session expired");
        }
    }

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || "Failed to fetch payout list");
    }

    return data;
};

// GET PAYOUT HISTORY
export const getPayoutHistoryApi = async (
    page: number,
    limit: number
) => {
    let res = await fetch(
        `${BASE_URL}/v1/payout/history?page=${page}&limit=${limit}`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (res.status === 401) {
        try {
            await refreshTokeApi();
            res = await fetch(
                `${BASE_URL}/v1/payout/history?page=${page}&limit=${limit}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
        } catch (error) {
            window.location.href = "/login";
            throw new Error("Session expired");
        }
    }

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || "Failed to fetch payout history");
    }

    return data;
};