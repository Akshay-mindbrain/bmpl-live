// src/types/plan.ts
export interface Plan {
  id: string;
  planName: string;
  Description: string;
  BV: number;
  price: number;
  dp_amount: number;
  features: { title: string }[];
  createdAt?: string;
  updatedAt?: string;
}