import { generateRoyaltyIncomeForAll } from "@/data/repositories/getRoyalityIncome.repo";

export const roylityincomeUsecase = async () => {
  return await generateRoyaltyIncomeForAll();
};
