export type AdminType = "SUPERADMIN" | "ADMIN" | "SUPPORT";

export interface Admin {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile: string;
  username: string;
  adminType: AdminType;
  status: string;          // ← changed to string (your API sends "1", "0", etc.)
  createdAt: string;
  updatedAt?: string;      // ← added, appears in response
}

export type AdminFormInput = Partial<Admin> & {
  password?: string;
};

// Helper to map your API status to display
export const getStatusLabel = (status: string): "Active" | "Disabled" => {
  return status === "1" ? "Active" : "Disabled";
};