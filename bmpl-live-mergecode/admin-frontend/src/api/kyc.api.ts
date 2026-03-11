// src/api/kyc.api.ts
import { BASE_URL } from "../config/api.config";
import { refreshTokeApi } from "./auth.api";

export interface GetKycParams {
  page?: number;
  limit?: number;
}

  //  GET PENDING KYC
export const getPendingKycApi = async ({
  page = 1,
  limit = 20,
}: GetKycParams) => {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  }).toString();

  let res = await fetch(`${BASE_URL}/v1/kyc/getkycpending?${query}`, {
    method: "GET",
    credentials: "include",
  });

  if (res.status === 401) {
    try {
      await refreshTokeApi();
      res = await fetch(`${BASE_URL}/v1/kyc/getkycpending?${query}`, {
        method: "GET",
        credentials: "include",
      });
    } catch {
      window.location.href = "/login";
      throw new Error("Session expired");
    }
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch pending KYC");
  }

  return data;
};

  //  GET APPROVED KYC
export const getApprovedKycApi = async ({
  page = 1,
  limit = 20,
}: GetKycParams) => {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  }).toString();

  let res = await fetch(`${BASE_URL}/v1/kyc/getkycapprove?${query}`, {
    method: "GET",
    credentials: "include",
  });

  if (res.status === 401) {
    try {
      await refreshTokeApi();
      res = await fetch(`${BASE_URL}/v1/kyc/getkycapprove?${query}`, {
        method: "GET",
        credentials: "include",
      });
    } catch {
      window.location.href = "/login";
      throw new Error("Session expired");
    }
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch approved KYC");
  }

  return data;
};

  //  GET REJECTED KYC
export const getRejectedKycApi = async ({
  page = 1,
  limit = 20,
}: GetKycParams) => {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  }).toString();

  let res = await fetch(`${BASE_URL}/v1/kyc/getkycreject?${query}`, {
    method: "GET",
    credentials: "include",
  });

  if (res.status === 401) {
    try {
      await refreshTokeApi();
      res = await fetch(`${BASE_URL}/v1/kyc/getkycreject?${query}`, {
        method: "GET",
        credentials: "include",
      });
    } catch {
      window.location.href = "/login";
      throw new Error("Session expired");
    }
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch rejected KYC");
  }

  return data;
};

  //  GET ALL KYC
export const getAllKycApi = async ({
  page = 1,
  limit = 20,
}: GetKycParams) => {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  }).toString();

  let res = await fetch(`${BASE_URL}/v1/kyc/getallkyc?${query}`, {
    method: "GET",
    credentials: "include",
  });

  if (res.status === 401) {
    try {
      await refreshTokeApi();
      res = await fetch(`${BASE_URL}/v1/kyc/getallkyc?${query}`, {
        method: "GET",
        credentials: "include",
      });
    } catch {
      window.location.href = "/login";
      throw new Error("Session expired");
    }
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch KYC list");
  }

  return data;
};

  //  GET ONE KYC
export const getOneKycApi = async (id: number) => {
  if (!id) throw new Error("KYC id is required");

  let res = await fetch(`${BASE_URL}/v1/kyc/onekyc/${id}`, {
    method: "GET",
    credentials: "include",
  });

  if (res.status === 401) {
    try {
      await refreshTokeApi();
      res = await fetch(`${BASE_URL}/v1/kyc/onekyc/${id}`, {
        method: "GET",
        credentials: "include",
      });
    } catch {
      window.location.href = "/login";
      throw new Error("Session expired");
    }
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch KYC details");
  }

  return data;
};

  //  UPDATE KYC STATUS
export const updateKycStatusApi = async (
  id: number,
  payload: {
    action: "APPROVE" | "REJECT";
    remark?: string;
  },
) => {
  let res = await fetch(`${BASE_URL}/v1/kyc/updatekycstatus/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (res.status === 401) {
    try {
      await refreshTokeApi();
      res = await fetch(`${BASE_URL}/v1/kyc/updatekycstatus/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
    } catch {
      window.location.href = "/login";
      throw new Error("Session expired");
    }
  }

  const data = await res.json();
  console.log(data);
  

  if (!res.ok) {
    throw new Error(data?.message || "Failed to update KYC status");
  }
  return data;
};
