import { Request, Response } from "express";
import cloudinary from "../../cloudinary.config";

export const getUploadSignature = async (req: Request, res: Response) => {
  const timestamp = Math.round(Date.now() / 1000);

  const folder = "kyc";

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder,
    },
    process.env.CLOUDINARY_API_SECRET!,
  );

  res.json({
    timestamp,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    folder,
  });
};
