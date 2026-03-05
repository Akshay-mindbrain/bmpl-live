import { BASE_URL } from "../config/api.config";
import { regenAccessTokenApi } from "./user.api";

type KycErrorResponse = {
  success?: boolean;
  msg?: string;
  message?: string;
  error?: {
    message?: string;
    code?: string;
    details?: Array<{ message?: string }>;
  };
};

export type KycPayload = {
  panNo: string;
  panImageUrl: string;
  aadharNo: string;
  aadharImgUrl: string;
  bankName: string;
  accountNo: string;
  ifscCode: string;
  branchName: string;
  bankProofImgUrl: string;
};

export type KycStatus = "PENDING" | "APPROVED" | "REJECT";

export type KycRecord = {
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
  status: KycStatus;
  rejectReason: string | null;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
  error?: {
    message?: string;
    code?: string;
    details?: Array<{ message?: string }>;
  };
};

export class KycApiError extends Error {
  status: number;
  code?: string;
  details?: string[];

  constructor(message: string, status: number, code?: string, details?: string[]) {
    super(message);
    this.name = "KycApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

const parseJsonSafe = async <T>(res: Response): Promise<T | KycErrorResponse> => {
  try {
    return (await res.json()) as T;
  } catch {
    return {} as KycErrorResponse;
  }
};

const buildApiError = (
  res: Response,
  data: KycErrorResponse,
  fallbackMessage: string,
) => {
  const topMessage = data?.error?.message || data?.msg || data?.message || fallbackMessage;
  const detailMessages =
    data?.error?.details
      ?.map((item) => item?.message?.trim())
      .filter((message): message is string => Boolean(message)) ?? [];

  const finalMessage =
    detailMessages.length > 0
      ? `${topMessage}: ${detailMessages.join(" | ")}`
      : topMessage;

  return new KycApiError(finalMessage, res.status, data?.error?.code, detailMessages);
};

const withRefreshRetry = async (
  makeRequest: () => Promise<Response>,
): Promise<Response> => {
  let res = await makeRequest();

  if (res.status === 401) {
    try {
      await regenAccessTokenApi();
      res = await makeRequest();
    } catch {
      window.location.href = "/login";
      throw new Error("Session expired. Please login again.");
    }
  }

  return res;
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

const requestKycApi = async <T>(
  makeRequest: () => Promise<Response>,
  fallbackMessage: string,
): Promise<T> => {
  const res = await withRefreshRetry(makeRequest);
  const data = await parseJsonSafe<T>(res);

  if (!res.ok) {
    throw buildApiError(res, data as KycErrorResponse, fallbackMessage);
  }

  return data as T;
};

export const createKyc = async (
  payload: KycPayload,
): Promise<ApiResponse<KycRecord>> => {
  try {
    return await requestKycApi<ApiResponse<KycRecord>>(
      () =>
        fetch(`${BASE_URL}/v1/kyc`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }),
      "Failed to submit KYC",
    );
  } catch (err: unknown) {
    console.error("createKyc error:", getErrorMessage(err));
    throw err;
  }
};

export const getAllKyc = async (): Promise<ApiResponse<KycRecord[]>> => {
  try {
    return await requestKycApi<ApiResponse<KycRecord[]>>(
      () =>
        fetch(`${BASE_URL}/v1/kyc`, {
          method: "GET",
          credentials: "include",
        }),
      "Failed to fetch KYC",
    );
  } catch (err: unknown) {
    console.error("getAllKyc error:", getErrorMessage(err));
    throw err;
  }
};

