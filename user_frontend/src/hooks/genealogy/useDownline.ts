import { useQuery } from "@tanstack/react-query";
import { getDownlineApi } from "../../api/genealogy.api";

export const useDownline = () => {
  return useQuery({
    queryKey: ["downline"],
    queryFn: getDownlineApi,
  });
};