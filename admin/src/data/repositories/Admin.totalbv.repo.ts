import prisma from "@/prisma-client";
import { BVLedger } from "@prisma/client";

// Total Left/Right BV
export const getUserTotalBVRepo = async (userId: number) => {
  const result = await prisma.bVLedger.groupBy({
    by: ["buyer_leg"],
    where: {
      user_id: userId,
      buyer_leg: { in: ["LEFT", "RIGHT"] },
    },
    _sum: { bv: true },
  });

  let leftBV = 0;
  let rightBV = 0;

  for (const r of result) {
    if (r.buyer_leg === "LEFT") leftBV = Number(r._sum?.bv ?? 0);
    if (r.buyer_leg === "RIGHT") rightBV = Number(r._sum?.bv ?? 0);
  }

  return { leftBV, rightBV };
};

// Last Month Team BV
export const getLastMonthTeamBVRepo = async (userId: number) => {
  const startLastMonth = new Date();
  startLastMonth.setMonth(startLastMonth.getMonth() - 1);
  startLastMonth.setDate(1);
  startLastMonth.setHours(0, 0, 0, 0);

  const startThisMonth = new Date();
  startThisMonth.setDate(1);
  startThisMonth.setHours(0, 0, 0, 0);

  const result = await prisma.bVLedger.groupBy({
    by: ["buyer_leg"],
    where: {
      user_id: userId,
      buyer_leg: { in: ["LEFT", "RIGHT"] },
      createdAt: {
        gte: startLastMonth,
        lt: startThisMonth,
      },
    },
    _sum: { bv: true },
  });

  const left = result.find((r: any) => r.buyer_leg === "LEFT");
  const right = result.find((r: any) => r.buyer_leg === "RIGHT");

  return {
    lastMonthLeftBV: Number(left?._sum?.bv ?? 0),
    lastMonthRightBV: Number(right?._sum?.bv ?? 0),
  };
};

// Repurchase BV
export const getTotalRepurchaseBVRepo = async (userId: number) => {
  const result = await prisma.bVLedger.groupBy({
    by: ["buyer_leg"],
    where: {
      user_id: userId,
      buyer_leg: { in: ["LEFT", "RIGHT"] },
      purchase: {
        purchase_type: "REPURCHASE",
      },
    },
    _sum: { bv: true },
  });

  const left = result.find((r: any) => r.buyer_leg === "LEFT");
  const right = result.find((r: any) => r.buyer_leg === "RIGHT");

  return {
    totalRepurchaseLeftBV: Number(left?._sum?.bv ?? 0),
    totalRepurchaseRightBV: Number(right?._sum?.bv ?? 0),
  };
};

// First Purchase BV
export const totalFirstPurchaseRepo = async (userId: number) => {
  const result = await prisma.bVLedger.groupBy({
    by: ["buyer_leg"],
    where: {
      user_id: userId,
      buyer_leg: { in: ["LEFT", "RIGHT"] },
      purchase: {
        purchase_type: "FIRST_PURCHASE",
      },
    },
    _sum: { bv: true },
  });

  const left = result.find((r: any) => r.buyer_leg === "LEFT");
  const right = result.find((r: any) => r.buyer_leg === "RIGHT");

  return {
    totalFirstPurchaseLeftBV: Number(left?._sum?.bv ?? 0),
    totalFirstPurchaseRightBV: Number(right?._sum?.bv ?? 0),
  };
};

// Self BV
export const getSelfBVRepo = async (userId: number) => {
  const result = await prisma.planPurchase.aggregate({
    where: {
      user_id: userId,
      status: "APPROVED",
    },
    _sum: { BV: true },
  });

  return Number(result._sum.BV ?? 0);
};
