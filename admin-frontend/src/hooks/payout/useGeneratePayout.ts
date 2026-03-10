import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generatePayoutApi } from "../../api/payout.api";

export const useGeneratePayout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: generatePayoutApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payouts"] });
        },
    });
};