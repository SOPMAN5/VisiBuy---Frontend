import { QueryResult } from "@/models/query-result";
import { ISellerOrderQueryParams, ISellerOrder } from "../../models/orders";
import { ISellerOrderRepository } from "../../respository/seller-order-respository";
import { axiosWithAuth } from "@/lib/client";

class SellerOrderApiAdapter implements ISellerOrderRepository {
  async getOrder(id: string) {}
  async getOrderList(
    queryParams: ISellerOrderQueryParams
  ): Promise<QueryResult<ISellerOrder>> {
    const searchParams = new URLSearchParams();

    // Add all defined query parameters
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    const response = await axiosWithAuth.get(
      `/order/history?${searchParams.toString()}`
    );
    return response.data;
  }
}

export default new SellerOrderApiAdapter();
