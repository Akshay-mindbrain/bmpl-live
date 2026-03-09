import { useQuery } from "@tanstack/react-query";
import { getPurchasesByUser } from "../../api/plan.api";

export const usePurchasesByUser = () => {
    return useQuery({
        queryKey: ["purchases", "me"],
        queryFn: getPurchasesByUser,
    });
};