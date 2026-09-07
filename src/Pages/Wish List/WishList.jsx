import { useContext, useEffect } from "react";
import Button from "../../Components/ui/Button";
import { WishListContext } from "../../Context/WishListContextProvider";
import { CartContext } from "../../Context/CartContextProvider";
import { Heart, Trash2, ShoppingCart, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

function WishList() {
  const { GetWishList, allWishLList, DeleteToWishList, isLoading } =
    useContext(WishListContext);
  const { addToCart, isLoading: isCartLoading } = useContext(CartContext);

  useEffect(() => {
    GetWishList();
  }, []);

  const items = allWishLList || [];

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-8 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-1.5 text-rose-500 text-xs font-bold uppercase tracking-wider mb-1">
            <Heart className="w-3.5 h-3.5 fill-rose-500" />
            <span>Saved Items</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
            My Wishlist
          </h1>
        </div>

        {items.length > 0 && (
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            {items.length} {items.length === 1 ? "Product" : "Products"} Saved
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-emerald-600 mb-3" />
          <p className="text-slate-500 text-sm font-medium">Loading your favorite items...</p>
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((element) => (
            <div
              key={element.id || element._id}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-square w-full rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-4 mb-4">
                  <img
                    src={element.imageCover}
                    className="max-h-full max-w-full object-contain"
                    alt={element.title}
                  />
                  <button
                    onClick={() => DeleteToWishList(element.id || element._id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full text-slate-400 hover:text-rose-500 shadow-xs hover:bg-white transition-all"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Details */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    {element.category?.name || "Grocery"}
                  </span>
                  <h3 className="font-bold text-slate-800 text-sm line-clamp-1">
                    {element.title}
                  </h3>
                  <div className="flex items-baseline gap-1 pt-1">
                    <span className="text-xl font-extrabold text-slate-900 font-heading">
                      {element.price}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600">EGP</span>
                  </div>
                </div>
              </div>

              {/* Move to Cart */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <Button
                  onClick={() => addToCart(element.id || element._id, element)}
                  isLoading={isCartLoading}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-sm shadow-emerald-500/10"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Move to Cart</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl border border-slate-100 shadow-xs">
          <div className="w-20 h-20 rounded-3xl bg-rose-50 flex items-center justify-center text-rose-500 mb-4">
            <Heart className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-slate-800">Your Wishlist is Empty</h2>
          <p className="text-slate-500 text-sm mt-1 max-w-sm mb-6">
            Save items that you like in your wishlist and buy them whenever you are ready.
          </p>
          <Link
            to="/product"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm px-6 py-3 rounded-2xl shadow-md transition-all active:scale-95"
          >
            <span>Discover Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default WishList;

