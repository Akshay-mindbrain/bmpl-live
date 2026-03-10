import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserStatus } from "../../api/user.api";

export const useUpdateUserStatus = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      updateUserStatus(id, status),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
