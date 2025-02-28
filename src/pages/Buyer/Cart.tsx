import ProductSkeleton from "@/ui/ProductSkeleton";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "@/modules/Buyer/features/cart/cartSlice";
import { RootState } from "@/store/store";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.buyer.cart.items);

  return (
    <div>
      <h2 className='text-3xl font-bold'>Cart</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 p-6'>
        {cartItems.length === 0 ? (
          <div className='text-6xl h-[70vh] w-[100%] flex items-center justify-center text-gray-300'>
            Cart is empty
          </div>
        ) : null}
        {cartItems.map((item) => (
          <div key={item.id}>
            <ProductSkeleton type='cart' product={item} />
            {/* <h3>{item.name}</h3>
          <p>
            {item.price} NGN x {item.quantity}
          </p>
          <button onClick={() => dispatch(removeFromCart(item.id))}>
            Remove
          </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;

// interface Product {
//   id: number;
//   image: string;
//   storeName: string;
//   storeAvatar: string;
//   productName: string;
//   sizes: number[];
//   price: string;
// }
// const BuyerCartPage = () => {
//   const count = [
//     {
//       id: 1,
//       image: "string",
//       storeName: "string",
//       storeAvatar: "string",
//       productName: "string",
//       sizes: [2, 3, 4, 5, 6],
//       price: "200",
//     },
//   ];
//   return (
//     <div>
//       <div className='font-bold text-2xl'>Cart</div>
//       <div>
//         {count.length === 0 ? (
//           <h2>carts empty for now</h2>
//         ) : (
//           count.map((product: Product) => (
//             <ProductSkeleton key={product.id} product={product} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default BuyerCartPage;
