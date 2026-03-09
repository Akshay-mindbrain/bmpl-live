import {
  genincomeGenrepo,
  getIncomeGenarateRepo,
  incomeHistoryRepo,
} from "@/data/repositories/Admin.genIncome.repo";

export const inocomeGenerateUsecase = async () => {
  return await getIncomeGenarateRepo();
};

export const genincomeUsecase = async (page: number, limit: number) => {
  if (!page || page < 1) page = 1;
  if (!limit) limit = 10;
  if (limit > 100) limit = 100;
  return await genincomeGenrepo(page, limit);
};

export const incomeHistoryUsecase = async (page: number, limit: number) => {
  if (!page || page < 1) page = 1;
  if (!limit) limit = 10;
  if (limit > 100) limit = 100;
  return await incomeHistoryRepo(page, limit);
};
