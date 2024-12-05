import { IProduct } from "../../../models/product";
import { SellerProductCard } from "./product-card";
export function ProductGrid({ products }: { products: IProduct[] }) {
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {products &&
          products.map((product) => <SellerProductCard {...product} />)}
      </div>
    </>
  );
}
