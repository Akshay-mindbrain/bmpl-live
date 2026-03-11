import bcrypt from "bcryptjs";
import { createAdminRepo } from "@/data/repositories/Auth.admin.repository";
import {
  deleteAdminRepo,
  getAdminRepo,
  updateAdminRepo,
} from "@/data/repositories/Admin.repository";
import { AdminType } from "@prisma/client";
import { findByMobile } from "@/data/repositories/Auth.admin.repository";
import prisma from "@/prisma-client";
import { CreateAdminDTO, UpdateAdminDTO } from "@/dto";

export const createAdminUsecase = async (data: CreateAdminDTO) => {
  const [mobileExists, emailExists] = await Promise.all([
    prisma.admin.findUnique({ where: { mobile: data.mobile } }),
    data.email
      ? prisma.admin.findUnique({ where: { email: data.email } })
      : null,
  ]);

  if (mobileExists) {
    throw { status: 400, message: "Mobile already exists" };
  }

  if (emailExists) {
    throw { status: 400, message: "Email already exists" };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return createAdminRepo({
    firstName: data.firstName ?? undefined,
    lastName: data.lastName ?? undefined,
    email: data.email ?? undefined,
    mobile: data.mobile,
    username: data.username ?? data.mobile,
    password: hashedPassword,
    adminType: AdminType.SUPERADMIN,
  });
};

export const getAdminUsecase = (id: number) => {
  return getAdminRepo(id);
};

export const updateAdminUsecase = async (id: number, data: UpdateAdminDTO) => {
  return await updateAdminRepo(id, data);
};

export const deleteAdminUsecase = async (id: number) => {
  return await deleteAdminRepo(id);
};
