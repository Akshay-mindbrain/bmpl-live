import { PrismaClient, ApproveStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/* -------------------------------------------------- */
/* ------------------ USERS SEED -------------------- */
/* -------------------------------------------------- */

const TOTAL_USERS = 1;

const getRandomMobile = () => {
  const firstDigit = Math.floor(Math.random() * 4) + 6;
  let remaining = "";
  for (let i = 0; i < 9; i++) {
    remaining += Math.floor(Math.random() * 10);
  }
  return `${firstDigit}${remaining}`;
};

const getRandomLeg = () => (Math.random() > 0.5 ? "LEFT" : "RIGHT");

async function seedUsers() {
  console.log("🌱 Seeding Users...");

  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE users;`);
  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1;`);

  const hashedPassword = await bcrypt.hash("11111111", 10);

  const root = await prisma.user.create({
    data: {
      firstName: "Root",
      lastName: "User",
      email: "root@example.com",
      mobile: getRandomMobile(),
      password: hashedPassword,
      lineagePath: "1",
    },
  });

  const createdUsers = [root];

  for (let i = 1; i < TOTAL_USERS; i++) {
    const sponsor =
      createdUsers[Math.floor(Math.random() * createdUsers.length)];

    const newUser = await prisma.user.create({
      data: {
        firstName: "User",
        lastName: `User${i}`,
        email: `user${i}@example.com`,
        mobile: getRandomMobile(),
        password: hashedPassword,
        sponsorId: sponsor.id,
        legPosition: getRandomLeg(),
        lineagePath: `${sponsor.lineagePath},${i + 1}`,
      },
    });

    createdUsers.push(newUser);
  }

  console.log("✅ Users seeded.");
}

/* -------------------------------------------------- */
/* ---------------- PLANS SEED ---------------------- */
/* -------------------------------------------------- */

async function seedPlans() {
  console.log("🌱 Seeding Plans...");

  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0;`);
  await prisma.$executeRawUnsafe(`DELETE FROM plans_master;`);

  await prisma.$executeRawUnsafe(`
    INSERT INTO plans_master
    (id, planName, Description, BV, price, dp_amount, status, createdAt, updatedAt, createdBy, updatedBy, createdByAdminId, updatedByAdminId)
    VALUES
    (UUID(),'Starter Plan','Basic entry level MLM plan',100,1000,200,'ACTIVE',NOW(3),NOW(3),'Admin','Admin',1,1),
    (UUID(),'Growth Plan','Intermediate plan for growing members',300,3000,500,'ACTIVE',NOW(3),NOW(3),'Admin','Admin',1,1),
    (UUID(),'Premium Plan','High value premium income plan',700,7000,1000,'ACTIVE',NOW(3),NOW(3),'Admin','Admin',1,1);
  `);

  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1;`);

  console.log("✅ Plans seeded.");
}

/* -------------------------------------------------- */
/* ---------------- CONFIG SEED --------------------- */
/* -------------------------------------------------- */

async function seedConfig() {
  console.log("🌱 Seeding Config...");

  const topPlans = await prisma.plansMaster.findMany({
    orderBy: { price: "desc" },
    take: 2,
  });

  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE config_table;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE _ConfigRoyalPlans;`);
  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1;`);

  await prisma.config.create({
    data: {
      autoMemId: "STATIC",
      userRegistrationNo: 0,
      prefixMemId: "MEM",
      minLength: 6,
      plan_config_key: "PLAN_PURCHASE_APPROVAL_MODE",
      plan_config_value: ApproveStatus.AUTO,
      royalQualifierPlans: {
        connect: topPlans.map((p) => ({ id: p.id })),
      },
    },
  });

  console.log("✅ Config seeded.");
}

/* -------------------------------------------------- */
/* -------------- SYSTEM INCOME SEED --------------- */
/* -------------------------------------------------- */

async function seedSystemIncome() {
  console.log("🌱 Seeding SystemIncome...");

  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE system_income;`);
  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1;`);

  const users = await prisma.user.findMany({ select: { id: true } });

  for (const user of users) {
    const incomeCount = Math.floor(Math.random() * 3) + 2;

    for (let i = 0; i < incomeCount; i++) {
      const matchedBV = Math.floor(Math.random() * 500) + 100;
      const incomeAmount = matchedBV * 5;

      const randomDaysAgo = Math.floor(Math.random() * 30);
      const randomDate = new Date();
      randomDate.setDate(randomDate.getDate() - randomDaysAgo);

      await prisma.systemIncome.create({
        data: {
          matched_bv: matchedBV,
          income: incomeAmount,
          message_data: "Binary income seed",
          status: "ACTIVE",
          createdAt: randomDate,
          updatedAt: randomDate,
          user_id: user.id,
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
      });
    }
  }

  console.log("✅ SystemIncome seeded.");
}

/* -------------------------------------------------- */
/* ---------------- WALLET SEED --------------------- */
/* -------------------------------------------------- */

async function seedWallet() {
  console.log("🌱 Seeding Wallet...");

  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE wallet;`);
  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1;`);

  const users = await prisma.user.findMany({ select: { id: true } });

  for (const user of users) {
    const totalLeftBV = Math.floor(Math.random() * 5000);
    const totalRightBV = Math.floor(Math.random() * 5000);
    const matchedBV = Math.min(totalLeftBV, totalRightBV);

    await prisma.wallet.create({
      data: {
        user_id: user.id,
        total_income: Math.floor(Math.random() * 50000),
        total_withdraw: Math.floor(Math.random() * 10000),
        total_dp_amount: 10000,
        balance_dp_amount: 5000,
        super_coins: 100,
        used_super_coins: 50,
        matched_bv: matchedBV,
        total_left_bv: totalLeftBV,
        total_right_bv: totalRightBV,
        left_carryforward_bv: totalLeftBV - matchedBV,
        right_carryforward_bv: totalRightBV - matchedBV,
        status: "ACTIVE",
        createdBy: "Seeder",
        updatedBy: "Seeder",
      },
    });
  }

  console.log("✅ Wallet seeded.");
}

/* -------------------------------------------------- */
/* --------------------- MAIN ----------------------- */
/* -------------------------------------------------- */

async function main() {
  // await seedUsers();
  // await seedPlans();
  // await seedConfig();
  // await seedSystemIncome();
  // await seedWallet();
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });