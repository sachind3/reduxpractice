import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  getAllCarts,
  toggleCartQty,
  getCartTotal,
} from "../store/cartSlice";
import { formatPrice } from "../utils";
import { Link } from "react-router-dom";
import { FaTrashCan, FaMinus, FaPlus } from "react-icons/fa6";

const CartPage = () => {
  const dispatch = useDispatch();
  const carts = useSelector(getAllCarts);
  const { itemsCount, totalAmount } = useSelector((state) => state.cart);
  console.log(carts);

  if (carts.length === 0) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4 ">
          <div className="flex items-center justify-center flex-col gap-4 bg-white shadow p-4">
            <div className="text-3xl">Your shopping cart is empty!</div>
            <Link
              to="/"
              className="bg-pink-600 flex items-center justify-center gap-2 border border-pink-600 px-4 py-2 text-white"
            >
              Go Shopping Now
            </Link>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-4">
      <div className="container px-4 mx-auto">
        <div className="bg-white w-full overflow-auto">
          <table>
            <thead className="w-full">
              <tr>
                <th>S.N</th>
                <th>Product</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((cart, idx) => {
                return (
                  <tr key={cart?.id}>
                    <td>{idx + 1}</td>
                    <td>{cart.title}</td>
                    <td>{formatPrice(cart?.discountedPrice)}</td>
                    <td>
                      <div className="flex bg-white w-full mx-auto">
                        <button
                          className="w-10 h-10 border flex items-center justify-center"
                          type="button"
                          onClick={() =>
                            dispatch(
                              toggleCartQty({ id: cart?.id, type: "DEC" })
                            )
                          }
                        >
                          <FaMinus />
                        </button>
                        <div className="w-10 h-10 border flex items-center justify-center">
                          {cart?.quantity}
                        </div>
                        <button
                          className="w-10 h-10 border flex items-center justify-center"
                          type="button"
                          onClick={() =>
                            dispatch(
                              toggleCartQty({ id: cart?.id, type: "INC" })
                            )
                          }
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </td>
                    <td className="font-bold text-pink-600">
                      {formatPrice(cart?.totalPrice)}
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => dispatch(removeFromCart(cart?.id))}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="bg-white p-3 mt-4 shadow-sm flex justify-between items-center flex-wrap">
          <button
            type="button"
            onClick={() => dispatch(clearCart())}
            className="bg-pink-200 flex items-center justify-center gap-2 border border-pink-400 px-4 py-2 text-pink-600"
          >
            <FaTrashCan /> Clear Cart
          </button>
          <div className="flex flex-col gap-2">
            <div>
              Total ({itemsCount}) items:{" "}
              <span className="font-bold text-pink-600 text-xl">
                {formatPrice(totalAmount)}
              </span>
            </div>
            <button
              type="button"
              className="bg-pink-600 flex items-center justify-center gap-2 border border-pink-600 px-4 py-2 text-white"
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CartPage;
