import { useSelector, useDispatch } from "react-redux";
import { getSidebarStatus, setSidebarOff } from "../../store/sidebarSlice";
import { FaXmark } from "react-icons/fa6";
import { useEffect } from "react";
import { fetchCategories, getAllCategories } from "../../store/categorySlice";
import { Link } from "react-router-dom";
const SideBar = () => {
  const dispatch = useDispatch();
  const isSidebarOn = useSelector(getSidebarStatus);
  const categories = useSelector(getAllCategories);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <aside
      className={`${
        isSidebarOn ? `translate-x-0` : "-translate-x-72"
      } transition-all duration-300 fixed left-0 top-0 h-[100dvh] bg-white w-72 shadow flex flex-col z-10`}
    >
      <div className="flex justify-between items-center p-4 shrink-0">
        <h4 className="text-slate-900 font-bold text-2xl">All Categories</h4>
        <button onClick={() => dispatch(setSidebarOff())}>
          <FaXmark className="text-2xl" />
        </button>
      </div>
      <div className="h-full overflow-auto">
        <ul className="w-full flex flex-col">
          {categories?.length &&
            categories.map((category, idx) => {
              return (
                <li key={idx} className="px-4 py-1.5 border-b">
                  <Link
                    to={`category/${category}`}
                    className="capitalize block"
                  >
                    {category.replace("-", " ")}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </aside>
  );
};
export default SideBar;
