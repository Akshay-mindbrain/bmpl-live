import bcrypt from "bcryptjs";
import prisma from "@/prisma-client";
import AppError from "@/errors/AppError";
import { createUser } from "@/useCase/Users.useCase";
import { AdminType, ApproveStatus, MemIdOption } from "@prisma/client";

type SetupConfigInput = {
  autoMemId: MemIdOption;
  userRegistrationNo?: number;
  prefixMemId: string;
  minLength: number;
  planConfigKey?: string;
  planConfigValue?: ApproveStatus;
  incomeCommission?: number;
  royaltyCommission?: number;
  tds?: number;
  admincharges?: number;
};

type RootUserInput = {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  password: string;
};

type DefaultAdminInput = {
  firstName?: string | null;
  lastName?: string | null;
  mobile: string;
  email?: string | null;
  username?: string | null;
  password: string;
  adminType?: AdminType;
};

type SetupPayload = {
  config: SetupConfigInput;
  rootUser: RootUserInput;
  defaultAdmin: DefaultAdminInput;
};

const DEFAULT_PLAN_CONFIG_KEY = "PLAN_APPROVAL_MODE";

export const initializeUserSetup = async (payload: SetupPayload) => {
  const userCount = await prisma.user.count();
  if (userCount > 0) {
    throw AppError.conflict("Setup already completed. Root user already exists.");
  }

  const [existingRootMobile, existingRootEmail] = await Promise.all([
    prisma.user.findUnique({ where: { mobile: payload.rootUser.mobile } }),
    prisma.user.findUnique({ where: { email: payload.rootUser.email } }),
  ]);

  if (existingRootMobile) {
    throw AppError.conflict("Root user mobile already exists.");
  }

  if (existingRootEmail) {
    throw AppError.conflict("Root user email already exists.");
  }

  const setupConfig = await prisma.config.upsert({
    where: { id: 1 },
    update: {
      autoMemId: payload.config.autoMemId,
      userRegistrationNo: payload.config.userRegistrationNo ?? 0,
      prefixMemId: payload.config.prefixMemId,
      minLength: payload.config.minLength,
      plan_config_key: payload.config.planConfigKey ?? DEFAULT_PLAN_CONFIG_KEY,
      plan_config_value: payload.config.planConfigValue ?? ApproveStatus.AUTO,
      incomeCommission: payload.config.incomeCommission ?? 0,
      royaltyCommission: payload.config.royaltyCommission ?? 0,
      tds: payload.config.tds ?? 0,
      admincharges: payload.config.admincharges ?? 0,
    },
    create: {
      id: 1,
      autoMemId: payload.config.autoMemId,
      userRegistrationNo: payload.config.userRegistrationNo ?? 0,
      prefixMemId: payload.config.prefixMemId,
      minLength: payload.config.minLength,
      plan_config_key: payload.config.planConfigKey ?? DEFAULT_PLAN_CONFIG_KEY,
      plan_config_value: payload.config.planConfigValue ?? ApproveStatus.AUTO,
      incomeCommission: payload.config.incomeCommission ?? 0,
      royaltyCommission: payload.config.royaltyCommission ?? 0,
      tds: payload.config.tds ?? 0,
      admincharges: payload.config.admincharges ?? 0,
    },
  });

  const normalizedAdminUsername =
    payload.defaultAdmin.username?.trim() || payload.defaultAdmin.mobile;

  let defaultAdmin = await prisma.admin.findUnique({
    where: { mobile: payload.defaultAdmin.mobile },
  });

  if (!defaultAdmin) {
    const [existingUsername, existingEmail] = await Promise.all([
      prisma.admin.findUnique({
        where: { username: normalizedAdminUsername },
      }),
      payload.defaultAdmin.email
        ? prisma.admin.findUnique({
            where: { email: payload.defaultAdmin.email },
          })
        : Promise.resolve(null),
    ]);

    if (existingUsername) {
      throw AppError.conflict("Default admin username already exists.");
    }

    if (existingEmail) {
      throw AppError.conflict("Default admin email already exists.");
    }

    const hashedAdminPassword = await bcrypt.hash(payload.defaultAdmin.password, 10);

    defaultAdmin = await prisma.admin.create({
      data: {
        firstName: payload.defaultAdmin.firstName ?? undefined,
        lastName: payload.defaultAdmin.lastName ?? undefined,
        mobile: payload.defaultAdmin.mobile,
        email: payload.defaultAdmin.email ?? undefined,
        username: normalizedAdminUsername,
        password: hashedAdminPassword,
        adminType: payload.defaultAdmin.adminType ?? AdminType.SUPERADMIN,
        status: "1",
      },
    });
  }

  const rootUser = await createUser({
    firstName: payload.rootUser.firstName,
    lastName: payload.rootUser.lastName,
    mobile: payload.rootUser.mobile,
    email: payload.rootUser.email,
    password: payload.rootUser.password,
    sponsorId: null,
    parentId: null,
    legPosition: null,
    useShare: false,
    status: "ACTIVE",
  });

  return {
    config: setupConfig,
    defaultAdmin,
    rootUser,
  };
};
