import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdminApi } from "../../api/admin.api";

export const useCreateAdmin=()=>{
    const qc=useQueryClient();
    
    return useMutation({
        mutationFn:createAdminApi,
        onSuccess:()=>{
            qc.invalidateQueries({queryKey:["admin"]});
        },
    });
};