import { ArrowRight, Copy, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import banner1 from "../../assets/images/grocery-banner.png";
import banner2 from "../../assets/images/grocery-banner-2.jpeg";
import banner3 from "../../assets/images/banner-4.jpeg";
import toast from "react-hot-toast";

export default function PromoGridBanners() {
  const [copiedCode, setCopiedCode] = useState(null);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Coupon code "${code}" copied to clipboard!`, {
      icon: "🎉",
      duration: 2500,
    });
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const banners = [
    {
      img: banner1,
      badge: "Organic Fresh",
      title: "100% Farm Fresh Fruits & Veggies",
      desc: "Get 20% off on all organic green products.",
      code: "GREEN20",
      cta: "Shop Produce",
      link: "/product",
      bgGradient: "from-emerald-950/80 via-emerald-950/40 to-transparent",
    },
    {
      img: banner2,
      badge: "Breakfast Special",
      title: "Pure Artisan Bakery & Dairy",
      desc: "Fresh morning bake delivered daily before 8 AM.",
      code: "MORNING15",
      cta: "Explore Dairy",
      link: "/product",
      bgGradient: "from-amber-950/80 via-amber-950/40 to-transparent",
    },
    {
      img: banner3,
      badge: "Pantry Staples",
      title: "Spices, Cereals & Cold Drinks",
      desc: "Stock up your kitchen with top brand items.",
      code: "PANTRY10",
      cta: "Stock Up",
      link: "/product",
      bgGradient: "from-slate-950/80 via-slate-950/40 to-transparent",
    },
  ];

  return (
    <section className="my-10">
      <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Special Offers</span>
      </div>
      <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-800 mb-6">
        Exclusive Seasonal Deals
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {banners.map((item, idx) => (
          <div
            key={idx}
            className="group relative h-[250px] sm:h-[280px] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col justify-end p-6 text-white"
          >
            {/* Background Image */}
            <img
              src={item.img}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out brightness-[0.75]"
            />

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${item.bgGradient}`} />

            {/* Content */}
            <div className="relative z-10 space-y-2">
              <span className="inline-block bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide text-white border border-white/30">
                {item.badge}
              </span>

              <h4 className="text-lg sm:text-xl font-bold font-heading leading-tight max-w-[240px]">
                {item.title}
              </h4>

              <p className="text-xs text-slate-200 line-clamp-1">{item.desc}</p>

              <div className="pt-2 flex items-center justify-between gap-2">
                <Link
                  to={item.link}
                  className="inline-flex items-center gap-1.5 bg-white text-slate-900 hover:bg-emerald-500 hover:text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-md active:scale-95"
                >
                  <span>{item.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {/* Promo Code Badge */}
                <button
                  type="button"
                  onClick={() => copyCode(item.code)}
                  className="inline-flex items-center gap-1 bg-black/40 hover:bg-black/60 border border-white/20 px-2.5 py-1.5 rounded-xl text-[11px] font-mono font-bold text-white transition-all"
                  title="Click to copy promo code"
                >
                  {copiedCode === item.code ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-300" />
                      <span>{item.code}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
