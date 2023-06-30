import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils";
const CartModal = ({ carts, setShowCart }) => {
  const navigate = useNavigate();
  const gotoCart = () => {
    navigate("cart");
    setShowCart(false);
  };
  return (
    <div className="absolute bg-slate-50 top-10 right-0 w-72 text-slate-800 shadow-xl">
      <h4 className="text-lg text-center p-2 border-b-[1px]">
        Recently Added Products
      </h4>
      {carts?.length > 0 ? (
        <>
          <div className="flex flex-col w-full ">
            {carts.map((cart) => {
              return (
                <div
                  key={cart.id}
                  className="grid grid-cols-7 p-2 items-center border-b-[1px]"
                >
                  <div className="col-span-1">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={cart?.thumbnail}
                        alt={cart?.title}
                        className="w-full h-full object-fill"
                      />
                    </div>
                  </div>
                  <div className="col-span-4 truncate text-sm px-1">
                    {cart?.title}
                  </div>
                  <div className="col-span-2 text-right text-sm">
                    {formatPrice(cart?.discountedPrice)}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center p-2">
            <button
              type="button"
              className="bg-pink-600 flex items-center justify-center gap-2 border border-pink-600 px-3 py-1 text-white"
              onClick={gotoCart}
            >
              View cart
            </button>
          </div>
        </>
      ) : (
        <div className="p-3">No products yet</div>
      )}
    </div>
  );
};
export default CartModal;
