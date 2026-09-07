import { useState } from "react";
import GetHook from "../../Hooks/GetHook";
import SubBrand from "./SubBrand";
import { Sparkles, Award } from "lucide-react";

function Brand() {
  const [isOpen, setIsOpen] = useState(false);
  const [cardId, setCardId] = useState(null);

  const { data, isLoading } = GetHook({
    queryKey: ["Brand"],
    url: `/brands`,
    select: (res) => res?.data?.data || [],
  });

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Official Partners
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight">
            Featured Brands
          </h1>
          <p className="text-slate-300 text-sm mt-2">
            Explore products from trusted national and international brands with 100% genuine quality.
          </p>
        </div>
      </div>

      {cardId && <SubBrand id={cardId} isOpen={isOpen} setIsOpen={setIsOpen} />}

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm animate-pulse h-48 flex flex-col items-center justify-center"
            >
              <div className="h-20 w-32 bg-slate-100 rounded-xl mb-3" />
              <div className="h-4 w-20 bg-slate-100 rounded-lg" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {data?.map((brand) => (
            <div
              key={brand._id}
              onClick={() => {
                setCardId(brand._id);
                setIsOpen(true);
              }}
              className="group flex flex-col items-center justify-between p-6 rounded-3xl bg-white border border-slate-100 shadow-xs hover:shadow-xl hover:border-emerald-200 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer text-center"
            >
              <div className="w-full h-24 flex items-center justify-center mb-3">
                <img
                  src={brand.image}
                  className="max-h-20 max-w-[85%] object-contain group-hover:scale-110 transition-transform duration-300"
                  alt={brand.name}
                />
              </div>
              <h2 className="font-bold text-sm text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-1">
                {brand.name}
              </h2>
              <span className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                <Award className="w-3 h-3 text-emerald-500" /> Verified Brand
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Brand;

