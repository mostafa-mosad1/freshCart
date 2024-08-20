import { useContext, useEffect } from "react";
import { RingLoader } from "react-spinners";
import { CartContext } from "../../Context/CartContextProvider";
import Button from "../../Components/ui/Button";
import { useNavigate } from "react-router-dom";
function Cart() {
  const navgate = useNavigate();

  const { cart, getCart, isLoading, quantity, removeProduct } =
    useContext(CartContext);
  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[400px] relative">
          <RingLoader className=" absolute" color="#49cf33" size={100} />{" "}
        </div>
      ) : cart?.data.products.length != 0 &&
        cart?.data.products != undefined ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-6">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cart?.data.products.map((element) => (
                <tr
                  key={element.product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <img
                      src={element.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt="Apple Watch"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {element.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          quantity(element.product.id, element.count - 1)
                        }
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <input
                          type="number"
                          id="first_product"
                          className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={element.count}
                          required
                        />
                      </div>
                      <button
                        onClick={() =>
                          quantity(element.product.id, element.count + 1)
                        }
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {element.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      onClick={() => removeProduct(element.product.id)}
                      name={"remove"}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="text-xl font-semibold text-black">
                <td className="p-4" colSpan={3}>
                  Total Cart Price
                </td>
                <td>{cart?.data.totalCartPrice} EGP</td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <h2 className="text-center text-2xl font-semibold my-20">
          cart is empty
        </h2>
      )}
      {cart?.data.products.length != 0 && cart?.data.products != undefined && (
        <Button
          onClick={() => navgate("/checkout")}
          name={"Checkout "}
          className={"ms-auto  w-full md:w-fit bg-mainColor text-white mb-4"}
        />
      )}
    </>
  );
}

export default Cart;
