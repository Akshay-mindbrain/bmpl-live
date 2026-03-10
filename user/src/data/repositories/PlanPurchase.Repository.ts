import prisma from "../../prisma-client";
import { PlanPurchase, Prisma, PurchaseStatus } from "@prisma/client";

export const create = async (
  data: Prisma.PlanPurchaseCreateInput,
): Promise<PlanPurchase> => {
  return prisma.planPurchase.create({ data });
};

export const getAll = async (): Promise<PlanPurchase[]> => {
  return prisma.planPurchase.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const findById = async (id: number): Promise<PlanPurchase | null> => {
  return prisma.planPurchase.findUnique({
    where: { id },
    include: {
      user: true,
      plan: true,
      approvedByAdmin: true,
    },
  });
};

export const findByUserFirstPurchase = async (
  userId: number,
): Promise<PlanPurchase | null> => {
  return prisma.planPurchase.findFirst({
    where: {
      user_id: userId,
      purchase_type: "FIRST_PURCHASE",
    },
  });
};

export const findByUserId = async (userId: number): Promise<PlanPurchase[]> => {
  return prisma.planPurchase.findMany({
    where: { user_id: userId },
    include: { plan: true },
    orderBy: { createdAt: "desc" },
  });
};

export const findByPlanId = async (planId: string): Promise<PlanPurchase[]> => {
  return prisma.planPurchase.findMany({
    where: { plan_id: planId },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
};

export const getPendingApprovals = async (): Promise<PlanPurchase[]> => {
  return prisma.planPurchase.findMany({
    where: {
      status: PurchaseStatus.PENDING,
    },
    include: {
      user: true,
      plan: true,
    },
    orderBy: { createdAt: "asc" },
  });
};

export const approvePurchase = async (purchaseId: number, adminId: number) => {
  return prisma.planPurchase.update({
    where: { id: purchaseId },
    data: {
      approved_by: adminId,
      status: PurchaseStatus.APPROVED,
      approved_at: new Date(),
    },
  });
};

export const markIncomeGenerated = async (
  purchaseId: number,
): Promise<PlanPurchase> => {
  return prisma.planPurchase.update({
    where: { id: purchaseId },
    data: {
      is_income_generated: "YES",
    },
  });
};
