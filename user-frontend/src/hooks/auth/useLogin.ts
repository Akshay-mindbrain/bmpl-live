import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../api/user.api";
import type { LoginPayload } from "../../types/userauth";

export const useLogin = () => {
    return useMutation({
        mutationFn: (payload: LoginPayload) => loginApi(payload),
    });
};