export interface Plan {
    id: string;
    planName: string;
    Description: string;
    BV: number;
    price: number;
    dp_amount: number;
    status: "ACTIVE" | "INACTIVE";
}