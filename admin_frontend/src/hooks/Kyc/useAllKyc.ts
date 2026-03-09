import { useQuery } from "@tanstack/react-query";
import { getAllKycApi } from "../../api/kyc.api";

export const useAllKyc = (page: number, limit: number) =>
  useQuery({
    queryKey: ["kyc", "all", page, limit],
    queryFn: () => getAllKycApi({ page, limit }),
  });
