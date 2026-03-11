import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { loginApi } from "../../api/auth.api";

interface LoginData {
  username: string;
  password: string;
}

// Match backend response
interface LoginResponse {
  msg: string;
}

interface isLoading {
    isLoading:boolean
}

export const useLogin = (): UseMutationResult<LoginResponse, Error, LoginData, isLoading> => {
  return useMutation({
    mutationFn: loginApi,
  });
};
