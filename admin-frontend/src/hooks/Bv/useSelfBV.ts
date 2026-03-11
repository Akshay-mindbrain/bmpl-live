import { useQuery } from "@tanstack/react-query";
import { getSelfBVApi } from "../../api/bv.api";
export const useSelfBV = (id: number) => {
    return useQuery({
        queryKey: ["self-bv", id],
        queryFn: () => getSelfBVApi(id),
        enabled: !!id,
    });
};