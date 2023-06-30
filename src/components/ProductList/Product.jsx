import { Link } from "react-router-dom";
import { formatPrice } from "./../../utils";
const Product = ({ product }) => {
  return (
    <Link to={`product/${product?.id}`}>
      <div className="bg-white relative shadow">
        <div className="absolute bg-pink-600 text-white text-sm px-3 py-1 left-0 top-0">
          {product?.category}
        </div>
        <div className="aspect-square overflow-hidden items-center justify-center flex p-3">
          <img
            src={product?.images[0]}
            alt={product?.title}
            className="object-fill"
          />
        </div>
        <div className="py-3">
          <div className="text-center px-1">
            <p className="text-xs md:text-sm sm:text-xs">
              Brand: {product?.brand}
            </p>
          </div>
          <div className="text-slate-800 font-semibold text-center line-clamp-1 px-1">
            {product?.title}
          </div>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <div className="line-through text-slate-400 text-xs md:text-sm sm:text-xs">
              {formatPrice(product?.price)}
            </div>
            <div className="font-bold text-slate-800 text-sm md:text-base sm:text-sm">
              {formatPrice(product?.discountedPrice)}
            </div>
            <div className="text-xs md:text-sm sm:text-xs text-amber-600">
              ({product?.discountPercentage}% Off)
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Product;
