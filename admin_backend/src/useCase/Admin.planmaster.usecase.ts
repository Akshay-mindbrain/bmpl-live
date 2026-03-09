import {
  createPlanrepo,
  deletePlanrepo,
  getplanbyIdRepo,
  getPlanRepo,
  updatePlanRepo,
} from "@/data/repositories/Admin.planmaster.repo";
import { CreatePlanDto, UpdatePlanDto } from "@/dto";
import AppError from "@/errors/AppError";
import prisma from "@/prisma-client";
import { convertFeatures } from "@/utils/convertstring";
export const createPlanUsecase = async (dto: CreatePlanDto) => {
  const features = convertFeatures(dto.features);

  return createPlanrepo({
    ...dto,
    features,
  });
};
export const getPlanUsecase = async () => {
  return await getPlanRepo();
};
export const getplanByIdUsecase = async (id: string) => {
  return await getplanbyIdRepo(id);
};
export const updatePlanUSecase = async (id: string, data: UpdatePlanDto) => {
  const isexistingPlan = await prisma.plansMaster.findUnique({
    where: { id },
  });
  if (!isexistingPlan) {
    throw new Error("Plan not found");
  }
  let features;

  if (data.features) {
    features = convertFeatures(data.features);
  }

  return updatePlanRepo(id, {
    ...data,
    ...(features && { features }),
  });
};

export const deleteplanusecase = async (id: string) => {
  const existplan = await prisma.plansMaster.findUnique({
    where: { id },
  });
  if (!existplan) {
    throw AppError.badRequest("plan is not exist");
  }
  return deletePlanrepo(id);
};
