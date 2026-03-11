import { useQuery } from "@tanstack/react-query";
import { getPlansApi } from "../../api/plan.api";


export const usePlans=()=>{
    return useQuery({
        queryKey:["plans"],
        queryFn:getPlansApi,
    });
};