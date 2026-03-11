import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePlanApi } from "../../api/plan.api";

export const useUpdatePlan = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: any }) =>
            updatePlanApi(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["plans"] });
        },
    });
};
