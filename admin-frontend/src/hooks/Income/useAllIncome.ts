import { useQuery } from "@tanstack/react-query";
import { getAllIncomeApi } from "../../api/income.api";

export const useAllIncome = (page: number, limit: number) => {
    return useQuery({
        queryKey: ["all-income", page, limit],
        queryFn: () => getAllIncomeApi(page, limit),
    });
};