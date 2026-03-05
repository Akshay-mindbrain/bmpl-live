import prisma from "@/prisma-client";
import { getRoyalityPercentage, getTDS } from "@/utils/incomeHelper";
import { WalletTransactionType } from "@prisma/client";

export const generateRoyaltyIncomeForAll = async () => {
  try {
    const royaltyPercentage = await getRoyalityPercentage();
    const { tds, admincharges } = await getTDS();

    const relations = await prisma.royalQualifier.findMany({
      where: { status: "ACTIVE" },
      include: {
        child: {
          include: {
            wallets: true, // FIXED (wallet → wallets)
          },
        },
      },
    });

    if (!relations.length) {
      console.log("No royalty relations found");
      return [];
    }

    const batch = await prisma.generateIncome.create({
      data: {
        totalIncome: 0,
        tds: 0,
        netincome: 0,
        adminCharges: 0,
        generatedDate: new Date(),
      },
    });

    let totalIncome = 0;
    let totalTds = 0;
    let totalAdmin = 0;

    const result: any[] = [];

    await prisma.$transaction(async (tx) => {
      for (const relation of relations) {
        const parentId = relation.userId;

        // wallets is array
        const childWallet = relation.child.wallets?.[0];
        const childIncome = Number(childWallet?.total_income || 0);

        if (childIncome <= 0) continue;

        const grossIncome = (childIncome * royaltyPercentage) / 100;

        const tdsAmount = (grossIncome * tds) / 100;
        const adminAmount = (grossIncome * admincharges) / 100;
        const netIncome = grossIncome - tdsAmount - adminAmount;

        totalIncome += grossIncome;
        totalTds += tdsAmount;
        totalAdmin += adminAmount;

        const royaltyEntry = await tx.royalClubIncome.create({
          data: {
            user_id: parentId,
            generateIncomeId: batch.id,
            income: grossIncome,
            message_data: "Royalty income generated",
            status: "ACTIVE",
          },
        });

        await tx.incomeHistory.create({
          data: {
            incomeId: batch.id,
            userId: parentId,
            totalIncome: grossIncome,
            tds: tdsAmount,
            adminCharges: adminAmount,
          },
        });

        await tx.wallet.upsert({
          where: { user_id: parentId },
          update: {
            total_income: { increment: netIncome },
          },
          create: {
            user_id: parentId,
            total_income: netIncome,
          },
        });

        await tx.walletTransaction.create({
          data: {
            user_id: parentId,
            type: WalletTransactionType.PURCHASE,
            amount: netIncome,
            reference_id: royaltyEntry.id,
            message: "Royalty income credited",
            status: "ACTIVE",
          },
        });

        await tx.royalQualifier.update({
          where: { id: relation.id },
          data: { status: "INACTIVE" },
        });

        result.push({
          parentId,
          grossIncome,
          netIncome,
        });
      }
    });

    await prisma.generateIncome.update({
      where: { id: batch.id },
      data: {
        totalIncome,
        tds: totalTds,
        adminCharges: totalAdmin,
      },
    });

    console.log("Royalty income generated successfully");
    return result;
  } catch (error) {
    console.error("Royalty generation failed:", error);
    throw error;
  }
};