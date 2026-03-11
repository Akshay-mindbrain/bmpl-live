import type { ReactNode } from "react";

export type AgentTab = "overview" | "kyc" | "team" | "earnings" | "history";

export interface Agent {
  id: number;
  name: string;

  // Basic identity / contact
  email: string;
  phone?: string;

  // Display / profile info used across pages
  avatar?: string;
  code?: string;

  // Joining date is consistently referenced as `joinDate` in UI
  joinDate?: string;
  joiningDate?: ReactNode;

  // Status / meta fields coming from list data
  status?: string;
  type?: string;
  kyc?: string;
  package?: string;

  // Additional fields used in various pages
  lastActive?: string;
  fullName?: string;
  agentCode?: string;
  currentPackageName?: string;
  currentBV?: number;

  //bank details
  bankName?: string;
  bankAccountNumber?: string;
  bankIFSC?: string;
}
