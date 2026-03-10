export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  mobile: string;
  password: string;
  sponsorId?: number;
  legPosition?: "LEFT" | "RIGHT";
  useShare?: boolean;
}

export interface LoginPayload {
  mobile: string;
  password: string;
}