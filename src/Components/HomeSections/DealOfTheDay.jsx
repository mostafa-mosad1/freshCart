import { useState, useEffect, useContext } from "react";
import { Flame, Clock, ShoppingCart, Star, ShieldCheck, ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import { CartContext } from "../../Context/CartContextProvider";
import { Link } from "react-router-dom";
import dealImg from "../../assets/images/blog-img-1.jpeg";

export default function DealOfTheDay() {
  const { addToCart, isLoading } = useContext(CartContext);

  // Countdown timer calculation (Ends at midnight or rolling 14 hours)
  const [timeLeft, setTimeLeft] = useState({
    hours: 11,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format double digits
  const f = (n) => String(n).padStart(2, "0");

  return (
    <section className="my-12">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-10 border border-slate-800 text-white relative overflow-hidden shadow-xl">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Offer Details & Countdown (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 bg-rose-500 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm animate-pulse">
                <Flame className="w-4 h-4 fill-white" />
                Flash Deal of the Day
              </span>
              <span className="text-xs text-slate-300 font-semibold hidden sm:inline">
                Limited Stock Available
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading leading-tight max-w-lg">
              Fresh Organic Harvest Basket Bundle
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed max-w-md">
              Handpicked selection of premium seasonal vegetables, organic citrus fruits, and artisanal honey directly from local producers.
            </p>

            {/* Countdown Box */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Ends In:</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-slate-800/90 border border-slate-700 px-3 py-2 rounded-2xl text-center min-w-[52px]">
                  <span className="block text-lg font-black font-mono text-emerald-400">
                    {f(timeLeft.hours)}
                  </span>
                  <span className="block text-[10px] text-slate-400 uppercase font-bold">Hours</span>
                </div>
                <span className="text-emerald-500 font-black text-lg">:</span>
                <div className="bg-slate-800/90 border border-slate-700 px-3 py-2 rounded-2xl text-center min-w-[52px]">
                  <span className="block text-lg font-black font-mono text-emerald-400">
                    {f(timeLeft.minutes)}
                  </span>
                  <span className="block text-[10px] text-slate-400 uppercase font-bold">Mins</span>
                </div>
                <span className="text-emerald-500 font-black text-lg">:</span>
                <div className="bg-slate-800/90 border border-slate-700 px-3 py-2 rounded-2xl text-center min-w-[52px]">
                  <span className="block text-lg font-black font-mono text-emerald-400">
                    {f(timeLeft.seconds)}
                  </span>
                  <span className="block text-[10px] text-slate-400 uppercase font-bold">Secs</span>
                </div>
              </div>
            </div>

            {/* Price & Progress */}
            <div className="space-y-2 max-w-sm">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-white font-heading">199 EGP</span>
                <span className="text-base text-slate-400 line-through">350 EGP</span>
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Save 43%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-400 to-emerald-500 h-full rounded-full w-[78%]" />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Available: <strong>22 packs</strong></span>
                  <span>Sold: <strong>78 packs</strong></span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/product"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Shop Flash Deals</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Featured Image with Badge (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60 group">
              <img
                src={dealImg}
                alt="Deal of the Day"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-1 bg-amber-500/90 text-slate-950 px-2.5 py-1 rounded-xl w-fit text-xs font-bold mb-1">
                  <Star className="w-3.5 h-3.5 fill-slate-950" />
                  <span>4.9 / 5.0 (520+ Reviews)</span>
                </div>
                <p className="text-white font-bold text-base">Certified Farm Harvest</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
