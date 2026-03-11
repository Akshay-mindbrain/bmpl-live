// src/types/income.ts

export interface DateWiseIncomeRow {
  id: number;
  totalIncome: string;
  netincome: number;
  tds: string;
  adminCharges: string;
  generatedDate: string;
  createdAt: string;
}

export interface DateWiseIncomeResponse {
  msg: string;
  data: {
    data: DateWiseIncomeRow[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}