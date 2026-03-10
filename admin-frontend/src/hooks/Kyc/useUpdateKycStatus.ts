import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateKycStatusApi } from "../../api/kyc.api";

export const useUpdateKycStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      action,
      remark,
    }: {
      id: number;
      action: "APPROVE" | "REJECT";
      remark?: string;
    }) => updateKycStatusApi(id, { action, remark }),

    onSuccess: () => {
      // Refresh all KYC-related queries
      queryClient.invalidateQueries({ queryKey: ["kyc"] });
    },
  });
};
