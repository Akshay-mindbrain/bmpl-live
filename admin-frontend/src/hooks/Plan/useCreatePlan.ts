import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlanApi } from "../../api/plan.api";

export const useCreatePlan=()=>{
    const qc=useQueryClient();
    return useMutation({
        mutationFn:createPlanApi,
        onSuccess:()=>{
            qc.invalidateQueries({queryKey:["plans"]});
        },
    });
};