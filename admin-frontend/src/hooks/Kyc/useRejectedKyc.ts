import { useQuery } from "@tanstack/react-query";
import { getRejectedKycApi } from "../../api/kyc.api";

export const useRejectedKyc = (page: number, limit: number) =>
  useQuery({
    queryKey: ["kyc", "rejected", page, limit],
    queryFn: () => getRejectedKycApi({ page, limit }),
  });
