import { useQuery } from "@tanstack/react-query";
import { getUplineApi } from "../../api/genealogy.api";

export const useUpline = () => {
    return useQuery({
        queryKey: ["upline"],
        queryFn: getUplineApi,
    });
};