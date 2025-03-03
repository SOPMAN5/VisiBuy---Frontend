import OrderSelectStatus from "@/common/components/status-selector";
import { currencyFormmater, formatDate, ImageLinkMap } from "@/lib/utils";
import { Button } from "@/ui/Button";
import { useRef, useState } from "react";
import { Link, useParams, redirect } from "react-router-dom";
import { useGetASellerOrderQuery } from "../../queries/order/queries";
import { RootState } from "@/store/store";
import { useAppSelector } from "@/hooks/app-hooks";
import { OverlaySpinner } from "@/common/components/modal-spinner";
import ImagePickerFactory from "@/common/components/image-picker-factory";

export function SellerOrderDetailsScreen() {
  const { orderId } = useParams();
  const { data, isFetching } = useGetASellerOrderQuery(orderId ?? "");
  const root = useAppSelector((state: RootState) => state.root);

  const [imageMap, setImageMap] = useState(new Map());

  // Handler for when an image is captured/selected
  const handleImageCapture = (id: string, imageData?: string) => {
    setImageMap((prevMap) => {
      const newMap = new Map(prevMap);
      if (imageData) {
        newMap.set(id, imageData);
      } else {
        newMap.delete(id);
      }
      return newMap;
    });
  };
  const imageLinkMap = new ImageLinkMap();
  const { links, setImageLink, removeImageLink, getImageLinks } = imageLinkMap;
  console.log(links, setImageLink);
  // Upload image (example function)
  const uploadImage = async () => {
    Array.from(imageMap.entries()).forEach(([key, value]) => {
      console.log(key + " is " + value);
    });
  };
  return (
    <>
      {isFetching && (
        <div className="relative flex items-center justify-center h-full">
          <OverlaySpinner open={isFetching} />
        </div>
      )}

      {data?.data && (
        <div className="p-4 font-OpenSans">
          {/* Order status section */}
          <div className=" relative border border-light-gray rounded-lg">
            <div className="flex justify-between border-b border-light-gray p-6">
              <h3 className="text-2xl font-medium">Ordered Item : 1</h3>
              <h3 className="text-2xl font-medium">Status</h3>
            </div>

            <div className="flex justify-between items-center  p-6">
              <div className="flex gap-x-4">
                <img
                  src="/sneaker.png"
                  width={50}
                  className="border border-light-gray"
                />
                <div className="flex flex-col gap-y-4">
                  <span className="text-2xl font-medium">
                    {data?.data.order.productName}
                  </span>
                  <span className="text-xl">
                    {formatDate(data?.data?.order?.orderDate)}
                  </span>
                </div>
              </div>
              <OrderSelectStatus
                status={data!.data!.order_status}
                id={orderId || ""}
              />
            </div>
            <OverlaySpinner open={root.isLoading} />
          </div>
          {/* Payment details section */}
          <div className="border border-light-gray rounded-lg mt-12">
            <div className="flex justify-between border-b border-light-gray p-6">
              <h3 className="text-2xl font-medium">Payment</h3>
              <h3 className="text-2xl font-medium">Status</h3>
            </div>

            <div className="flex justify-between items-center  p-6">
              <div className="flex flex-col gap-y-4">
                <span className="text-2xl font-medium">
                  Paid via Bank Transfer
                </span>
                <span className="text-xl">{formatDate(new Date())}</span>
              </div>

              <span className="text-[#28A78B] bg-opacity-15 bg-[#28A78B] px-6 py-2 text-xl font-OpenSans">
                Paid
              </span>
            </div>
            <div className="border-t border-light-gray flex flex-col gap-y-4 p-6 ">
              <div className="flex justify-between text-xl">
                <span>Subtotal</span>
                <span>{currencyFormmater(14000)}</span>
              </div>
              <div className="flex justify-between text-xl">
                <span>Transaction Fee</span>
                <span>{currencyFormmater(100)}</span>
              </div>
              <div className="flex justify-between text-xl">
                <span>Shipping Fee</span>
                <span>{currencyFormmater(0)}</span>
              </div>
              <div className="flex justify-between text-xl">
                <span className="font-bold">Total</span>
                <span className="font-bold">{currencyFormmater(14100)}</span>
              </div>
            </div>
          </div>
          {/*Product verification section  */}
          <div className="border border-light-gray rounded-lg mt-12">
            <div className="flex justify-between border-b border-light-gray p-6">
              <h3 className="text-2xl font-medium">
                Product visual verification
                <span>
                  <Link
                    to=""
                    className="text-blue underline ml-4 font-normal text-lg"
                  >
                    Tips to take pro photos and get verified easily
                  </Link>
                </span>
              </h3>
              <span className="text-[#007AFF] bg-[#007AFF] bg-opacity-15 px-6 py-2 text-xl font-OpenSans">
                Unverified
              </span>
            </div>

            <div className="flex flex-col   p-6 gap-y-12">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <ImagePickerFactory
                  type="camera"
                  onChange={handleImageCapture}
                />
                <ImagePickerFactory
                  type="camera"
                  onChange={handleImageCapture}
                />
                <ImagePickerFactory
                  type="camera"
                  onChange={handleImageCapture}
                />
                <ImagePickerFactory
                  type="camera"
                  onChange={handleImageCapture}
                />
                <ImagePickerFactory
                  type="camera"
                  onChange={handleImageCapture}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  size="lg"
                  className="px-24 bg-blue border-blue hover:text-blue"
                  onClick={uploadImage}
                >
                  Verify
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
