import prisma from "../../prisma-client";
import { Prisma, Config } from "@prisma/client";

type UpsertConfigInput = {
  autoMemId: Prisma.ConfigCreateInput["autoMemId"];
  userRegistrationNo: number;
  prefixMemId: string;
  minLength: number;
  plan_config_key: string;
  plan_config_value: Prisma.ConfigCreateInput["plan_config_value"];
};

export const getConfig = async (): Promise<Config | null> => {
  return prisma.config.findUnique({
    where: { id: 1 },
  });
};

export const upsertConfig = async (
  data: UpsertConfigInput,
): Promise<Config> => {
  return prisma.config.upsert({
    where: { id: 1 },

    update: {
      autoMemId: data.autoMemId,
      userRegistrationNo: data.userRegistrationNo,
      prefixMemId: data.prefixMemId,
      minLength: data.minLength,
      plan_config_key: data.plan_config_key,
      plan_config_value: data.plan_config_value,
    },

    create: {
      id: 1,
      autoMemId: data.autoMemId,
      userRegistrationNo: data.userRegistrationNo,
      prefixMemId: data.prefixMemId,
      minLength: data.minLength,
      plan_config_key: data.plan_config_key,
      plan_config_value: data.plan_config_value,
    },
  });
};
export const updateConfig = async (
  data: Prisma.ConfigUpdateInput,
): Promise<Config> => {
  return prisma.config.update({
    where: { id: 1 },
    data,
  });
};

export const incrementRegistrationCounter = async (): Promise<Config> => {
  return prisma.config.update({
    where: { id: 1 },
    data: {
      userRegistrationNo: { increment: 1 },
    },
  });
};

export const resetRegistrationCounter = async (): Promise<Config> => {
  return prisma.config.update({
    where: { id: 1 },
    data: { userRegistrationNo: 0 },
  });
};
