import { Link } from "react-router-dom";
import { FaCartShopping, FaSistrix, FaBars } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { setSidebarOn } from "../../store/sidebarSlice";
import { getAllCategories } from "../../store/categorySlice";
import {
  getCartItemsCount,
  getAllCarts,
  getCartTotal,
} from "../../store/cartSlice";
import { useEffect, useState } from "react";
import CartModal from "../CartModal";
const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const carts = useSelector(getAllCarts);
  const cartItems = useSelector(getCartItemsCount);
  useEffect(() => {
    dispatch(getCartTotal());
  }, [carts, dispatch]);

  const handleSearchTerm = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <header className="bg-pink-600 py-1 md:py-3 sm:py-1 text-white shadow z-10 sticky top-0">
        <div className="container mx-auto px-4 flex gap-1 md:gap-3 sm:gap-1 items-center flex-wrap">
          <div className="flex gap-3 items-center justify-center flex-shrink-0">
            <div
              className="h-10 text-white font-semibold items-center justify-center flex relative cursor-pointer"
              onClick={() => dispatch(setSidebarOn())}
            >
              <FaBars className="text-xl" />
            </div>
            <Link to={"/"} className="font-bold text-2xl">
              MYECOM
            </Link>
          </div>
          <div className="flex gap-3 flex-grow">
            <div className="w-full relative">
              <input
                type="text"
                className="w-full h-10 bg-white text-slate-800 outline-none pl-3 pr-24"
                onChange={(e) => handleSearchTerm(e)}
              />
              <Link
                to={`search/${searchTerm}`}
                className="absolute right-2 bg-pink-500 h-7 top-1/2 -translate-y-1/2 px-3 items-center justify-center flex shadow"
              >
                <FaSistrix />
              </Link>
            </div>
            <div className="h-10  text-white font-semibold px-3 items-center justify-center flex relative">
              <FaCartShopping
                className="text-2xl cursor-pointer"
                onClick={() => setShowCart(!showCart)}
              />
              <span className="absolute top-0 right-0 text-pink-500 bg-white w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold">
                {cartItems}
              </span>
              {showCart && (
                <CartModal carts={carts} setShowCart={setShowCart} />
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="bg-pink-600/80 py-1 text-white shadow ">
        <div className="container mx-auto px-4">
          <ul className="flex gap-4 w-full overflow-hidden">
            {categories?.length &&
              categories.slice(0, 10).map((category, idx) => {
                return (
                  <li key={idx} className="shrink-0">
                    <Link
                      to={`category/${category}`}
                      className="capitalize text-sm block"
                    >
                      {category.replace("-", " ")}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Header;
