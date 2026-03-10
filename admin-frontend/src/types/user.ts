// src/types/user.ts
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  memberId: string;
  email: string;
  mobile: string;
  status: string;
  kycStatus: string;
  createdAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetUsersResponse {
  success: boolean;
  message: string;
  users: User[];
  pagination: Pagination;
}
