import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSingleProduct,
  getSingleProduct,
  getSingleProductStatus,
} from "../store/productSlice";
import { STATUS, formatPrice } from "../utils";
import Loader from "../components/ui/Loader";
import { FaCartShopping, FaMinus, FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { addToCart } from "../store/cartSlice";
import { toast } from "react-hot-toast";

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector(getSingleProduct);
  const productStatus = useSelector(getSingleProductStatus);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [id, dispatch]);

  let discountedPrice =
    product?.price - product?.price * (product?.discountPercentage / 100) || 0;
  const thumbs = product?.images?.length ? product?.images : [];

  const increaseQty = () => {
    setQuantity((prev) => {
      let tempQty = prev + 1;
      if (tempQty > product?.stock) tempQty = product?.stock;
      return tempQty;
    });
  };
  const decreaseQty = () => {
    setQuantity((prev) => {
      let tempQty = prev - 1;
      if (tempQty < 1) tempQty = 1;
      return tempQty;
    });
  };

  const addToCartHandler = (product) => {
    let discountedPrice =
      product?.price - product?.price * (product?.discountPercentage / 100);
    let totalPrice = quantity * discountedPrice;
    dispatch(
      addToCart({
        ...product,
        quantity: quantity,
        totalPrice,
        discountedPrice,
      })
    );
    toast.success("An item has been added to cart.");
  };

  if (productStatus === STATUS.LOADING) {
    return <Loader />;
  }
  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 sm:grid-cols-1 gap-4 bg-white shadow w-full">
          <div className="relative col-span-2 p-3">
            <div className="aspect-square">
              {product?.images?.length > 0 && (
                <img
                  src={product?.images?.[0]}
                  alt={product?.title}
                  className="object-contain w-full h-full"
                />
              )}
            </div>
            <div className="grid grid-cols-5 gap-1 mt-1">
              {thumbs?.length &&
                thumbs.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className="bg-white aspect-square overflow-hidden flex items-center justify-center"
                    >
                      <img src={item} alt="thumb" className="object-contain" />
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="col-span-3 p-4">
            <h4 className="text-xl md:text-3xl sm:text-xl text-slate-800 font-bold mb-2">
              {product?.title}
            </h4>
            <p className="text-base md:text-xl sm:text-base text-slate-700 font-semibold mb-1">
              {product?.description}
            </p>
            <div className="flex gap-3 text-base md:text-lg sm:text-base mb-4 flex-wrap">
              <div>
                <span>Rating</span>:{" "}
                <span className="text-pink-600 font-semibold">
                  {product?.rating}
                </span>
              </div>
              <div>
                <span>Brand</span>:{" "}
                <span className="text-pink-600 font-semibold">
                  {product?.brand}
                </span>
              </div>
              <div>
                <span>Category</span>:{" "}
                <span className="text-pink-600 font-semibold">
                  {product?.category ? product?.category.replace("-", " ") : ""}
                </span>
              </div>
            </div>
            <p className="text-slate-400 ">
              <span className="line-through text-lg">
                {product?.price && formatPrice(product?.price)}
              </span>{" "}
              Inclusive of all taxes
            </p>
            <div className="flex gap-3 items-center mb-4">
              <p className="font-bold text-2xl text-slate-700">
                {discountedPrice && formatPrice(discountedPrice)}
              </p>
              <p className="text-sm text-amber-600">
                {product?.discountPercentage && product?.discountPercentage}%
                Off
              </p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div>Quantity:</div>
              <div className="grid grid-cols-3 bg-white">
                <button
                  className="w-10 h-10 border flex items-center justify-center"
                  type="button"
                  onClick={decreaseQty}
                >
                  <FaMinus />
                </button>
                <div className="w-10 h-10 border flex items-center justify-center">
                  {quantity}
                </div>
                <button
                  className="w-10 h-10 border flex items-center justify-center"
                  type="button"
                  onClick={increaseQty}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            {product?.stock === 0 && <div>Out of stock</div>}
            <div className="flex gap-4">
              <button
                className="bg-pink-200 flex items-center justify-center gap-2 border border-pink-400 px-4 py-2 text-pink-600"
                onClick={() => addToCartHandler(product)}
              >
                <FaCartShopping /> Add to cart
              </button>
              <button className="bg-pink-600 flex items-center justify-center gap-2 border border-pink-600 px-4 py-2 text-white">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductDetailPage;
