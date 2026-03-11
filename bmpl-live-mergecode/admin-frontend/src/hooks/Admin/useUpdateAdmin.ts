import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdminApi } from "../../api/admin.api";

export const useUpdateAdmin = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: any;
    }) => updateAdminApi(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin"] });
    },
  });
};
