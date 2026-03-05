import {
  Prisma,
  PlanPurchase,
  PurchaseStatus,
  ShareStatus,
} from "@prisma/client";
import * as planPurchaseRepo from "../../data/repositories/PlanPurchase.Repository";
import * as planRepo from "../../data/repositories/Package.Repository";
import * as userRepo from "../../data/repositories/Users.Repository";
import AppError from "@/errors/AppError";
import { getPlanApprovalMode } from "../config_table/config.helper.useCase";
import { createBVLedgerForLineageRaw } from "@/data/repositories/BVledger.Repository";
import prisma from "@/prisma-client";
import { createRoyalQualifierService } from "../RoyalQualifier/royalQualifier.useCase";

export const createPlanPurchase = async (
  userId: number,
  data: any,
): Promise<PlanPurchase> => {
  return prisma.$transaction(async (tx) => {
    if (!data?.plan_amount) throw AppError.badRequest("plan id is required");

    if (data.BV == null || data.dp_amount == null || data.plan_amount == null) {
      throw AppError.badRequest("Financial fields missing");
    }

    const plan = await planRepo.getPackageById(data.plan_id);
    if (!plan) throw AppError.notFound("Plan not found");

    const user = await userRepo.getUserById(userId);
    if (!user) throw AppError.notFound("User not found");

    const existingFirstPurchase =
      await planPurchaseRepo.findByUserFirstPurchase(userId);

    if (data.purchase_type === "FIRST_PURCHASE" && existingFirstPurchase) {
      throw AppError.badRequest(
        "First purchase already completed. Please choose REPURCHASE or SHARE_PURCHASE.",
      );
    }

    if (!existingFirstPurchase && data.purchase_type !== "FIRST_PURCHASE") {
      throw AppError.badRequest(
        "You must complete FIRST_PURCHASE before repurchase or share purchase.",
      );
    }

    const approvalMode = await getPlanApprovalMode();
    const isAutoApproval = approvalMode === "AUTO";

    let isTransferable = false;
    let shareStatus: ShareStatus = "NOT_APPLICABLE";

    if (data.purchase_type === "SHARE_PURCHASE") {
      isTransferable = true;
      shareStatus = isAutoApproval ? "AVAILABLE" : "NOT_APPLICABLE";
    }

    const fullname = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

    const purchase = await tx.planPurchase.create({
      data: {
        BV: data.BV,
        dp_amount: data.dp_amount,
        plan_amount: data.plan_amount,
        payment_mode: data.payment_mode,
        payment_proof_uri: data.payment_proof_uri,

        purchase_type: data.purchase_type,
        status: isAutoApproval ? "APPROVED" : "PENDING",
        approve_status: isAutoApproval ? "AUTO" : "MANUALADMIN",
        approved_at: isAutoApproval ? new Date() : null,
        is_income_generated: "NO",

        is_transferable: isTransferable,
        share_status: shareStatus,

        createdBy: fullname,
        updatedBy: fullname,

        plan: { connect: { id: data.plan_id } },
        user: { connect: { id: userId } },
      },
    });
if (user.sponsorId) {
  const sponsor = await userRepo.getUserById(user.sponsorId);

  if (!sponsor) {
    throw AppError.notFound("Sponsor not found");
  }

  await createRoyalQualifierService(
    sponsor.id,
    userId,
    tx,
  );
}

    if (isAutoApproval && data.purchase_type !== "SHARE_PURCHASE") {
      await createBVLedgerForLineageRaw(
        {
          purchase_id: purchase.id,
          buyer_id: userId,
          bv: purchase.BV,
          purchase_type: purchase.purchase_type,
          is_income_generated: "NO",
        },
        tx,
      );
    }

    return purchase;
  });
};

export const getAllPlanPurchases = async () => {
  return planPurchaseRepo.getAll();
};

export const getPlanPurchaseById = async (id: number) => {
  const purchase = await planPurchaseRepo.findById(id);

  if (!purchase) {
    throw new Error("Plan purchase not found");
  }

  return purchase;
};

export const getPurchasesByUser = async (userId: number) => {
  const purchases = await planPurchaseRepo.findByUserId(userId);

  const firstPurchasePending = purchases.find(
    (p) => p.purchase_type === "FIRST_PURCHASE" && p.status === "PENDING",
  );

  const firstPurchaseApproved = purchases.find(
    (p) => p.purchase_type === "FIRST_PURCHASE" && p.status === "APPROVED",
  );

  let purchaseFlow = {
    canCreatePurchase: true,
    showPurchaseTypeDropdown: false,
    allowedPurchaseTypes: [] as string[],
    message: "",
  };

  if (firstPurchasePending) {
    purchaseFlow = {
      canCreatePurchase: false,
      showPurchaseTypeDropdown: false,
      allowedPurchaseTypes: [],
      message: "Your first purchase is awaiting admin approval.",
    };
  } else if (firstPurchaseApproved) {
    purchaseFlow = {
      canCreatePurchase: true,
      showPurchaseTypeDropdown: true,
      allowedPurchaseTypes: ["REPURCHASE", "SHARE_PURCHASE"],
      message: "You can now repurchase or share purchase a plan.",
    };
  } else {
    purchaseFlow = {
      canCreatePurchase: true,
      showPurchaseTypeDropdown: false,
      allowedPurchaseTypes: ["FIRST_PURCHASE"],
      message: "Please complete your first purchase.",
    };
  }

  return {
    purchases,
    purchaseFlow,
  };
};

export const getPurchasesByPlan = async (planId: string) => {
  return planPurchaseRepo.findByPlanId(planId);
};

export const getPendingApprovals = async () => {
  return planPurchaseRepo.getPendingApprovals();
};

export const approvePurchase = async (purchaseId: number, adminId: number) => {
  const purchase = await planPurchaseRepo.findById(purchaseId);

  if (!purchase) {
    throw new Error("Purchase not found");
  }

  if (purchase.approved_by) {
    throw new Error("Purchase already approved");
  }

  return planPurchaseRepo.approvePurchase(purchaseId, adminId);
};

export const markIncomeGenerated = async (purchaseId: number) => {
  const purchase = await planPurchaseRepo.findById(purchaseId);

  if (!purchase) {
    throw new Error("Purchase not found");
  }

  return planPurchaseRepo.markIncomeGenerated(purchaseId);
};
