import { Zap, ShieldCheck, Tag, HeartHandshake } from "lucide-react";

export default function FeaturesBar() {
  const features = [
    {
      icon: Zap,
      title: "Super Fast Delivery",
      desc: "Delivered to your doorstep within 30-45 mins",
      color: "from-amber-500/10 to-amber-500/5 text-amber-600 border-amber-200/60",
      iconBg: "bg-amber-500 text-white",
    },
    {
      icon: ShieldCheck,
      title: "100% Organic & Fresh",
      desc: "Directly sourced from trusted certified farms",
      color: "from-emerald-500/10 to-emerald-500/5 text-emerald-600 border-emerald-200/60",
      iconBg: "bg-emerald-500 text-white",
    },
    {
      icon: Tag,
      title: "Best Daily Prices",
      desc: "Enjoy unmissable discounts & cashback offers",
      color: "from-blue-500/10 to-blue-500/5 text-blue-600 border-blue-200/60",
      iconBg: "bg-blue-500 text-white",
    },
    {
      icon: HeartHandshake,
      title: "Quality Guarantee",
      desc: "Instant return or refund if you're not satisfied",
      color: "from-rose-500/10 to-rose-500/5 text-rose-600 border-rose-200/60",
      iconBg: "bg-rose-500 text-white",
    },
  ];

  return (
    <section className="my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`p-5 rounded-3xl bg-gradient-to-br ${item.color} border shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex items-start gap-4`}
            >
              <div className={`p-3 rounded-2xl ${item.iconBg} shadow-sm shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
