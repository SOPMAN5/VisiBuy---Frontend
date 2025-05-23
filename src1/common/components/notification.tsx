import Icon from "../../ui/Icon";
import { useCallback, useEffect, useState } from "react";
import { useGetSellerGetNotification } from "../../modules/Seller/queries/notification/queries";
import { NotificationModal } from "./notification-modal";
import { TSellerNotification } from "../../modules/Seller/models/notification";

export function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<TSellerNotification[]>([]);
  const { data, isPending } = useGetSellerGetNotification();

  useEffect(() => {
    setNotifications(data?.notifications ?? []);
  }, [data?.notifications]);

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  return (
    <div
      className='relative h-16 w-16 bg-blue-200 rounded-full flex items-center justify-center cursor-pointer'
      onClick={() => setIsOpen(true)}
    >
      <Icon name='bell' className='text-blue' size={25} />
      {unreadCount > 0 && (
        <div className='bg-red-600 h-5 w-5 rounded-full absolute -top-1 -right-1 flex items-center justify-center text-white text-xs'>
          {unreadCount}
        </div>
      )}
      <NotificationModal
        open={isOpen}
        setOpen={() => setIsOpen(false)}
        notifications={notifications}
      />
    </div>
  );
}
