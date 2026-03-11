import { useQuery } from "@tanstack/react-query";
import { getUserTotalBVApi } from "../../api/bv.api";

export const useUserTotalBV =(userId:number)=>{
    return useQuery({
        queryKey:['user-total-bv', userId],
        queryFn:()=>getUserTotalBVApi(userId),
        enabled:!!userId
    })
}   