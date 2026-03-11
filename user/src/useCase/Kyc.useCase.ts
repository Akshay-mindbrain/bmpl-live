import AppError from "../errors/AppError";
import * as KycRepository from "../data/repositories/Kyc.Repository";
import { Kyc, KycStatus } from "@prisma/client";

type KycSubmissionPayload = {
  aadharNo: string;
  aadharImgUrl: string;
  panNo: string;
  panImageUrl: string;
  bankName: string;
  accountNo: string;
  ifscCode: string;
  branchName: string;
  bankProofImgUrl: string;
};

const normalizeKycSubmissionPayload = (data: any): KycSubmissionPayload => {
  return {
    aadharNo: data.aadharNo,
    aadharImgUrl: data.aadharImgUrl,
    panNo: data.panNo,
    panImageUrl: data.panImageUrl,
    bankName: data.bankName,
    accountNo: data.accountNo,
    ifscCode: data.ifscCode,
    branchName: data.branchName,
    bankProofImgUrl: data.bankProofImgUrl,
  };
};

const buildPendingKycData = (payload: KycSubmissionPayload) => {
  return {
    ...payload,
    status: KycStatus.PENDING,
    rejectReason: null,
  };
};

export const createKyc = async (userId: number, data: any): Promise<Kyc> => {
  if (!data?.aadharNo || !data?.panNo) {
    throw AppError.badRequest("Missing required fields");
  }

  const submissionPayload = normalizeKycSubmissionPayload(data);
  const pendingKycData = buildPendingKycData(submissionPayload);

 return KycRepository.runInTransaction(async (tx) => {

    if (!userId) {
      throw AppError.badRequest("User id is required");
    }

    if (!data?.aadharNo) {
      throw AppError.badRequest("Aadhar number is required");
    }

    if (!data?.panNo) {
      throw AppError.badRequest("PAN number is required");
    }

    const user =
      await KycRepository.getUserKycStatusById(userId, tx);

    if (!user) {
      throw AppError.notFound("User not found");
    }

    const existingKyc =
      await KycRepository.getKycByUserId(userId, tx);

    if (existingKyc) {
      throw AppError.conflict(
        "KYC already submitted. You can update only if rejected"
      );
    }
    const createdKyc = await KycRepository.createKyc(
      {
        ...data,
        status: "PENDING",
        user: { connect: { id: userId } },
        createdBy: null,
        updatedBy: null,
      },
      tx,
    );

    return createdKyc;
  });
};

export const getAllKyc = async (
  userId: number
): Promise<Kyc[]> => {

  /* ================= INPUT VALIDATION ================= */

  if (!userId) {
    throw AppError.badRequest("User id is required");
  }

  /* ================= CORE OPERATION ================= */

  const kycList =
    await KycRepository.getAllKycByUserId(userId);

  /* ================= RETURN ================= */

  return kycList;
};

export const getKycById = async (id: number): Promise<Kyc> => {
  const kyc = await KycRepository.getKycById(id);

  if (!kyc) {
    throw AppError.notFound("KYC record not found");
  }

  return kyc;
};

export const getKycByUserId = async (userId: number): Promise<Kyc> => {
  const kyc = await KycRepository.getKycByUserId(userId);

  if (!kyc) {
    throw AppError.notFound("KYC record not found for this user");
  }

  return kyc;
};

export const updateKyc = async (
  userId: number,
  data: any
): Promise<Kyc> => {

  /* ================= INPUT VALIDATION ================= */

  if (!userId) {
    throw AppError.badRequest("User id is required");
  }

  /* ================= BUSINESS VALIDATION ================= */

  const existing =
    await KycRepository.getKycByUserId(userId);

  if (!existing) {
    throw AppError.notFound("KYC record not found for this user");
  }

  if (existing.status === KycStatus.APPROVED) {
    throw AppError.forbidden(
      "Approved KYC cannot be modified"
    );
  }

  if (existing.status === KycStatus.PENDING) {
    throw AppError.forbidden(
      "KYC is under review and cannot be updated"
    );
  }

  if (existing.status !== KycStatus.REJECT) {
    throw AppError.forbidden(
      "KYC cannot be updated"
    );
  }



  const updatedKyc = await KycRepository.updateKyc(
    existing.id,
    {
      ...data,
      status: KycStatus.PENDING, // Reset to pending after update
    }
  );



  return updatedKyc;
};

export const deleteKyc = async (
  userId: number
): Promise<void> => {

  /* ================= INPUT VALIDATION ================= */

  if (!userId) {
    throw AppError.badRequest("User id is required");
  }

  /* ================= BUSINESS VALIDATION ================= */

  const existing =
    await KycRepository.getKycByUserId(userId);

  if (!existing) {
    throw AppError.notFound(
      "KYC record not found for this user"
    );
  }

  if (existing.status === KycStatus.APPROVED) {
    throw AppError.forbidden(
      "Approved KYC cannot be deleted"
    );
  }

  if (existing.status === KycStatus.PENDING) {
    throw AppError.forbidden(
      "KYC under review cannot be deleted"
    );
  }

  /* ================= CORE OPERATION ================= */

  await KycRepository.deleteKyc(existing.id);

  /* ================= RETURN ================= */

  return;
};
