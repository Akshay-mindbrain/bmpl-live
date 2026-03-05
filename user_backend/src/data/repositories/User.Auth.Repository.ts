import prisma from "@/prisma-client";
import { Prisma } from "@prisma/client";

export const findByMobile = async (mobile: string) => {
  return prisma.user.findUnique({
    where: { mobile },
  });
};
export const findById = async (id: number) => {
  if (!id) {
    throw new Error("User ID is required");
  }

  return prisma.user.findUnique({
    where: { id },
  });
};

export const storeRefreshToken = (id: number, refreshToken: string) => {
  return prisma.user.update({
    where: { id },
    data: { refreshToken: refreshToken },
  });
};
export const getUser = async (id: number): Promise<any> => {
  if (!id) {
    throw new Error("User ID is required");
  }

  return prisma.admin.findUnique({
    where: { id },
  });
};

export const logoutRepo = async (id: number) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: { refreshToken: null },
  });
};
