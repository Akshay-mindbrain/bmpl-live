import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { logoutApi } from "../../api/auth.api";

interface LogoutResponse {
  msg: string;
}

interface LogoutData {}

export const useLogout = (): UseMutationResult<LogoutResponse, Error, LogoutData> => {
  return useMutation({
    mutationFn: logoutApi,
    onError: (error: any) => {
      console.error("Logout failed:", error.message);
    },
  });
};
