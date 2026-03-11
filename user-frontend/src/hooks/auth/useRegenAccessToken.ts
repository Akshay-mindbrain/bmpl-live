import { useMutation } from "@tanstack/react-query";
import { regenAccessTokenApi } from "../../api/user.api";

export const useRegenAccessToken = () => {
    return useMutation({
        mutationFn: regenAccessTokenApi,
    });
};