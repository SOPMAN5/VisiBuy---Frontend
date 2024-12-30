import { capitalize, cn } from "@/lib/utils";
import { TOrderStatus } from "@/types/status";
import * as SelectPrimitive from "@radix-ui/react-select";
import Icon from "@/ui/Icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectScrollDownButton,
  SelectValue,
} from "@/ui/Select";
import { SelectTrigger } from "@radix-ui/react-select";
import { cva } from "class-variance-authority";
import { useCallback, useState } from "react";

const navVariants = cva(
  "text-lg w-[100px] h-10 focus:border-none outline-none bg-opacity-15",
  {
    variants: {
      status: {
        default: "text-[#28A745] bg-[#28A745] bg-blue h-11 ",
        pending: "text-[#007AFF] bg-[#007AFF] ",
        delivered: "text-primary bg-primary-150   ",
        dispatched: "text-[#FF6200] bg-[#FF6200]",
        accepted: "text-[#FFA600] bg-[#FFA600]    ",
        cancelled: "text-[#F41414] bg-[#F41414] ",
      },
    },
  }
);

export function OrderSelectStatus({ status }: { status: TOrderStatus }) {
  const [orderstatus, setOrderStatus] = useState(status);
  const handleSetOrderStatus = useCallback((status: TOrderStatus) => {
    setOrderStatus(status);
  }, []);
  return (
    <Select onValueChange={handleSetOrderStatus}>
      <SelectTrigger className={cn(navVariants({ status: orderstatus }))}>
        <SelectValue placeholder={capitalize(orderstatus)} />
      </SelectTrigger>
      <SelectContent className="bg-[#d5d1d1] font-OpenSans ">
        <SelectItem value="cancelled" className="focus:bg-[#C8E2FF]">
          Cancelled
        </SelectItem>
        <SelectItem value="accepted" className="focus:bg-[#C8E2FF]">
          Accepted
        </SelectItem>
        <SelectItem value="delivered" className="focus:bg-[#C8E2FF]">
          Delivered
        </SelectItem>
        <SelectItem value="dispatched" className="focus:bg-[#C8E2FF]">
          Dispatched
        </SelectItem>
        <SelectItem value="pending" className="focus:bg-[#C8E2FF]">
          Pending
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
