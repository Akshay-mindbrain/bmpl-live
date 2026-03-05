import { BASE_URL } from "../config/api.config";
import { regenAccessTokenApi } from "./user.api";

// GET DOWNLINE BY USER ID
export const getDownlineApi = async () => {
    let res = await fetch(`${BASE_URL}/v1/users/downline`, {
        method: "GET",
        credentials: "include",
    });

    if (res.status === 401) {
        try {
            await regenAccessTokenApi();

            res = await fetch(`${BASE_URL}/v1/users/downline`, {
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
        throw new Error(data?.message || "Failed to fetch downline");
    }

    return data;
};


// GET UPLINE
export const getUplineApi = async () => {
    let res = await fetch(`${BASE_URL}/v1/users/upline`, {
        method: "GET",
        credentials: "include",
    });

    if (res.status === 401) {
        try {
            await regenAccessTokenApi();

            res = await fetch(`${BASE_URL}/v1/users/upline`, {
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
        throw new Error(data?.message || "Failed to fetch upline");
    }

    return data;
};