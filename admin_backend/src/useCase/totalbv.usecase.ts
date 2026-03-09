import {
  getLastMonthTeamBVRepo,
  getSelfBVRepo,
  getTotalRepurchaseBVRepo,
  getUserTotalBVRepo,
  totalFirstPurchaseRepo,
} from "@/data/repositories/Admin.totalbv.repo";
import AppError from "@/errors/AppError";

export const calculateTotalBvUsecase = async (userid: number) => {
  if (!userid) {
    throw AppError.notFound("user id is required");
  }
  return await getUserTotalBVRepo(userid);
};

export const getLastMonthTeamBVUsecase = async (userId: number) => {
  if (!userId || isNaN(userId)) {
    throw new Error("Valid user ID required");
  }

  return await getLastMonthTeamBVRepo(userId);
};

export const getTotalRepurchaseBVUsecase = async (userId: number) => {
  if (!userId || isNaN(userId)) {
    throw new Error("Valid user ID required");
  }

  return await getTotalRepurchaseBVRepo(userId);
};

export const getTotalFirstpurchesBvusecase = async (userid: number) => {
  if (!userid || isNaN(userid)) {
    throw new Error("Valid user ID required");
  }
  return await totalFirstPurchaseRepo(userid);
};
export const getSelfbvUsecase = async (userid: number) => {
  if (!userid || isNaN(userid)) {
    throw new Error("Valid user ID required");
  }
  return await getSelfBVRepo(userid);
};
