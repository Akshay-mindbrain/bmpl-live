import {
  getConfig,
  updateConfig,
} from "../data/repositories/Config.Repository";

export const generateMemberId = async (): Promise<string> => {
  const config = await getConfig();
  if (!config) throw new Error("Config row not found");

  const prefix = config.prefixMemId;
  const length = config.minLength;

  if (config.autoMemId === "STATIC") {
    const maxAllowed = Number("9".repeat(length));

    const updatedConfig = await updateConfig({
      userRegistrationNo: { increment: 1 },
    });

    const number = updatedConfig.userRegistrationNo;

    if (number > maxAllowed) {
      throw new Error("Member ID limit reached. Increase minLength in config.");
    }

    const padded = number.toString().padStart(length, "0");
    return `${prefix}${padded}`;
  }

  // DYNAMIC → random IDs
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return `${prefix}${randomNumber}`;
};
