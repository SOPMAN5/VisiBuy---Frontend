import FilterComponent from "@/modules/Buyer/features/filter/Filter";
import { selectFilteredProducts } from "@/modules/Buyer/selectors";
import ProductSkeleton from "@/ui/ProductSkeleton";
import { useState } from "react";
import { useSelector } from "react-redux";

interface Product {
  id: number;
  image?: string;
  storeName: string;
  storeAvatar: string;
  productName: string;
  sizes: number[];
  color: string[];
  price: number;
}

const BuyerProductsPage = () => {
  const products = useSelector((state: any) => state.buyer.products) || [];
  const filteredProducts = useSelector(selectFilteredProducts) || [];
  const filters = useSelector((state: any) => state.buyer.filters) || {};
  const [filtersApplied, setFiltersApplied] = useState(false);

  // const filtersApplied =
  //   (filters?.size?.length ?? 0) > 0 ||
  //   (filters?.color?.length ?? 0) > 0 ||
  //   (filters?.priceRange?.[0] ?? 0) !== 0 ||
  //   (filters?.priceRange?.[1] ?? 1000) !== 1000;

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2>Products</h2>
        <FilterComponent
          onApplyFilters={() => setFiltersApplied((prev) => !prev)}
        />
      </div>

      {/* Show filtered products if filters are applied */}
      {filtersApplied ? (
        filteredProducts.length > 0 ? (
          <div>
            {filteredProducts.map((product) => (
              <div key={product?.id} className='product-card'>
                <h3>{product?.name}</h3>
                <p>Size: {product?.sizes.join(", ")}</p>
                <p>Color: {product?.color.join(", ")}</p>
                <p>Price: ${product?.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No products match the selected filters.</p>
        )
      ) : (
        // Show all products only if no filters are applied
        <div>
          {products?.map((product: Product) => (
            <ProductSkeleton key={product?.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyerProductsPage;
