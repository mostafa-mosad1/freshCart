import { useState } from "react";
import GetHook from "../../Hooks/GetHook";
import SkeletonCategoies from "../../Skeleton/SkeletonCategoies";
import SubCategory from "./SubCategory";
import { Sparkles, Layers } from "lucide-react";

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { isLoading, data } = GetHook({
    queryKey: ["category"],
    url: `/categories`,
    select: (res) => res?.data?.data,
  });

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Departments
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight">
            All Categories
          </h1>
          <p className="text-slate-300 text-sm mt-2">
            Select any category to view its subcategories and specialized products.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCategoies key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {data?.map((category) => {
            const isSelected = selectedCategory?.id === category._id;
            return (
              <div
                key={category._id}
                onClick={() => {
                  setSelectedCategory({ id: category._id, name: category.name });
                }}
                className={`group flex flex-col items-center justify-between p-4 rounded-3xl bg-white border cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg -translate-y-1"
                    : "border-slate-100 shadow-xs hover:border-emerald-200 hover:shadow-md hover:-translate-y-1"
                }`}
              >
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-3 flex items-center justify-center p-3">
                  <img
                    src={category.image}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    alt={category.name}
                  />
                </div>
                <h2 className="text-center font-bold text-sm text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-1">
                  {category.name}
                </h2>
                <span className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <Layers className="w-3 h-3" /> View Subcategories
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Subcategories section */}
      {selectedCategory && (
        <SubCategory id={selectedCategory.id} title={selectedCategory.name} />
      )}
    </div>
  );
}

export default Categories;

