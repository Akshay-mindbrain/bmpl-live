import express from "express";
import prisma from "@/prisma-client";

export const findbymobile = (mobile: string) => {
  return prisma.admin.findUnique({
    where: { mobile },
  });
};
export const getAdminRepo = (id: number) => {
  return prisma.admin.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      mobile: true,
      username: true,
      adminType: true,
      status: true,
      createdAt: true,
      updatedAt: true,

      password: false,
      refreshToken: false,
    },
  });
};

export const updateAdminRepo = async (id: number, data: any) => {
  return await prisma.admin.update({ where: { id }, data });
};

export const deleteAdminRepo = async (id: number) => {
  return await prisma.admin.delete({
    where: { id },
  });
};
