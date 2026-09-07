import { useState } from "react";
import { Smartphone, Star, Gift, ShieldCheck, Copy, Check, QrCode } from "lucide-react";
import toast from "react-hot-toast";

export default function AppPromoBanner() {
  const [copied, setCopied] = useState(false);

  const copyPromo = () => {
    navigator.clipboard.writeText("APP50");
    setCopied(true);
    toast.success('Coupon code "APP50" copied!', { icon: "🎉" });
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="my-16">
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
        {/* Background decorative elements */}
        <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Side: Title & Store Downloads */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold text-white border border-white/30">
              <Gift className="w-4 h-4" />
              <span>Mobile Exclusive Offer</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading leading-tight">
              Get 50 EGP Off on Your First Order in the FreshCart App
            </h2>

            <p className="text-emerald-50 text-sm sm:text-base max-w-xl leading-relaxed">
              Download our mobile app to track live deliveries in real-time, receive instant flash-sale alerts, and enjoy hassle-free 1-tap reordering.
            </p>

            {/* High-Definition App Store & Google Play Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {/* Apple App Store Button */}
              <a
                href="#"
                className="flex items-center gap-3.5 bg-slate-950 hover:bg-black text-white px-6 py-3.5 rounded-2xl border border-white/20 shadow-xl hover:scale-105 active:scale-95 transition-all group"
              >
                <i className="fa-brands fa-apple text-3xl group-hover:text-emerald-400 transition-colors"></i>
                <div className="text-left">
                  <span className="block text-xs text-slate-300 font-semibold uppercase tracking-wider">Download on the</span>
                  <span className="block text-lg font-bold font-heading leading-tight">App Store</span>
                </div>
              </a>

              {/* Google Play Store Button */}
              <a
                href="#"
                className="flex items-center gap-3.5 bg-slate-950 hover:bg-black text-white px-6 py-3.5 rounded-2xl border border-white/20 shadow-xl hover:scale-105 active:scale-95 transition-all group"
              >
                <i className="fa-brands fa-google-play text-2xl text-emerald-400 group-hover:text-amber-400 transition-colors"></i>
                <div className="text-left">
                  <span className="block text-xs text-slate-300 font-semibold uppercase tracking-wider">GET IT ON</span>
                  <span className="block text-lg font-bold font-heading leading-tight">Google Play</span>
                </div>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-3 flex flex-wrap items-center gap-6 sm:gap-8 text-sm sm:text-base text-emerald-100 font-medium">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-300 fill-amber-300 shrink-0" />
                <span><strong className="text-white font-bold">4.9/5</strong> Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-200 shrink-0" />
                <span><strong className="text-white font-bold">100k+</strong> Downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-200 shrink-0" />
                <span className="text-white font-bold">Secure Payments</span>
              </div>
            </div>
          </div>

          {/* Right Side: Coupon Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm bg-white/20 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/30 text-center space-y-4 shadow-2xl">
              <div className="flex items-center justify-center gap-2 text-white/90 text-sm font-bold uppercase tracking-wider">
                <QrCode className="w-5 h-5" />
                <span>Special Promo Coupon</span>
              </div>

              {/* Promo Code Box */}
              <div
                onClick={copyPromo}
                className="bg-white text-slate-900 py-4 px-6 rounded-2xl shadow-lg cursor-pointer hover:bg-slate-50 transition-all flex items-center justify-between gap-3 group border-2 border-dashed border-emerald-400"
                title="Click to copy coupon code"
              >
                <div className="text-left">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">PROMO CODE</span>
                  <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-600 tracking-wider">APP50</span>
                </div>

                <button
                  type="button"
                  className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-6 h-6 text-emerald-600 group-hover:text-white" /> : <Copy className="w-6 h-6" />}
                </button>
              </div>

              <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
                Valid on your first app order of 250 EGP or more. Tap the code above to copy!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


