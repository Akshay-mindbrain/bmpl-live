import { BASE_URL } from "../config/api.config";
import { refreshTokeApi } from "./auth.api";

export const getRewardsApi = async () => {
    const fetchRewards = async () => {
        return await fetch(`${BASE_URL}/v1/reward/rewardhistory`, {
            method: "GET",
            credentials: "include",
        });
    };

    try {
        let res = await fetchRewards();

        if (res.status === 401) {
            try {
                await refreshTokeApi();
                res = await fetchRewards();
            } catch (err) {
                window.location.href = "/login";
                throw new Error("Session expired");
            }
        }

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data?.message || "Failed to fetch rewards");
        }

        return data?.rewards ?? [];

    } catch (err) {
        console.error(err);
        return [];
    }
};