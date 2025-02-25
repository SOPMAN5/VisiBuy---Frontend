import { addToCart } from "@/modules/Buyer/features/cart/cartSlice";
import OrderSuccess from "@/ui/buyer/OrderSuccess";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

interface Product {
  id: number;
  brand: string;
  model: string;
  description: string;
  image: string;
  storeName: string;
  storeAvatar: string;
  productName: string;
  sizes: number[];
  price: string;
  colors: string[];
}

function ProductDetails() {
  const dispatch = useDispatch();
  const [data, setData] = useState<Product | undefined>(undefined);
  const [count, setCount] = useState<number>(1);
  const { id } = useParams<{ id: string }>();

  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  const handleOrderSuccess = () => {
    setShowOrderSuccess(true);
    //TODO;
    // dispatch(
    //   addToCart()
    // );
  };

  return (
    <div className='h-[100%] w-[90%] p-8'>
      {showOrderSuccess && (
        <OrderSuccess onClose={() => setShowOrderSuccess(false)} />
      )}

      <div className='flex flex-col  py-8 text-xl gap-8'>
        {/* md:grid md:grid-cols-2 */}
        {/* title */}
        <h2 className='font-semibold uppercase text-2xl'>{data?.model}</h2>
        {/* image */}
        <div
          style={{ width: "100%" }}
          className='h-[263px] flex justify-center'
        >
          <img
            src={data?.image}
            alt={data?.model}
            style={{ width: "75%", height: "80%" }}
          />
        </div>
        {/* color and sizes */}
        <div className='flex gap-8'>
          <div>
            <label htmlFor='color'>Color</label>
            <br />
            <select
              name='color'
              id='color'
              className='min-w-[130px] h-12 border-2 border-gray-400 rounded'
            >
              <option value=''>lorem lorem lorem</option>
              <option value=''>lorem lorem lorem</option>
              <option value=''>lorem lorem lorem</option>
              <option value=''>lorem lorem lorem</option>
              <option value=''>lorem lorem lorem</option>
              <option value=''>lorem lorem lorem</option>
              <option value=''>lorem lorem lorem</option>
              <option value=''>lorem lorem lorem</option>
            </select>
          </div>
          <div>
            <label htmlFor='size'>Size</label>
            <br />
            <select
              name='size'
              id='size'
              className='min-w-[130px] h-12 border-2 border-gray-400 rounded'
            >
              <option value=''>lorem lorem lorem</option>
              <option value=''>lorem lorem lorem</option>
              <option value=''>lorem lorem lorem</option>
              <option value=''>lorem lorem lorem</option>
              <option value=''>lorem lorem lorem</option>
              <option value=''>lorem lorem lorem</option>
              <option value=''>lorem lorem lorem</option>
              <option value=''>lorem lorem lorem</option>
            </select>
          </div>
        </div>

        <div className='md:w-md'>
          <label htmlFor=''>Amount</label>
          <div className='flex items-center text-center gap-4 rounded h-12 mt-6 font-bold text-2xl'>
            {count === 1 ? (
              <button className='px-4'>-</button>
            ) : (
              <button
                onClick={() => setCount((count) => count - 1)}
                className='p-2 px-4 bg-green-400 rounded-full cursor-pointer flex items-center'
              >
                -
              </button>
            )}
            <span className='px-4 w-[150px] h-full flex items-center justify-center border-2'>
              {count}
            </span>

            <button
              className='px-4 bg-green-400 rounded-full cursor-pointer h-full flex items-center'
              onClick={() => setCount((count) => count + 1)}
            >
              +
            </button>
          </div>
          <p className='mt-4'>{data?.description}</p>
          <div className='flex gap-2 md:gap-4'>
            <button
              className='w-[264px] h-12 mt-6 px-2 md:px-6 font-semibold rounded-md bg-green-600 text-white cursor-pointer hover:bg-green-400'
              onClick={handleOrderSuccess}
              type='submit'
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
