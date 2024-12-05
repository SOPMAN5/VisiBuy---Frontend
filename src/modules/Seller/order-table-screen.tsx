import { MainLayout } from "@/layouts/main-layout";
import { OrderSummaryCard } from "../Orders/features/components/order-summary-card";
import { SellerOrderTable } from "./features/order-table/order-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { SellerOrder } from "../Orders/models/types";
import { columns } from "./features/order-table/column-def";
import { ITabs, OrderTabs } from "./features/order-table/order-tabs";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import { dashboardConfig } from "@/lib/config";
import Icon from "@/ui/Icon";
const orders: SellerOrder[] = [
  {
    id: "1",
    invoiceId: "fsdsd",
    productName: "Nike Air Jordan",
    img_url: "/sneaker.png",
    price: 14000,
    orderNumber: 1235,
    status: "accepted",
    orderDate: new Date(),
  },
];
const tabs: ITabs[] = [
  { value: "all_orders", title: "All Orders" },
  { value: "pending", title: "Pending" },
  { value: "accepted", title: "Accepted" },
  { value: "dispatched", title: "Dispatched" },
  { value: "delivered", title: "Delivered" },
  { value: "cancelled", title: "Cancelled" },
];
export function SellerOrderScreen() {
  const { orderId } = useParams();
  const match = useMatch(dashboardConfig.getFullPath("seller", "orders"));
  const table = useReactTable({
    initialState: {
      columnVisibility: {
        img_url: false, // hide this column by id
      },
      columnFilters: [
        {
          id: "status",
          value: "",
        },
      ],
    },

    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <>
      {match ? (
        <MainLayout title="Order Management">
          <div className="grid grid-cols-5 gap-x-4">
            <OrderSummaryCard figure={620} />
            <OrderSummaryCard
              title="Pending"
              legendColor="bg-blue"
              figure={601}
            />
            <OrderSummaryCard
              title="Accepted"
              figure={600}
              legendColor="bg-[#FFA600]"
            />
            <OrderSummaryCard
              title="Dispatched"
              figure={489}
              legendColor="bg-[#FF6200]"
            />
            <OrderSummaryCard
              title="Delivered"
              legendColor="bg-primary"
              figure={312}
            />
          </div>
          <OrderTabs tabs={tabs} table={table} />
          <SellerOrderTable table={table} />
        </MainLayout>
      ) : (
        <MainLayout
          title={
            <div className="flex gap-x-4 items-center">
              <Link to='' className="bg-light-gray px-4 py-2 ">
                {" "}
                <Icon name="move-left"  width={20} />
              </Link>

              {`Order details (#${orderId})`}
            </div>
          }
        >
          <Outlet />
        </MainLayout>
      )}
    </>
  );
}
