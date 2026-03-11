// src/hooks/user/useGetUser.ts
import { useQuery } from "@tanstack/react-query";
import type { GetUsersParams } from "../../api/user.api";
import { getUserApi } from "../../api/user.api";
import type { GetUsersResponse } from "../../types/user";

export const useGetUser = (params: GetUsersParams) => {
  return useQuery<GetUsersResponse>({
    queryKey: ["users", params],
    queryFn: () => getUserApi(params),
  });
};
