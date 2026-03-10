import { createConfigRepo } from "@/data/repositories/Admin.config.repo";
import { CreateConfigDto } from "@/dto";

export const saveAdminConfigUsecase = async (data: CreateConfigDto) => {
  return await createConfigRepo(data);
};
