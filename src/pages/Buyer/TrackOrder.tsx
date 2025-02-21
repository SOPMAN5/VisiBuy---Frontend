// src/pages/buyer/BuyerTrackOrderPage.tsx
import { useEffect, useState } from "react";
import OrderStatusButtons from "../../modules/Buyer/features/track-order/components/OrderStatusButtons";
import SearchOrder from "../../modules/Buyer/features/track-order/components/SearchOrder";
import OrderCard from "../../modules/Buyer/features/track-order/components/OrderCard";
import { TOrderStatus } from "../../types/status";
import PurchasingHistory from "@/modules/Buyer/features/track-order/components/PurchasingHistory";

interface Order {
  id: string;
  title: string;
  description: string;
  status: TOrderStatus;
  time: string;
}

type FilterStatus = TOrderStatus | "all";

const BuyerTrackOrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch orders (mock data for now)
  useEffect(() => {
    const mockData: Order[] = [
      {
        id: "1452589",
        title: 'Nike Air Jordan 1 Retro OG High "UNC Toe"',
        description:
          "Features a UNC blue, black, and white color scheme by Michael Jordan.",
        status: "pending",
        time: "4:59 PM",
      },
      {
        id: "1452590",
        title: 'Nike Air Jordan 4 "Lightning"',
        description: "Yellow-based colorway with black and grey accents.",
        status: "delivered",
        time: "1:20 PM",
      },
      {
        id: "1452591",
        title: 'Nike Air Jordan 1 "Bred"',
        description: "Classic black and red color scheme, iconic since 1985.",
        status: "accepted",
        time: "10:15 AM",
      },
      {
        id: "1452592",
        title: 'Nike Dunk Low "Panda"',
        description:
          "Black-and-white minimal design, super popular silhouette.",
        status: "cancelled",
        time: "2:10 PM",
      },
      {
        id: "1452593",
        title: 'Nike Air Jordan 3 "Fire Red"',
        description:
          "Classic red, white, and black colorway with elephant print.",
        status: "dispatched",
        time: "5:30 PM",
      },
      {
        id: "1452594",
        title: 'Nike Dunk Low "Panda"',
        description:
          "Black-and-white minimal design, super popular silhouette.",
        status: "cancelled",
        time: "2:10 PM",
      },
      {
        id: "1452595",
        title: 'Nike Air Jordan 3 "Fire Red"',
        description:
          "Classic red, white, and black colorway with elephant print.",
        status: "dispatched",
        time: "5:30 PM",
      },
    ];

    setOrders(mockData);
    setFilteredOrders(mockData);
  }, []);

  // Filter orders based on status and search query
  useEffect(() => {
    let updated = [...orders];

    if (statusFilter !== "all") {
      updated = updated.filter((order) => order.status === statusFilter);
    }

    if (searchQuery.trim()) {
      updated = updated.filter(
        (order) =>
          order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredOrders(updated);
  }, [orders, statusFilter, searchQuery]);

  const handleStatusChange = (status: FilterStatus) => {
    setStatusFilter(status);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col gap-12 p-12">
      {/* Row 1: OrderStatusButtons + SearchOrder */}
      <div className="flex items-center justify-between">
        <OrderStatusButtons
          currentStatus={statusFilter}
          onStatusChange={handleStatusChange}
        />
        <SearchOrder onSearch={handleSearch} />
      </div>

      {/* Row 2: OrderCards + PurchasingHistory */}
      <div className="flex gap-12">
        {/* OrderCard list */}
        <div className="flex-1 flex flex-col gap-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>

        {/* Right side: PurchasingHistory */}
        <div className="w-64 hidden lg:block">
          <PurchasingHistory />
        </div>
      </div>
    </div>
  );
};

export default BuyerTrackOrderPage;
