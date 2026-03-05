import { BASE_URL } from "../config/api.config";
import type { CreateUserPayload, LoginPayload } from "../types/userauth";

const parseJsonSafe = async (res: Response) => {
    try {
        return await res.json();
    } catch {
        return {};
    }
};

//signup api
export const CreateUserApi = async (
    payload: CreateUserPayload
) => {
    const res = await fetch(`${BASE_URL}/v1/users/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (res.status === 401) {
        throw new Error("Unauthorized");
    }

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || "User creation failed");
    }

    return data;
};


//login api
export const loginApi = async (payload: LoginPayload) => {
    let res: Response;

    try {
        res = await fetch(`${BASE_URL}/v1/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(payload),
        });
    } catch {
        throw new Error(
            "Unable to reach server. Check API base URL / dev proxy and backend status.",
        );
    }

    const data = await parseJsonSafe(res);
    localStorage.setItem("data", JSON.stringify(data.data)); // Store memId in localStorage
    if (!res.ok) {
        throw new Error(data?.error || data?.message || "Login failed");
    }

    return data;
};



//logout api
export const logoutApi = async () => {
    try {
        let res = await fetch(`${BASE_URL}/v1/users/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (res.status === 401) {
            try {
                await regenAccessTokenApi();
                res = await fetch(`${BASE_URL}/v1/users/logout`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });
            } catch (err) {
                window.location.href = "/login";
                console.log("Session Expired");
            }
        }

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data?.message || "Logout failed");
        }

        return data;
    } catch (error: any) {
        console.error("Logout API Error:", error.message);
        throw error;
    }
};


//regen access token
export const regenAccessTokenApi = async () => {
    try {
        const res = await fetch(`${BASE_URL}/v1/users/regen-token`, {
            method: "POST",
            credentials: "include"
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data?.message || "Token refresh failed...");
        }
    } catch (err) {
        console.log("Logout API Error:", err);
        throw err;
    }
}
