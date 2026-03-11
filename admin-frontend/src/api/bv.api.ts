import { BASE_URL } from "../config/api.config";
import { refreshTokeApi } from "./auth.api";

/**
 * CALCULATE TOTAL BV
 * POST /v1/bv/calculate/:userId
 */
export const getUserTotalBVApi = async (userId: number) => {
  let res = await fetch(`${BASE_URL}/v1/bv/calculate/${userId}`, {
    method: "POST",
    credentials: "include",
  });

  if (res.status === 401) {
    try {
      await refreshTokeApi();
      res = await fetch(`${BASE_URL}/v1/bv/calculate/${userId}`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      throw new Error("Session expired. Please login again.");
    }
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Calculate total BV failed");
  }

  return data;
};

/**
 * GET LAST MONTH TEAM BV
 * POST /v1/bv/getlastmonth/:userId
 */
export const getLastMonthTeamBVApi = async (userId: number) => {
  let res = await fetch(`${BASE_URL}/v1/bv/getlastmonth/${userId}`, {
    method: "POST",
    credentials: "include",
  });

  if (res.status === 401) {
    try {
      await refreshTokeApi();
      res = await fetch(`${BASE_URL}/v1/bv/getlastmonth/${userId}`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      throw new Error("Session expired. Please login again.");
    }
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Fetch last month team BV failed");
  }

  return data;
};

/**
 * GET TOTAL REPURCHASE BV
 * POST /v1/bv/getrepurchesbv/:userId
 */
export const getTotalRepurchaseBVApi = async (userId: number) => {
  let res = await fetch(`${BASE_URL}/v1/bv/getrepurchesbv/${userId}`, {
    method: "POST",
    credentials: "include",
  });

  if (res.status === 401) {
    try {
      await refreshTokeApi();
      res = await fetch(`${BASE_URL}/v1/bv/getrepurchesbv/${userId}`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      throw new Error("Session expired. Please login again.");
    }
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Fetch repurchase BV failed");
  }

  return data;
};

/**
 * GET TOTAL FIRST PURCHASE BV
 * POST /v1/bv/getfirstpurches/:userId
 */
export const getTotalFirstPurchaseBVApi = async (userId: number) => {
  let res = await fetch(`${BASE_URL}/v1/bv/getfirstpurches/${userId}`, {
    method: "POST",
    credentials: "include",
  });

  if (res.status === 401) {
    try {
      await refreshTokeApi();
      res = await fetch(`${BASE_URL}/v1/bv/getfirstpurches/${userId}`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      throw new Error("Session expired. Please login again.");
    }
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Fetch first purchase BV failed");
  }

  return data;
};

/**
 * GET SELF BV
 * POST /v1/bv/selfbv/:id
 */
export const getSelfBVApi = async (id: number) => {
  let res = await fetch(`${BASE_URL}/v1/bv/selfbv/${id}`, {
    method: "POST",
    credentials: "include",
  });

  if (res.status === 401) {
    try {
      await refreshTokeApi();
      res = await fetch(`${BASE_URL}/v1/bv/selfbv/${id}`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      throw new Error("Session expired. Please login again.");
    }
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Fetch self BV failed");
  }

  return data;
};