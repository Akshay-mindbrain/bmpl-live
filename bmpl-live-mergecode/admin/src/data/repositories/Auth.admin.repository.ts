import prisma from "@/prisma-client";
import { Prisma } from "@prisma/client";
export const createAdminRepo = (data: Prisma.AdminCreateInput) => {
  return prisma.admin.create({
    data,
  });
};

export const findByMobile = async (mobile: string) => {
  return prisma.admin.findUnique({
    where: { mobile },
  });
};
export const findById = async (id: number) => {
  if (!id) {
    throw new Error("Admin ID is required");
  }

  return prisma.admin.findUnique({
    where: { id },
  });
};

export const storeRefreshToken = (id: number, refrshToken: string) => {
  return prisma.admin.update({
    where: { id },
    data: { refreshToken: refrshToken },
  });
};
export const getAdmin = async (id: number): Promise<any> => {
  if (!id) {
    throw new Error("Admin ID is required");
  }

  return prisma.admin.findUnique({
    where: { id },
  });
};

export const logoutRepo = async (id: number) => {
  return await prisma.admin.update({
    where: {
      id,
    },
    data: { refreshToken: null },
  });
};
