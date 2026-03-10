import { getRewardHistory, rewardrepo } from "@/data/repositories/reward.repo";

export const rewordUsecase = async () => {
  return await rewardrepo();
};
export const rewardhistoryHistryusecase = async () => {
  return await getRewardHistory();
};
