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
import { useEffect } from "react";
const Header = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const carts = useSelector(getAllCarts);
  const cartItems = useSelector(getCartItemsCount);
  useEffect(() => {
    dispatch(getCartTotal());
  }, [carts, dispatch]);
  return (
    <>
      <header className="bg-pink-600 py-3 text-white shadow">
        <div className="container mx-auto px-4 flex gap-3 items-center">
          <div
            className="h-10 text-white font-semibold items-center justify-center flex relative cursor-pointer"
            onClick={() => dispatch(setSidebarOn())}
          >
            <FaBars className="text-xl" />
          </div>
          <Link to={"/"} className="font-bold text-2xl">
            MYECOM
          </Link>
          <div className="w-full relative">
            <input
              type="text"
              className="w-full h-10 bg-white text-slate-800 outline-none pl-3 pr-24"
            />
            <Link
              to="/"
              className="absolute right-2 bg-pink-500 h-7 top-1/2 -translate-y-1/2 px-3 items-center justify-center flex shadow"
            >
              <FaSistrix />
            </Link>
          </div>
          <Link
            to={"/"}
            className="h-10 text-white font-semibold px-3 items-center justify-center flex relative"
          >
            <FaCartShopping className="text-2xl" />
            <span className="absolute top-0 right-0">{cartItems}</span>
          </Link>
        </div>
      </header>
      <div className="bg-pink-600/80 py-1 text-white shadow">
        <div className="container mx-auto px-4">
          <ul className=" flex gap-4 w-full">
            {categories?.length &&
              categories.slice(0, 10).map((category, idx) => {
                return (
                  <li key={idx}>
                    <Link
                      to={`category/${category}`}
                      className="capitalize text-sm"
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
