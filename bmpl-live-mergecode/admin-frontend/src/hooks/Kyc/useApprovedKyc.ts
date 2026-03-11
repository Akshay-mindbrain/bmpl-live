import { useQuery } from "@tanstack/react-query";
import { getApprovedKycApi } from "../../api/kyc.api";

export const useApprovedKyc = (page: number, limit: number) =>
  useQuery({
    queryKey: ["kyc", "approved", page, limit],
    queryFn: () => getApprovedKycApi({ page, limit }),
  });
