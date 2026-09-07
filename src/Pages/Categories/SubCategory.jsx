/* eslint-disable react/prop-types */
import GetHook from "../../Hooks/GetHook";
import { Loader2, Sparkles, FolderTree } from "lucide-react";

function SubCategory({ id, title }) {
  const { isLoading, data } = GetHook({
    queryKey: ["SubCategory", id],
    url: `/categories/${id}/subcategories`,
  });

  const subcategories = data?.data?.data || [];

  return (
    <div className="mt-12 pt-8 border-t border-slate-200/80 animate-in fade-in duration-300">
      <div className="flex items-center gap-2 mb-6">
        <FolderTree className="w-5 h-5 text-emerald-600" />
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-800">
          <span className="text-emerald-600">{title}</span> Subcategories
        </h3>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        </div>
      ) : subcategories.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {subcategories.map((cate) => (
            <div
              key={cate._id}
              className="flex items-center justify-center p-3.5 bg-emerald-50/50 hover:bg-emerald-100/60 border border-emerald-100 rounded-2xl text-center text-xs sm:text-sm font-semibold text-emerald-950 transition-all duration-200 shadow-xs cursor-pointer hover:scale-105"
            >
              {cate.name}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-400 text-sm italic">No subcategories found for {title}.</p>
      )}
    </div>
  );
}

export default SubCategory;

