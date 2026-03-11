import { useQuery } from "@tanstack/react-query";
import { getAllKyc } from "../../api/kyc.api";

export const KYC_QUERY_KEYS = {
  list: ["kyc", "list"] as const,
};

export const useMyKyc = () => {
  return useQuery({
    queryKey: KYC_QUERY_KEYS.list,
    queryFn: getAllKyc,
    refetchOnWindowFocus: false,
  });
};
