import { ISellerOrder } from "../../models/orders";

export const transformSellerOrder = (
  data: any
): { total_orders: number; orders: ISellerOrder[] } => {
  if (data.orders.length <= 0) {
    return { total_orders: data.total_orders, orders: data.orders };
  }
  const transformedOrders = data?.orders.map((order: any) => {
    return {
      invoiceId: order.invoiceID,
      productName: order.sneaker.brand,
      price: order.sneaker.price,
      orderNumber: order.orderNumber,
      status: order.order_status,
      orderDate: order.created_at,
    };
  });
  return { total_orders: data.total_orders, orders: transformedOrders };
};
