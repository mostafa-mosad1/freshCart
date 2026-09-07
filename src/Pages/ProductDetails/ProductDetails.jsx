import { useParams, Link } from "react-router-dom";
import GetHook from "../../Hooks/GetHook";
import Button from "../../Components/ui/Button";
import Slider from "react-slick";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContextProvider";
import { WishListContext } from "../../Context/WishListContextProvider";
import SkeletonDetails from "../../Skeleton/SkeletonDetails";
import { Heart, Star, ShoppingCart, Truck, ShieldCheck, ArrowLeft, CheckCircle2 } from "lucide-react";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart, isLoading: isCartLoading } = useContext(CartContext);
  const { AddToWishList, allIdList, DeleteToWishList } = useContext(WishListContext);
  const [selectedImage, setSelectedImage] = useState(0);

  const isFavorite = allIdList?.includes(id);

  const toggleWishlist = () => {
    if (isFavorite) {
      if (DeleteToWishList) DeleteToWishList(id);
      else AddToWishList(id);
    } else {
      AddToWishList(id);
    }
  };

  const { isLoading, data } = GetHook({
    queryKey: ["specificProduct", id],
    url: `/products/${id}`,
  });

  const product = data?.data?.data;

  const sliderSettings = {
    dots: false,
    infinite: product?.images?.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  if (isLoading) {
    return <SkeletonDetails />;
  }

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800">Product not found.</h2>
        <Link to="/product" className="text-emerald-600 font-semibold mt-2 inline-block">
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-8">
      {/* Breadcrumb back */}
      <Link
        to="/product"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to all products</span>
      </Link>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Product Images Gallery (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full aspect-square rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-4 overflow-hidden mb-4 shadow-inner">
            <img
              src={product.images?.[selectedImage] || product.imageCover}
              alt={product.title}
              className="max-h-full max-w-full object-contain"
            />
            {/* Wishlist Button */}
            <button
              onClick={toggleWishlist}
              className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 shadow-md ${
                isFavorite
                  ? "bg-rose-50 text-rose-500 scale-110"
                  : "bg-white/90 text-slate-400 hover:text-rose-500 hover:bg-white"
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto w-full py-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-16 rounded-xl border p-1 bg-slate-50 flex-shrink-0 transition-all ${
                    selectedImage === idx
                      ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs"
                      : "border-slate-200 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} className="w-full h-full object-contain" alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category and Brand tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100">
                {product.category?.name}
              </span>
              {product.brand?.name && (
                <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full">
                  Brand: {product.brand.name}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 leading-tight">
              {product.title}
            </h1>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span className="text-sm font-bold text-amber-900">{product.ratingsAverage || 4.8}</span>
              </div>
              <span className="text-xs text-slate-400">
                ({product.ratingsQuantity || 120} customer ratings)
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" /> In Stock
              </span>
            </div>

            {/* Price section */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 font-heading">{product.price}</span>
              <span className="text-base font-bold text-emerald-600">EGP</span>
              <span className="text-xs text-slate-400 ml-2">Inclusive of all taxes</span>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{product.description}</p>
            </div>
          </div>

          {/* Action Buttons & Value Props */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                isLoading={isCartLoading}
                onClick={() => addToCart(id)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white flex-1 py-3.5 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 text-sm flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Shopping Cart</span>
              </Button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                <Truck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Fast Delivery Available</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>100% Genuine Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

