export type Role = "BUYER" | "VENDOR" | "ADMIN";
export type OrderStatus = "PENDING" | "CONFIRMED" | "READY" | "DELIVERED" | "CANCELLED";
export type PaymentMethod = "MOMO" | "CASH_ON_DELIVERY";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED";
export type Category =
  | "PRODUCE"
  | "FASHION"
  | "BEAUTY"
  | "ELECTRONICS"
  | "FOOD_DRINKS"
  | "OTHER";

export interface CartItem {
  productId: string;
  shopId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
