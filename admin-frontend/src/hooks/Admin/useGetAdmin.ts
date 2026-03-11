import { useQuery } from "@tanstack/react-query";
import { getAdminApi } from "../../api/admin.api";

export const useGetAdmin=()=>{
    return useQuery({
        queryKey:["admin"],
        queryFn:getAdminApi,
    });
};