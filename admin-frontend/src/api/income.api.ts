import { BASE_URL } from "../config/api.config";
import { refreshTokeApi } from "./auth.api";


//all income
export const getAllIncomeApi = async (
    page: number,
    limit: number
) => {
    let res = await fetch(
        `${BASE_URL}/v1/income/gettotalincome?page=${page}&limit=${limit}`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (res.status === 401) {
        try {
            await refreshTokeApi();
            res = await fetch(
                `${BASE_URL}/v1/income/gettotalincome?page=${page}&limit=${limit}`,
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
        throw new Error(data?.msg || "Failed to fetch income");
    }

    return data;
};


//date wise income filter
export const getDateWiseIncomeApi = async (
    date: string,
    page: number,
    limit: number
) => {
    let res = await fetch(
        `${BASE_URL}/v1/income/history?date=${date}&page=${page}&limit=${limit}`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (res.status === 401) {
        try {
            await refreshTokeApi();
            res = await fetch(
                `${BASE_URL}/v1/income/history?date=${date}&page=${page}&limit=${limit}`,
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
        throw new Error(data?.msg || "Failed to fetch date wise income");
    }

    return data;
};