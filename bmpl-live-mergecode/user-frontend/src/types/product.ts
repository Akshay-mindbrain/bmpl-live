export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    originalPrice: number;
    bv: number;
    rating: number;
    image: string;
    description: string;
    longDescription: string;
    keyBenefits: string[];
    specifications: Record<string, string>;
}
