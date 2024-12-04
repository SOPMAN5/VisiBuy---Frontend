import { OrderStatus } from "@/types/status";

export interface Order {
  id: string;
  invoiceId: string;
  productName: string;
  price: number;
  img_url: string;
  orderNumber: number;
  orderDate: string | Date;
  status: OrderStatus;
}

export interface SellerOrder extends Order {}
