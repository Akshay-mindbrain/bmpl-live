import prisma from "@/prisma-client";
import { KycStatus } from "@prisma/client";
import { getPagination } from "@/utils/paginaqtion";

export const getKycPendingrepo = async (page: number, limit: number) => {
  const { skip, take } = getPagination(page, limit);

  const [data, total] = await Promise.all([
    prisma.kyc.findMany({
      where: { status: KycStatus.PENDING },
      skip,
      take,
      orderBy: { createdAt: "desc" },
    }),
    prisma.kyc.count({ where: { status: KycStatus.PENDING } }),
  ]);

  return { data, total };
};

export const getKycApproveRepo = async (page: number, limit: number) => {
  const { skip, take } = getPagination(page, limit);

  const [data, total] = await Promise.all([
    prisma.kyc.findMany({
      where: { status: KycStatus.APPROVED },
      skip,
      take,
      orderBy: { createdAt: "desc" },
    }),
    prisma.kyc.count({ where: { status: KycStatus.APPROVED } }),
  ]);

  return { data, total };
};

export const getKycRejectRepo = async (page: number, limit: number) => {
  const { skip, take } = getPagination(page, limit);

  const [data, total] = await Promise.all([
    prisma.kyc.findMany({
      where: { status: KycStatus.REJECT },
      skip,
      take,
      orderBy: { createdAt: "desc" },
    }),
    prisma.kyc.count({ where: { status: KycStatus.REJECT } }),
  ]);

  return { data, total };
};

export const getkycRepo = async (page: number, limit: number) => {
  const { skip, take } = getPagination(page, limit);

  const [data, total] = await Promise.all([
    prisma.kyc.findMany({
      skip,
      take,
      orderBy: { createdAt: "desc" },
    }),
    prisma.kyc.count(),
  ]);

  return { data, total };
};

export const getOneKyc = (id: number) => {
  return prisma.kyc.findUnique({
    where: { id },
  });
};

export const rejectKycStatus = async (id: number, remark: string) => {
  return await prisma.kyc.update({
    where: { id },
    data: { status: KycStatus.REJECT, rejectReason: remark },
  });
};
export const approveKycstatus = async (id: number, userid: number) => {
  return prisma.$transaction([
    prisma.kyc.update({
      where: { id },
      data: {
        status: KycStatus.APPROVED,
        rejectReason: null,
      },
    }),

    prisma.user.update({
      where: { id: userid },
      data: {
        kycStatus: "APPROVED",
      },
    }),
  ]);
};
