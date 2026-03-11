import { getConfig } from "@/data/repositories/Config.Repository";
import AppError from "@/errors/AppError";
import { ApproveStatus } from "@prisma/client";

export const getPlanApprovalMode = async (): Promise<ApproveStatus> => {
  const config = await getConfig();

  if (!config) throw AppError.internal("System configuration not found");

  return config.plan_config_value;
};
