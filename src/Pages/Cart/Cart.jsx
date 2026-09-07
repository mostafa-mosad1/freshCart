import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContextProvider";
import Button from "../../Components/ui/Button";
import { useNavigate, Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Loader2, Sparkles } from "lucide-react";

import toast from "react-hot-toast";

function Cart() {
  const navigate = useNavigate();
  const { cart, getCart, isLoading, quantity, removeProduct, clearCart } = useContext(CartContext);

  useEffect(() => {
    getCart();
  }, []);

  const handleProceedToCheckout = () => {
    const token = localStorage.getItem("Token");
    if (!token) {
      toast.error("Please sign in to proceed with checkout and place your order", {
        icon: "🔒",
        duration: 3500,
      });
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  const products = cart?.data?.products || [];
  const totalCartPrice = cart?.data?.totalCartPrice || 0;
  const numOfCartItems = cart?.numOfCartItems || 0;

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-8 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Shopping Cart</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
            Review Your Items
          </h1>
        </div>

        {products.length > 0 && (
          <button
            onClick={() => clearCart()}
            className="text-xs font-semibold text-rose-500 hover:text-rose-700 flex items-center gap-1.5 self-start sm:self-auto py-2 px-3 rounded-xl hover:bg-rose-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Cart</span>
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-emerald-600 mb-3" />
          <p className="text-slate-500 text-sm font-medium">Loading your shopping cart...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Products List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {products.map((item) => (
              <div
                key={item._id || item.product?.id || item.product?._id}
                className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-xs flex flex-col sm:flex-row items-center gap-5 transition-all hover:shadow-md"
              >
                {/* Product Image */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-50 border border-slate-100 flex-shrink-0 flex items-center justify-center p-2">
                  <img
                    src={item.product?.imageCover}
                    alt={item.product?.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between w-full space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {item.product?.category?.name || "Grocery"}
                      </span>
                      <h3 className="font-bold text-slate-800 text-sm sm:text-base mt-1 line-clamp-1">
                        {item.product?.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => removeProduct(item.product?.id || item.product?._id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Price & Quantity Stepper */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold text-slate-900">{item.price}</span>
                      <span className="text-xs font-semibold text-emerald-600">EGP</span>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1">
                      <button
                        onClick={() =>
                          quantity(
                            item.product?.id || item.product?._id,
                            item.count - 1
                          )
                        }
                        disabled={item.count <= 1}
                        className="p-1 rounded-lg text-slate-600 hover:bg-white hover:shadow-xs disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-slate-800 w-6 text-center">
                        {item.count}
                      </span>
                      <button
                        onClick={() =>
                          quantity(
                            item.product?.id || item.product?._id,
                            item.count + 1
                          )
                        }
                        className="p-1 rounded-lg text-slate-600 hover:bg-white hover:shadow-xs transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm sticky top-24 space-y-6">
            <h2 className="text-lg font-bold font-heading text-slate-900 pb-3 border-b border-slate-100">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Items Count</span>
                <span className="font-semibold text-slate-800">{numOfCartItems} items</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">{totalCartPrice} EGP</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-emerald-600">FREE</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between items-baseline">
              <span className="text-base font-bold text-slate-900">Total</span>
              <div className="flex items-baseline gap-1 text-right">
                <span className="text-2xl font-black text-slate-900 font-heading">
                  {totalCartPrice}
                </span>
                <span className="text-xs font-bold text-emerald-600">EGP</span>
              </div>
            </div>

            <Button
              onClick={handleProceedToCheckout}
              className="bg-emerald-500 hover:bg-emerald-600 text-white w-full py-3.5 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 text-sm flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Safe & 100% Secure Checkout</span>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Cart State */
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl border border-slate-100 shadow-xs">
          <div className="w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-slate-800">Your Cart is Empty</h2>
          <p className="text-slate-500 text-sm mt-1 max-w-sm mb-6">
            Looks like you haven&#39;t added any items to your shopping cart yet.
          </p>
          <Link
            to="/product"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm px-6 py-3 rounded-2xl shadow-md transition-all active:scale-95"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;

