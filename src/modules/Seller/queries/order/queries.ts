import { useQuery } from "@tanstack/react-query";
import { ISellerOrderQueryParams } from "../../models/orders";
import SellerOrderService from "../../lib/orders/services";
export function getProductsQueryKey() {
  return ["orders"];
}
export function useGetSellerOrderQuery(
  queryParams: ISellerOrderQueryParams,
  isMatchRoute: boolean
) {
  return useQuery({
    queryKey: getProductsQueryKey(),
    queryFn: () => SellerOrderService.getOrderList(queryParams),
    placeholderData: (previousData) => previousData,
    enabled: isMatchRoute,
  });
}
