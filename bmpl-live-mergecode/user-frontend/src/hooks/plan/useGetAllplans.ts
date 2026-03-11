import { useQuery } from "@tanstack/react-query";
import { getPlans } from "../../api/plan.api";

export interface Plan {
  id: number;
  planName: string;
  price: number;
  BV: number;
  Description: string;
  dp_amount: number;
  status: string;
}

export function usePlan() {
  return useQuery<Plan[]>({
    queryKey: ["plans"],
    queryFn: getPlans,
  });
}