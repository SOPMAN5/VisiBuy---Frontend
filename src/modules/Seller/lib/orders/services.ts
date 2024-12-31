import { ISellerOrderQueryParams } from "../../models/orders";
import SellerOrderApi from "./api";
import { transformSellerOrder } from "./transfomers";

async function getOrderList(queryParams: ISellerOrderQueryParams) {
  const response = await SellerOrderApi.getOrderList(queryParams);
  return transformSellerOrder(response);
}

export default { getOrderList };
