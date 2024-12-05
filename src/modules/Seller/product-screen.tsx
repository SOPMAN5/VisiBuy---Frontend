import { Button } from "@/ui/Button";
import { ProductGrid } from "./features/product/components/product-grid";
import { IProduct } from "./models/product";
import { Plus } from "lucide-react";
import { AddProductModal } from "./features/product/components/modals/add-product-modal";
import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import { createQueryString } from "@/lib/utils";
import { MainLayout } from "@/layouts/main-layout";

export function ProductScreen() {
  const products: IProduct[] = [];
  const [searchParams, setSearchParams] = useSearchParams();
  const handleAddProduct = useCallback(
    function () {
      const queryStrings = createQueryString(
        "modal",
        "add-product",
        searchParams.toString()
      );
      setSearchParams(queryStrings);
    },
    [searchParams]
  );
  return (
    <MainLayout title="Product List">
      {products.length > 0 && <ProductGrid products={products} />}
      {products.length == 0 && (
        <div className="flex flex-col min-h-screen justify-center items-center ">
          <img src="/product-inactive.png" alt="No active product" />
          <h2 className="text-4xl font-Montserrat font-medium">
            There are no active product
          </h2>
          <p className="text-2xl font-OpenSans my-6">
            Add new products by clicking on the add product button below
          </p>
          <Button
            size="lg"
            onClick={handleAddProduct}
            className="text-secondary-foreground font-regular text-2xl justify-evenly gap-6 bg-light-gray border-none hover:bg-light-gray hover:text-secondary-foreground"
          >
            <Plus></Plus> Add new product
          </Button>
        </div>
      )}
      <AddProductModal />
    </MainLayout>
  );
}
