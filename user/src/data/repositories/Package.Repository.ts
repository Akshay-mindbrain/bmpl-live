//This is Plan_master Repositorys [if required change the naming of this Repository in future]
import prisma from "../../prisma-client";
import { PlansMaster, Prisma } from "@prisma/client";

export const createPackage = async (data: any): Promise<PlansMaster> => {
  return prisma.plansMaster.create({ data });
};

export const getAllPlansMaster = async (): Promise<PlansMaster[]> => {
  return prisma.plansMaster.findMany({
    orderBy: { planName: "asc" },
  });
};

export const getPackageById = async (
  id: string,
): Promise<PlansMaster | null> => {
  return prisma.plansMaster.findUnique({
    where: { id },
  });
};

export const updatePackage = async (
  id: string,
  data: any,
): Promise<PlansMaster> => {
  return prisma.plansMaster.update({
    where: { id },
    data,
  });
};

export const deletePackage = async (id: string): Promise<PlansMaster> => {
  return prisma.plansMaster.delete({
    where: { id },
  });
};
