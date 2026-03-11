import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdminApi } from "../../api/admin.api";

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteAdminApi(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin"],
      });
    },

    onError: (error: any) => {
      console.error("Delete admin failed:", error?.message);
    },
  });
};
