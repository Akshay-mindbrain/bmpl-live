import { useQuery } from "@tanstack/react-query";
import { getOneKycApi } from "../../api/kyc.api";

export const useOneKyc = (id: number) =>
  useQuery({
    queryKey: ["kyc", "detail", id],
    queryFn: () => getOneKycApi(id),
    enabled: !!id,
  });
