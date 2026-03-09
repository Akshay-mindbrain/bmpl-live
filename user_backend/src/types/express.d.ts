import { JwtPayload } from "jsonwebtoken";

export interface AuthUser extends JwtPayload {
  id: number;
}

declare global {
  namespace Express {
    interface Locals {
      user?: AuthUser;
    }
  }
}

export {};
