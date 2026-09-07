import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContextProvider";
import { CheckCircle2, ShoppingBag, ArrowRight, PackageCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";

function AllOrders() {
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-xl space-y-6">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-50 border-8 border-emerald-100/50 flex items-center justify-center text-emerald-500 mx-auto animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Payment Completed
          </span>
          <h1 className="text-3xl font-extrabold font-heading text-slate-900 mt-2">
            Thank You for Your Order!
          </h1>
          <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
            Your payment has been successfully processed and your grocery order is now being prepared for fast delivery.
          </p>
        </div>

        {/* Order Details box */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-left space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-semibold uppercase">Status</span>
            <span className="text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full font-bold">
              Processing & In Prep
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-semibold uppercase">Estimated Delivery</span>
            <span className="text-slate-800 font-bold flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-emerald-600" /> Within 2-4 Hours
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/home"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
          <Link
            to="/product"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm px-6 py-3.5 rounded-2xl transition-all"
          >
            <span>Explore More Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AllOrders;