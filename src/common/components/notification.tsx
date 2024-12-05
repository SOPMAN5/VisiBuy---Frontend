import Icon from "@/ui/Icon";

export function Notification() {
  return (
    <div className="relative h-16 w-16 bg-blue-200 rounded-full flex items-center justify-center">
      <Icon name="bell" className="text-blue" size={25} />
      <div className="bg-red-600 h-2 w-2 rounded-full absolute left-10 bottom-11"></div>
    </div>
  );
}
