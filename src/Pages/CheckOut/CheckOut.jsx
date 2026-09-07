import { useForm } from "react-hook-form";
import Button from "../../Components/ui/Button";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContextProvider";
import { MapPin, Phone, FileText, CreditCard, ShieldCheck, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function CheckOut() {
  const { Checkout, cart, isLoading } = useContext(CartContext);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (inputsData) => {
    Checkout(inputsData);
  };

  const totalCartPrice = cart?.data?.totalCartPrice || 0;
  const numOfCartItems = cart?.numOfCartItems || 0;

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8 pb-16">
      <Link
        to="/cart"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Cart</span>
      </Link>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Secure Checkout
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight">
            Shipping & Payment Information
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Please enter your delivery details to complete your order.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Shipping Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold font-heading text-slate-900 mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span>Delivery Address</span>
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Details */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Street Address / Apartment Details
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. 123 Main St, Apartment 4B"
                  {...register("details", { required: "Street address is required" })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                />
              </div>
              {errors.details && (
                <p className="text-rose-500 text-xs mt-1">{errors.details.message}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                City / Region
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Cairo, Giza, Alexandria"
                  {...register("city", { required: "City is required" })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                />
              </div>
              {errors.city && (
                <p className="text-rose-500 text-xs mt-1">{errors.city.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="e.g. 01012345678"
                  {...register("phone", { required: "Phone number is required" })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                />
              </div>
              {errors.phone && (
                <p className="text-rose-500 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div className="pt-3">
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 text-sm flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pay Online & Place Order</span>
              </Button>
            </div>
          </form>
        </div>

        {/* Order Summary (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5">
          <h3 className="text-base font-bold font-heading text-slate-900 pb-3 border-b border-slate-100">
            Order Review
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Items Total</span>
              <span className="font-semibold text-slate-800">{numOfCartItems} items</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-800">{totalCartPrice} EGP</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Express Delivery</span>
              <span className="font-semibold text-emerald-600">FREE</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between items-baseline">
            <span className="text-base font-bold text-slate-900">Total Due</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900 font-heading">
                {totalCartPrice}
              </span>
              <span className="text-xs font-bold text-emerald-600">EGP</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-900 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Encrypted & Safe</span>
            </div>
            <p className="text-emerald-700 leading-relaxed text-[11px]">
              You will be redirected securely to Stripe to complete your credit card or debit card payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;

