export type AutoMemIdMode = "STATIC" | "DYNAMIC";

export interface ConfigPayload {
  autoMemId: AutoMemIdMode;
  userRegistrationNo: number;
  prefixMemId: string;
  minLength: number;
  incomeCommission: number;
  royaltyCommission: number;
}