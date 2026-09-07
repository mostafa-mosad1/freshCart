import Button from "../../Components/ui/Button";
import paypal from "../../assets/images/paypal.webp";
import google from "../../assets/images/google-play-badge-logo.svg";
import MasterCard from "../../assets/images/mastercard.png";
import amazonpng from "../../assets/images/amazon pay.webp";
import apple from "../../assets/images/apple store.svg";
import express from "../../assets/images/american express.webp";
import { Mail, Send, ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 mt-20 border-t border-slate-800">
      {/* Service Highlights Bar */}
      <div className="container mx-auto pb-12 border-b border-slate-800 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Free Delivery</h4>
              <p className="text-slate-400 text-xs mt-0.5">Orders over 500 EGP</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Secure Payment</h4>
              <p className="text-slate-400 text-xs mt-0.5">100% Protected Checkouts</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Easy Returns</h4>
              <p className="text-slate-400 text-xs mt-0.5">14 Days Free Return</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">24/7 Support</h4>
              <p className="text-slate-400 text-xs mt-0.5">Dedicated Customer Care</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        {/* App Download & Newsletter Banner */}
        <div className="bg-gradient-to-r from-emerald-950 to-slate-800 p-8 rounded-3xl border border-emerald-800/30 mb-12 shadow-xl">
          <div className="max-w-3xl">
            <h3 className="text-2xl font-bold text-white font-heading tracking-tight">
              Get the FreshCart App
            </h3>
            <p className="text-slate-300 text-sm mt-2">
              We will send you a link, open it on your phone to download the app and unlock exclusive discounts.
            </p>
            
            <form onSubmit={(e) => e.preventDefault()} className="mt-5 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  className="w-full pl-11 pr-4 py-3 bg-slate-900/90 border border-slate-700 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-200 shadow-lg shadow-emerald-600/30 active:scale-95 text-sm"
              >
                <span>Share App Link</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Partners and Stores Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 py-6 border-b border-slate-800">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Payment Partners</span>
            <div className="flex items-center gap-3 bg-slate-800/40 p-2 rounded-xl border border-slate-800">
              <img src={MasterCard} className="h-6 w-auto object-contain" alt="Mastercard" />
              <img src={paypal} className="h-5 w-auto object-contain" alt="PayPal" />
              <img src={amazonpng} className="h-5 w-auto object-contain" alt="Amazon Pay" />
              <img src={express} className="h-6 w-auto object-contain" alt="American Express" />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4">
            <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Get Deliveries with FreshCart</span>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="flex items-center gap-2.5 bg-slate-800 hover:bg-slate-700 text-white px-3.5 py-2 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-200"
              >
                <i className="fa-brands fa-apple text-xl text-white"></i>
                <div className="text-left">
                  <span className="block text-[10px] text-slate-400 uppercase leading-none font-medium">Download on</span>
                  <span className="block text-xs font-bold text-white font-heading mt-0.5">App Store</span>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-2.5 bg-slate-800 hover:bg-slate-700 text-white px-3.5 py-2 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-200"
              >
                <i className="fa-brands fa-google-play text-lg text-emerald-400"></i>
                <div className="text-left">
                  <span className="block text-[10px] text-slate-400 uppercase leading-none font-medium">GET IT ON</span>
                  <span className="block text-xs font-bold text-white font-heading mt-0.5">Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} FreshCart. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

