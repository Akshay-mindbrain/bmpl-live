import { MemIdOption } from "./../node_modules/.prisma/client/index.d";
import { AdminType } from "@prisma/client";
import { Status } from "@prisma/client";

export interface CreateAdminDTO {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null | undefined;
  mobile: string;
  username?: string | null;
  password: string;
  adminType?: AdminType;
}
export interface UpdateAdminDTO {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  mobile?: string | null;
  username?: string | null;
  password?: string | null;
  status?: string | null;
  refreshToken?: string | null;
}
export interface loginDto {
  username?: string | null;
  password?: string;
}
import { Status, KycStatus } from "@prisma/client";

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  mobile?: string;
  email?: string;

  sponsorId?: number | null;
  parentId?: number | null;
  member_Id?: string | null;

  legPosition?: "LEFT" | "RIGHT" | null;

  kycStatus?: KycStatus;

  updatedBy?: string | null;
}

export type PlanFeature = string;
export interface PlanFeatureObj {
  title: string;
  value?: string;
}
import { Status } from "@prisma/client";
import { PlanFeature } from "@/types/plan-feature.type";

export interface CreatePlanDto {
  planName: string;
  Description: string;
  BV: number;
  price: number;
  dp_amount: number;
  status?: Status;
  features: PlanFeature[];

  createdBy?: string;
  createdByAdminId?: number;
}

export interface UpdatePlanDto {
  planName?: string;
  Description?: string;
  BV?: number;
  price?: number;
  dp_amount?: number;
  status?: Status;
  features?: PlanFeature[];

  updatedBy?: string;
  updatedByAdminId?: number;
}

export interface CreateConfigDto {
  autoMemId?: MemIdOption;
  userRegistrationNo?: number;
  prefixMemId: string;
  minLength: number;
  incomeCommission: number;
  royaltyCommission: number;
}
