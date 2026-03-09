import { useQuery } from "@tanstack/react-query";
import { getDateWiseIncomeApi } from "../../api/income.api";
import type { DateWiseIncomeResponse } from "../../types/income";

export const useDateWiseIncome = (
    date: string | undefined,
    page: number,
    limit: number
) => {
    return useQuery<DateWiseIncomeResponse, Error>({
        queryKey: ["date-wise-income", date, page, limit],
        queryFn: () => getDateWiseIncomeApi(date!, page, limit),
        enabled: !!date,
    });
};