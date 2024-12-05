import { OrderSelectStatus } from "@/common/components/status-selector";
import { currencyFormmater, formatDate } from "@/lib/utils";
import { SellerOrder } from "@/modules/Orders/models/types";
import Icon from "@/ui/Icon";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export const columns: ColumnDef<SellerOrder>[] = [
  {
    accessorKey: "img_url",
    header: "Image",
  },
  {
    accessorKey: "id",
    header: "S/N",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          {" "}
          <img
            className="aspect-square border border-light-gray rounded-md mr-3"
            width={20}
            src={row.getValue("img_url")}
          />
          {row.getValue("productName")}
        </div>
      );
    },
  },
  {
    accessorKey: "orderNumber",
    header: "Order Number",
    cell: ({ row }) => {
      return "#" + row.getValue("orderNumber");
    },
  },
  {
    accessorKey: "orderDate",
    header: "Date",
    cell: ({ row }) => {
      return formatDate(row.getValue("orderDate"));
    },
  },
  {
    accessorKey: "price",
    header: "Amount",
    cell: ({ row }) => {
      return currencyFormmater(row.getValue("price"));
    },
  },
  {
    accessorKey: "invoiceId",
    header: "Invoice ID",
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <OrderSelectStatus status={row.getValue("status")} />
          <Link to={`view/${row.getValue("orderNumber")}`}>
            <Icon
              name="ellipsis-vertical"
              className="text-secondary-foreground ml-4"
              size={15}
            />
          </Link>
        </div>
      );
    },
  },
];
