import { useQuery } from "@tanstack/react-query";
import { getPayoutHistoryApi } from "../../api/payout.api";

export const usePayoutHistory = (
  page: number,
  limit: number
) => {
  return useQuery({
    queryKey: ["payout-history", page, limit],
    queryFn: () => getPayoutHistoryApi(page, limit),
    enabled: !!page && !!limit,
  });
};