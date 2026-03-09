import { useQuery } from "@tanstack/react-query";
import { getPendingKycApi } from "../../api/kyc.api";

export const usePendingKyc = (page: number, limit: number) =>
  useQuery({
    queryKey: ["kyc", "pending", page, limit],
    queryFn: () => getPendingKycApi({ page, limit })
  });
