import { PrismaClient } from "@prisma/client";
import { CreateUserActivityLogDTO, GetLogsDTO } from "../../dto";

const prisma = new PrismaClient();

export const createUserActivityLog = async ({
  userId,
  action,
  details,
}: CreateUserActivityLogDTO) => {
  return prisma.userActivityLog.create({
    data: {
      userId: userId ?? null,
      action: action ?? null,
      details: details ?? null,
    },
  });
};

export const getAllUserActivityLogs = async ({
  userId,
  action,
  skip = 0,
  take = 10,
}: GetLogsDTO = {}) => {
  return prisma.userActivityLog.findMany({
    where: {
      ...(userId !== undefined && { userId }),
      ...(action !== undefined && { action }),
    },
    orderBy: { createdAt: "desc" },
    skip,
    take,
  });
};

export const getUserActivityLogById = async (id: number) => {
  return prisma.userActivityLog.findUnique({
    where: { id },
  });
};

export const updateUserActivityLog = async (
  id: number,
  data: CreateUserActivityLogDTO,
) => {
  const updateData: any = {};

  if (data.userId !== undefined) updateData.userId = data.userId;
  if (data.action !== undefined) updateData.action = data.action;
  if (data.details !== undefined) updateData.details = data.details;

  return prisma.userActivityLog.update({
    where: { id },
    data: updateData,
  });
};

export const deleteUserActivityLog = async (id: number) => {
  return prisma.userActivityLog.delete({
    where: { id },
  });
};
