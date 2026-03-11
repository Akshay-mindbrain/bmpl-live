import {
  PrismaClient,
  LegPosition,
  PurchaseType,
  PurchaseStatus,
  IncomeGenerated,
  Status,
} from "@prisma/client";
 
const prisma = new PrismaClient();
 
async function main() {
  console.log("🧹 Truncating database...");
 
  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0`);
 
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE reward_history`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE users_payout_history`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE payout`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE income_history`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE royal_club_income`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE system_income`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE generate_income`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE bv_ledger`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE plan_purchases`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE wallet_transaction`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE wallet`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE royal_qualifier`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE user_tree_closure`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE kyc`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE plans_master`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE reward_config`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE config_table`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE users`);
 
  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1`);
 
  console.log("✅ Database truncated");
 
  //////////////////////////////////////////////////////
  // 1️⃣ CREATE 20 USERS (Binary Structure)
  //////////////////////////////////////////////////////
  const users: any[] = [];
 
  for (let i = 0; i < 20; i++) {
    const parentIndex = i === 0 ? null : Math.floor((i - 1) / 2);
    const parent = parentIndex !== null ? users[parentIndex] : null;
 
    const user = await prisma.user.create({
      data: {
        firstName: i === 0 ? "Root" : `User${i}`,
        lastName: "MLM",
        mobile: `9000000${100 + i}`,
        email: `user${i}@mlm.com`,
        password: "123456",
        parentId: parent?.id,
        sponsorId: parent?.id,
        legPosition:
          i === 0
            ? undefined
            : i % 2 === 1
            ? LegPosition.LEFT
            : LegPosition.RIGHT,
        lineagePath:
          i === 0
            ? "1"
            : `${parent.lineagePath}/${i + 1}`,
      },
    });
 
    users.push(user);
  }
 
  console.log("👥 20 Users created");
 
  //////////////////////////////////////////////////////
  // 2️⃣ WALLET
  //////////////////////////////////////////////////////
  await prisma.wallet.createMany({
    data: users.map((u) => ({
      user_id: u.id,
    })),
  });
 
  //////////////////////////////////////////////////////
  // 3️⃣ KYC
  //////////////////////////////////////////////////////
  await prisma.kyc.createMany({
    data: users.map((u, i) => ({
      userId: u.id,
      aadharNo: `11112222${i}`,
      aadharImgUrl: `aadhar_${u.id}.jpg`,
      panNo: `ABCDE${i}F`,
      panImageUrl: `pan_${u.id}.jpg`,
      bankName: "SBI",
      accountNo: `12345678${i}`,
      ifscCode: "SBIN0001234",
      branchName: "Bhubaneswar",
      bankProofImgUrl: `bank_${u.id}.jpg`,
    })),
  });
 
  //////////////////////////////////////////////////////
  // 4️⃣ PLAN
  //////////////////////////////////////////////////////
  const plan = await prisma.plansMaster.create({
    data: {
      planName: "Starter Plan",
      Description: "MLM Starter Plan",
      BV: 100,
      price: 1000,
      dp_amount: 100,
      status: Status.ACTIVE,
    },
  });
 
  //////////////////////////////////////////////////////
  // 5️⃣ PLAN PURCHASE + BV LEDGER
  //////////////////////////////////////////////////////
  for (let i = 1; i < users.length; i++) {
    const purchase = await prisma.planPurchase.create({
      data: {
        plan_id: plan.id,
        user_id: users[i].id,
        BV: 100,
        dp_amount: 100,
        plan_amount: 1000,
        purchase_type: PurchaseType.FIRST_PURCHASE,
        status: PurchaseStatus.APPROVED,
        createdBy: "system",
        updatedBy: "system",
      },
    });
 
    await prisma.bVLedger.create({
      data: {
        purchase_id: purchase.id,
        buyer_id: users[i].id,
        user_id: users[i].parentId!,
        bv: 100,
        purchase_type: PurchaseType.FIRST_PURCHASE,
        buyer_leg: users[i].legPosition!,
        is_income_generated: IncomeGenerated.NO,
      },
    });
  }
 
  //////////////////////////////////////////////////////
  // 6️⃣ ROYAL QUALIFIER
  //////////////////////////////////////////////////////
  for (let i = 1; i < users.length; i++) {
    const parentId = users[i].parentId;
    if (!parentId) continue;
 
    await prisma.royalQualifier.create({
      data: {
        userId: parentId,
        childId: users[i].id,
        status: Status.ACTIVE,
      },
    });
  }
 
  console.log("👑 RoyalQualifier created");
 
  //////////////////////////////////////////////////////
  // 7️⃣ REWARD CONFIG
  //////////////////////////////////////////////////////
  await prisma.rewardConfig.create({
    data: {
      matchedBV: 1000,
      giftName: "Bike",
      status: Status.ACTIVE,
    },
  });
 
  //////////////////////////////////////////////////////
  // 8️⃣ CONFIG
  //////////////////////////////////////////////////////
  await prisma.config.create({
    data: {
      prefixMemId: "MLM",
      minLength: 6,
      plan_config_key: "PLAN_APPROVAL",
      incomeCommission: 10,
      royaltyCommission: 5,
      tds: 5,
      admincharges: 2,
    },
  });
 
  console.log("🎉 FULL 20 USER MLM SEED COMPLETED!");
}
 
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });