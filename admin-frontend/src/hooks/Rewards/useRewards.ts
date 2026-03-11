import { useQuery } from "@tanstack/react-query";
import { getRewardsApi } from "../../api/rewards.api";

export const useRewards = () => {
    return useQuery({
        queryKey: ["rewards"],
        queryFn: getRewardsApi,
    });
};