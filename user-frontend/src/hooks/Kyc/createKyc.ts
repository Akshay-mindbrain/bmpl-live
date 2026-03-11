import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createKyc } from "../../api/kyc.api";
import { KYC_QUERY_KEYS } from "./useGetKyc";

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const useCreateKyc = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createKyc,

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: KYC_QUERY_KEYS.list });
    },

    onError: (error: unknown) => {
      console.error("Create KYC failed:", getErrorMessage(error));
    },
  });
};
