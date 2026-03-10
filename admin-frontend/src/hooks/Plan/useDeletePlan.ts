import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePlanApi } from "../../api/plan.api";

export const useDeletePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlanApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });
};
