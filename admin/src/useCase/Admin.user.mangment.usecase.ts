import { UpdateUserDto } from "@/dto";
import {
  getUsersRepo,
  updateUserRepo,
  userStatusRepo,
} from "@/data/repositories/Admin.user.magment.repo";
import { Status } from "@prisma/client";

export const getUsersUsecase = async (
  search?: string,
  page = 1,
  limit = 20,
) => {
  const { users, total } = await getUsersRepo(search, page, limit);

  return {
    users,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};
export const updateUserStatusUsecase = async (id: number, status: string) => {
  const normalizedStatus = status.toUpperCase().trim();

  if (!Object.values(Status).includes(normalizedStatus as Status)) {
    throw new Error("Invalid status");
  }

  return await userStatusRepo(id, normalizedStatus as Status);
};

export const updateUserUsecase = async (id: number, body: UpdateUserDto) => {
  const updateData: UpdateUserDto = {};

  if (body.firstName) updateData.firstName = body.firstName;
  if (body.lastName) updateData.lastName = body.lastName;
  if (body.mobile) updateData.mobile = body.mobile;
  if (body.email) updateData.email = body.email;

  if (body.sponsorId !== undefined) updateData.sponsorId = body.sponsorId;

  if (body.parentId !== undefined) updateData.parentId = body.parentId;

  if (body.member_Id) updateData.member_Id = body.member_Id;

  if (body.legPosition) updateData.legPosition = body.legPosition;

  return updateUserRepo(id, updateData);
};
