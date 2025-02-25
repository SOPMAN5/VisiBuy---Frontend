import { Link } from "react-router-dom";
import { addToCart } from "@/modules/Buyer/features/cart/cartSlice";
import { FaShoppingCart } from "react-icons/fa";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";

interface Product {
  sizes: any;
  id: number;
  image?: string;
  storeName: string;
  storeAvatar?: string;
  productName: string;
  // sizes: number[];
  // color: string[];
  price: number;
}

interface ProductSkeletonProps {
  product: Product;
}

const ProductSkeleton: React.FC<ProductSkeletonProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation

    dispatch(
      addToCart({
        id: product.id,
        name: product.productName,
        price: product.price,
        quantity: 1,
        image: product.image,
        color: undefined,
        sizes: undefined,
      })
    );
  };

  return (
    <div className='relative w-fit'>
      {/* Link to Product Details */}
      <Link
        to={`/dashboard/buyer/product/${product.id}`}
        className='block w-fit'
      >
        <div className='relative bg-black text-white rounded-lg overflow-hidden w-fit'>
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.productName}
            className='w-[251px] h-[242px] object-cover'
          />

          <div className='absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-end'>
            {/* Seller Info */}
            <div className='flex items-center mb-2'>
              <img
                src={product.storeAvatar}
                alt={product.storeName}
                className='w-8 h-8 rounded-full mr-2'
              />
              <span className='text-sm text-gray-300'>{product.storeName}</span>
            </div>

            {/* Product Details */}
            <h3 className='text-lg font-semibold'>{product.productName}</h3>
            <p className='text-gray-400 text-sm'>
              Sizes: {product.sizes.join(", ")}
            </p>

            {/* Price */}
            <p className='text-lg font-bold mt-1'>{product.price} NGN</p>
          </div>
        </div>
      </Link>

      {/* Floating Add to Cart Button (Prevents Navigation) */}
      <button
        onClick={handleAddToCart}
        className='absolute top-2 right-2 bg-green-500 p-2 rounded-full shadow-md z-10'
      >
        <FaShoppingCart className='text-white' />
      </button>
    </div>
  );
};

export default ProductSkeleton;
