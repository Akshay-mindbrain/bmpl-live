import { useQuery } from "@tanstack/react-query";
import { getTotalRepurchaseBVApi } from "../../api/bv.api";

export const useTotalRepurchaseBV = (userId: number) => {
    return useQuery({
        queryKey: ["total-repurchase-bv", userId],
        queryFn: () => getTotalRepurchaseBVApi(userId),
        enabled: !!userId,
    });
};