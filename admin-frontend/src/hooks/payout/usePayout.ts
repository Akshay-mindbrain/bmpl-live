import { useQuery } from "@tanstack/react-query";
import { getPayoutApi } from "../../api/payout.api";

export const usePayout = (
    page: number,
    limit: number
) => {
    return useQuery({
        queryKey: ["payout", page, limit],
        queryFn: () => getPayoutApi(page, limit),
        enabled: !!page && !!limit,
    });
};