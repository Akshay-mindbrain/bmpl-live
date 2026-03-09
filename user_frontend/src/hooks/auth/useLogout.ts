import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "../../api/user.api";

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutApi,
  });
};