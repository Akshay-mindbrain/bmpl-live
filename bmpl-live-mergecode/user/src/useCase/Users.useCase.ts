import bcrypt from "bcryptjs";
import AppError from "../errors/AppError";
import * as userRepository from "../data/repositories/Users.Repository";
import * as userhelperRepository from "../data/repositories/UserHelper.Repository";
import { generateMemberId } from "@/utils/genMemId";
import * as userTreeClosure from "../data/repositories/UserTreeClosure.Repository";
import { consumeSharePurchase } from "./planPurchase/consumeSharedPurchase.useCase";
import { reserveSharePurchase } from "./planPurchase/ReservePurchase.useCase";

export const createUser = async (data: any) => {
  return userRepository.runInTransaction(async (tx) => {
    if (!data.email) {
      throw AppError.badRequest("Email is required");
    }

    if (!data.mobile) {
      throw AppError.badRequest("Mobile number is required");
    }

    if (!data.password) {
      throw AppError.badRequest("Password is required");
    }

    const existingEmail = await userRepository.getUserByEmail(data.email, tx);
    if (existingEmail) {
      throw AppError.conflict("Email already exists");
    }

    const existingMobile = await userRepository.getUserByMobile(
      data.mobile,
      tx,
    );
    if (existingMobile) {
      throw AppError.conflict("Mobile number already exists");
    }

    const totalUsers = await userRepository.countUsers(tx);
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const { sponsorId, parentId, useShare, ...safeData } = data;

    const fullname =
      `${safeData.firstName ?? ""} ${safeData.lastName ?? ""}`.trim() ||
      "SYSTEM";

    /* ================= ROOT USER ================= */

    if (totalUsers === 0) {
      if (data.legPosition !== null && data.legPosition !== undefined) {
        throw AppError.badRequest("Root user cannot have a leg position");
      }

      const memberId = await generateMemberId();

      const createdUser = await userRepository.createUser(
        {
          ...safeData,
          password: hashedPassword,
          memberId,
          legPosition: null,
          lineagePath: "",
          createdBy: fullname,
          updatedBy: fullname,
        },
        tx,
      );

      await userRepository.createRootLineage(createdUser.id, tx);
      await userRepository.userIdUpdate({ userId: createdUser.id }, tx);

      return await userRepository.getUserById(createdUser.id, tx);
    }

    /* ================= NORMAL USER ================= */

    if (!sponsorId) {
      throw AppError.badRequest("sponsorId is required");
    }

    if (!data.legPosition) {
      throw AppError.badRequest("legPosition is required");
    }

    if (!["LEFT", "RIGHT"].includes(data.legPosition)) {
      throw AppError.badRequest("Invalid leg position");
    }

    const sponsorUser = await userRepository.getUserById(sponsorId, tx);

    if (!sponsorUser) {
      throw AppError.notFound("Sponsor user not found");
    }

    if (useShare) {
      await reserveSharePurchase(sponsorUser.id, tx);
    }

    const placementParentId = await userRepository.findPlacementParent(
      sponsorUser.id,
      data.legPosition,
      tx,
    );

    const memberId = await generateMemberId();

    const createdUser = await userRepository.createUser(
      {
        ...safeData,
        password: hashedPassword,
        memberId,
        legPosition: data.legPosition,
        sponsor: { connect: { id: sponsorUser.id } },
        parent: { connect: { id: placementParentId } },
        lineagePath: "",
        createdBy: fullname,
        updatedBy: fullname,
      },
      tx,
    );

    await userRepository.userIdUpdate({ userId: createdUser.id }, tx);
    await userRepository.incrementDirectCount(sponsorUser.id, tx);

    const lineagePathUpdateUser = await userRepository.createChildLineage(
      { userId: createdUser.id, parentId: placementParentId },
      tx,
    );

    await userRepository.updateParentChildPointer(
      {
        parentId: placementParentId,
        childId: createdUser.id,
        legPosition: data.legPosition,
      },
      tx,
    );

    await userRepository.updateUpline(
      {
        userId: createdUser.id,
        lineagePath: lineagePathUpdateUser.lineagePath,
        legPosition: data.legPosition,
      },
      tx,
    );

    const updatedUser = await userRepository.getUserById(createdUser.id, tx);

    await userTreeClosure.createClosure(
      {
        sponsor: { connect: { id: updatedUser!.sponsorId! } },
        parent: { connect: { id: updatedUser!.parentId! } },
        member: { connect: { id: updatedUser!.id } },
        legPosition: updatedUser!.legPosition!,
      },
      tx,
    );

    if (useShare) {
      await consumeSharePurchase(sponsorUser.id, updatedUser!.id, tx);
    }

    return updatedUser;
  });
};
export const getAllUsers = async () => {
  console.log("Api is being hit in the Services");
  return userRepository.getUsers();
};

export const getUserById = async (id: number) => {
  const user = await userRepository.getUserById(id);

  if (!user) {
    throw AppError.notFound("User not found.");
  }

  return user;
};

export const updateUser = async (userId: number, data: any) => {
  const existingUser = await getUserById(userId);

  if ("password" in data) {
    throw AppError.badRequest("Password cannot be updated using this endpoint");
  }

  const finalFirstName = data.firstName ?? existingUser.firstName;
  const finalLastName = data.lastName ?? existingUser.lastName;

  const fullName = `${finalFirstName} ${finalLastName}`.trim();

  return userRepository.updateUser(userId, {
    ...data,
    updatedBy: fullName,
    // updatedByAdmin: {
    //   connect: { id: userId },
    // },
  });
};

export const deleteUser = async (id: number) => {
  await getUserById(id); // already throws if not exist
  return userRepository.deleteUser(id);
};

//Helper Services
export const getAllDownlineByUserId = async (userId: number) => {
  const user = await userRepository.getUserById(userId);

  if (!user) {
    throw AppError.notFound(`User with given ${userId} does not exist`);
  }

  if (!user.lineagePath) {
    return [];
  }

  return userhelperRepository.getAllDownline(user.lineagePath);
};

export const getAllUpLineByUserId = async (userId: number) => {
  const user = await userRepository.getUserById(userId);

  if (!user) {
    throw AppError.notFound(`User with given ${userId} does not exist`);
  }

  if (!user.lineagePath) {
    return [];
  }

  return userhelperRepository.getAllUpLine(user.lineagePath);
};

export const updateLastNodeByLeg = async (
  userId: number,
  legPosition: "LEFT" | "RIGHT",
) => {
  if (!["LEFT", "RIGHT"].includes(legPosition)) {
    throw AppError.badRequest("Invalid leg position");
  }

  const user = await userRepository.getUserById(userId);

  if (!user) {
    throw AppError.notFound("User not found");
  }

  const immediateChild = await userhelperRepository.getImmediateChild(
    userId,
    legPosition,
  );

  if (!immediateChild) return null;

  const nodes = await userhelperRepository.getLastNode(
    immediateChild.lineagePath,
  );

  if (!nodes.length) return null;

  const lastNode = nodes.reduce((deepest, current) =>
    current.lineagePath.split(",").length >
    deepest.lineagePath.split(",").length
      ? current
      : deepest,
  );

  await userRepository.updateUser(userId, {
    lastLeft:
      legPosition === "LEFT" ? { connect: { id: lastNode.id } } : undefined,
    lastRight:
      legPosition === "RIGHT" ? { connect: { id: lastNode.id } } : undefined,
  });

  return lastNode;
};
