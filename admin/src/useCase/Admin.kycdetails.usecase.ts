import {
  getkycRepo,
  getKycPendingrepo,
  getKycApproveRepo,
  getKycRejectRepo,
  getOneKyc,
  rejectKycStatus,
  approveKycstatus,
} from "@/data/repositories/Admin.kycdetails.repo";
import AppError from "@/errors/AppError";
import prisma from "@/prisma-client";
import { KycStatus } from "@prisma/client";

const buildResponse = (
  data: any,
  total: number,
  page: number,
  limit: number,
) => ({
  data,
  pagination: {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  },
});

export const getPendingKycUsecase = async (page: number, limit: number) => {
  const { data, total } = await getKycPendingrepo(page, limit);
  return buildResponse(data, total, page, limit);
};

export const getApprovedKycUsecase = async (page: number, limit: number) => {
  const { data, total } = await getKycApproveRepo(page, limit);
  return buildResponse(data, total, page, limit);
};

export const getRejectedKycusecase = async (page: number, limit: number) => {
  const { data, total } = await getKycRejectRepo(page, limit);
  return buildResponse(data, total, page, limit);
};

export const getAllKycusecase = async (page: number, limit: number) => {
  const { data, total } = await getkycRepo(page, limit);
  return buildResponse(data, total, page, limit);
};
export const getOneKycusecase = async (id: number) => {
  return await getOneKyc(id);
};
export const updateKYcstatusUsecase = async (
  id: number,
  action: string,
  remark?: string,
) => {
  const normalizedAction = action?.trim().toUpperCase();
  const kyc = await prisma.kyc.findUnique({
    where: { id },
  });

  if (!kyc) {
    throw AppError.notFound("KYC not found");
  }

  if (kyc.status !== KycStatus.PENDING) {
    throw AppError.badRequest("Only pending KYC can be updated");
  }

  // Reject case
  if (normalizedAction === "REJECT") {
    if (!remark) {
      throw AppError.badRequest("Remark is required for rejection");
    }

    return rejectKycStatus(id, remark);
  }

  if (normalizedAction === "APPROVE") {
    return approveKycstatus(id, kyc.userId);
  }

  throw AppError.badRequest("Invalid action");
};
