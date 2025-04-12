import { ProductDto } from "@/modules/Seller/models/product";
import { PreviewImagesCard } from "./preview-image-card";
import { formatCurrency } from "@/lib/utils";

export const ProductPreview = ({
  productFormData,
}: {
  productFormData?: Omit<ProductDto, "id">;
}) => {
  //   const { images, brand, model, size, color, price, description } =
  //     productFormData;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="max-h-auto">
        <PreviewImagesCard
          images={[
            { id: "1", url: "/sneaker.png" },
            { id: "1", url: "/sneaker.png" },
            { id: "1", url: "/sneaker.png" },
            { id: "1", url: "/sneaker.png" },
          ]}
        />
      </div>

      <div className="space-y-8 font-OpenSans">
        <h3 className="font-Montserrat text-xl md:text-2xl font-medium ">
          Nike Air Jordan 1 Retro OG High UNC Toe DZ5485-400
        </h3>
        <hr className="h-[1px] w-full bg-light-gray" />
        <p className="font-semibold text-xl md:text-2xl ">
          NGN {formatCurrency(140000, false)}
        </p>
        <hr className="h-[1px] w-full bg-light-gray" />
        <p className="font-semibold text-lg md:text-xl ">Brand: Jordan</p>
        <hr className="h-[1px] w-full bg-light-gray" />
        <p className="font-semibold text-lg md:text-xl">Size: 2,4,5</p>
        <hr className="h-[1px] w-full bg-light-gray" />
        <p className="font-semibold text-lg md:text-xl">Color: Blue</p>
        <hr className="h-[1px] w-full bg-light-gray" />
        <p className="font-semibold text-lg md:text-xl">
          Description: <br /> <br />
          <span className="pt-4 font-normal leading-8">
            The Nike Air Jordan 1 Retro OG High "UNC Toe" (DZ5485-400) features
            a UNC blue, black, and white color scheme inspired by Michael
            Jordan’s college days. This model’s blue toe box and black overlays
            make it a standout for fans and collectors alike.
          </span>
        </p>
      </div>
    </div>
  );
};
