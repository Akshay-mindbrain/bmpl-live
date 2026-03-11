// src/hooks/auth/useCreateUser.ts
import { useMutation } from "@tanstack/react-query";
import { CreateUserApi } from "../../api/user.api";
import type { CreateUserPayload } from "../../types/userauth";

export const useCreateUser = () => {
    return useMutation({
        mutationFn: (payload: CreateUserPayload) =>
            CreateUserApi(payload),
    });
};