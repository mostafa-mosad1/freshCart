/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContextProvider";
import { WishListContext } from "../../Context/WishListContextProvider";
import { Heart, Star, ShoppingCart } from "lucide-react";
import Button from "../ui/Button";

function CardProduct({ img, title, category, price, id, ratingsAverage = 4.8 }) {
  const navigate = useNavigate();
  const { addToCart, isLoading } = useContext(CartContext);
  const { AddToWishList, allIdList, DeleteToWishList } = useContext(WishListContext);

  const isFavorite = allIdList?.includes(id);

  const toggleWishlist = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      if (DeleteToWishList) DeleteToWishList(id);
      else AddToWishList(id);
    } else {
      AddToWishList(id);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(id);
  };

  return (
    <div
      onClick={() => navigate(`/productDetails/${id}`)}
      className="group relative flex flex-col justify-between bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-100/80 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-50 mb-3 flex items-center justify-center">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Category Badge */}
        {category && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-emerald-700 shadow-xs border border-white/60">
            {category}
          </span>
        )}

        {/* Wishlist Floating Button */}
        <button
          onClick={toggleWishlist}
          aria-label="Add to wishlist"
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 shadow-sm backdrop-blur-md ${
            isFavorite
              ? "bg-rose-50 text-rose-500 scale-110 shadow-rose-100"
              : "bg-white/90 text-slate-400 hover:text-rose-500 hover:bg-white"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <h3
            title={title}
            className="font-semibold text-slate-800 text-sm line-clamp-1 group-hover:text-emerald-600 transition-colors"
          >
            {title}
          </h3>

          <div className="flex items-center justify-between mt-2.5">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-slate-900">{price}</span>
              <span className="text-xs font-semibold text-emerald-600">EGP</span>
            </div>

            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100/60">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span className="text-xs font-bold text-amber-800">{ratingsAverage}</span>
            </div>
          </div>
        </div>

        {/* Add to Cart CTA */}
        <div className="mt-4 pt-3 border-t border-slate-100/80">
          <Button
            type="button"
            isLoading={isLoading}
            onClick={handleAddToCart}
            className="bg-emerald-500 hover:bg-emerald-600 text-white w-full py-2.5 px-3 rounded-xl shadow-sm shadow-emerald-500/10 text-xs font-bold flex items-center justify-center gap-1.5"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CardProduct;

