//user dto
export interface UserResponseDto {
  id: number;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  memberId: string | null;

  sponsorId: number | null;
  parentId: number | null;
  memberId: number | null;
  legPosition: "LEFT" | "RIGHT" | null;

  leftChildId: number?;
  rightChildId: number?;
  lastLeftId: number?;
  lastRightId: number?;

  lineagePath: string;
  directCount: number;

  kycStatus: "PENDING" | "APPROVED" | "REJECT";
  status: "ACTIVE" | "INACTIVE";

  createdAt: Date;
  updatedAt: Date;

  sponsor?: {
    id: number;
    fullName: string;
    email: string;
  } | null;

  parent?: {
    id: number;
    fullName: string;
    email: string;
  } | null;
}

//user by id repsonse dto
export interface getUserByIdResDTO {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  memberId: string;
  legPosition: string;
  status: "ACTIVE" | "INACTIVE";
  //useShare?: boolean;
  // firstname,lastname , mobile, email,memberid,legposition,status
}

//kyc dto
export interface KycResponseDto {
  id: number;
  userId: number;

  aadharNo: string;
  aadharImgUrl: string;

  panNo: string;
  panImageUrl: string;

  bankName: string;
  accountNo: string;
  ifscCode: string;
  branchName: string;
  bankProofImgUrl: string;

  status: "PENDING" | "APPROVED" | "REJECT";
  rejectReason: string | null;

  createdAt: Date;
  updatedAt: Date;

  user?: {
    id: number;
    fullName: string;
    email: string;
    mobile: string;
  } | null;
}

//planmaster
export interface PlansMasterResponseDto {
  id: string;
  planName: string;
  Description: string;

  BV: number;
  price: number;
  dp_amount: number;

  status: "ACTIVE" | "INACTIVE";

  createdAt: Date;
  updatedAt: Date;

  purchasesCount?: number;
}

//plan purchase
export interface PlanPurchaseResponseDto {
  id: number;

  plan_id: string;
  user_id: number;

  BV: number;
  dp_amount: number;
  plan_amount: number;

  payment_mode: string;
  payment_proof_uri: string;

  purchase_type: "FIRST_PURCHASE" | "REPURCHASE" | "SHARE_PURCHASE";
  is_income_generated: "YES" | "NO";
  status: "PENDING" | "APPROVED" | "REJECTED";

  approved_by: number | null;
  approved_at: Date;

  createdAt: Date;
  updatedAt: Date;

  createdBy: string;
  updatedBy: string;

  plan?: {
    id: string;
    planName: string;
    price: number;
    BV: number;
  } | null;

  user?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
  } | null;

  approvedByAdmin?: {
    id: number;
    firstName: string;
    lastName: string;
  } | null;
}

//user activity
export interface CreateUserActivityLogDTO {
  userId?: number | null;
  action?: string | null;
  details?: string | null;
}

export interface GetLogsDTO {
  userId?: number;
  action?: string | null;
  skip?: number;
  take?: number;
}
