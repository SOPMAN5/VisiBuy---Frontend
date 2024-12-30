import { BaseQueryParams } from "@/models/base-query-params";
import { IOrder } from "@/modules/Orders/models/types";
import {TOrderStatus } from "@/types/status";

export interface ISellerOrder extends IOrder {}
export interface ISellerOrderQueryParams extends BaseQueryParams{
    status:TOrderStatus
}
