import { useQuery } from "@tanstack/react-query";
import { getLastMonthTeamBVApi } from "../../api/bv.api";

export const useLastMonthTeamBV =(userId:number)=>{
    return useQuery({
        queryKey:["last-month-team-bv", userId],
        queryFn:()=>getLastMonthTeamBVApi(userId),
        enabled:!!userId
    });
}