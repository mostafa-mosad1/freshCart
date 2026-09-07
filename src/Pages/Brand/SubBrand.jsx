/* eslint-disable react/prop-types */
import GetHook from "./../../Hooks/GetHook";
import { X, ExternalLink, Award, Loader2 } from "lucide-react";
import Button from "../../Components/ui/Button";
import { useNavigate } from "react-router-dom";

function SubBrand({ id, isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const { data, isLoading } = GetHook({
    queryKey: ["brand_detail", id],
    url: `/brands/${id}`,
    select: (res) => res?.data?.data,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className="absolute inset-0"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 z-10 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isLoading ? (
          <div className="py-12 flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        ) : (
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-32 h-32 rounded-2xl bg-slate-50 p-4 flex items-center justify-center border border-slate-100 shadow-inner">
              <img
                src={data?.image}
                alt={data?.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full mb-1">
                <Award className="w-3 h-3" /> Official Store
              </span>
              <h3 className="text-2xl font-bold font-heading text-slate-900 mt-1">
                {data?.name}
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">{data?.slug}</p>
            </div>

            <div className="w-full pt-4 flex gap-3">
              <Button
                onClick={() => {
                  setIsOpen(false);
                  navigate("/product");
                }}
                className="bg-emerald-500 hover:bg-emerald-600 text-white flex-1 flex items-center justify-center gap-2"
              >
                <span>View Products</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 w-auto px-4"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubBrand;



