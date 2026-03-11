import { useQuery } from "@tanstack/react-query";
import { getTotalFirstPurchaseBVApi } from "../../api/bv.api";

export const useTotalFirstPurchaseBV = (userId: number) => {
    return useQuery({
        queryKey: ["total-first-purchase-bv", userId],
        queryFn: () => getTotalFirstPurchaseBVApi(userId),
        enabled: !!userId,
    });
};