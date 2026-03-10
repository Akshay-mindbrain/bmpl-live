import prisma from "@/prisma-client";
import { CreateConfigDto } from "@/dto";
import { ApproveStatus } from "@prisma/client";

export const createConfigRepo = async (data: CreateConfigDto) => {
  return prisma.config.upsert({
    where: { id: 1 },
    update: data,
    create: {
      id: 1,
      plan_config_key: "PLAN_APPROVAL_MODE",
      plan_config_value: ApproveStatus.AUTO,
      ...data,
    },
  });
};
