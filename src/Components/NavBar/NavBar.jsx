import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { TokenContext } from "../../Context/TokenContext";
import { ShoppingBag, Heart, LogOut, Menu, X, User, ShoppingCart } from "lucide-react";
import { CartContext } from "../../Context/CartContextProvider";
import { WishListContext } from "../../Context/WishListContextProvider";

function Navbar() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(TokenContext);
  const { cart, setTokenStatus, setCart } = useContext(CartContext);
  const { setTokenWish, allIdList } = useContext(WishListContext);
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const Logout = () => {
    localStorage.removeItem("Token");
    setToken(null);
    if (setCart) setCart(null);
    setTokenStatus(false);
    setTokenWish(false);
    navigate("/");
    setOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Products", path: "/product" },
    { name: "Categories", path: "/categoies" },
    { name: "Brands", path: "/brand" },
    { name: "Wishlist", path: "/WishList" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-2.5 border-b border-slate-100"
          : "bg-white/95 backdrop-blur-sm py-3.5 border-b border-slate-100/70"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Side: Logo & Main Nav */}
        <div className="flex items-center gap-8">
          <Link to={token ? "/home" : "/"} className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="FreshCart Logo"
              className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {token && (
            <nav className="hidden lg:flex items-center gap-1.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-emerald-600 font-semibold bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-100 transition-all text-sm"
                      : "text-slate-600 hover:text-emerald-600 font-medium px-3.5 py-1.5 rounded-xl hover:bg-slate-50 transition-all text-sm"
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          )}
        </div>

        {/* Right Side: Icons & Auth Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          {token ? (
            <>
              {/* Wishlist Link */}
              <Link
                to="/WishList"
                className="relative p-2 text-slate-600 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-200"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {allIdList && allIdList.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white animate-pulse">
                    {allIdList.length}
                  </span>
                )}
              </Link>

              {/* Cart Link */}
              <Link
                to="/cart"
                className="relative flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-3.5 py-1.5 rounded-xl transition-all duration-200 shadow-sm shadow-emerald-500/20 active:scale-95"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="text-xs font-bold hidden sm:inline">Cart</span>
                <span className="flex h-5 min-w-5 px-1 items-center justify-center rounded-full bg-white text-[11px] font-bold text-emerald-700">
                  {cart?.numOfCartItems || 0}
                </span>
              </Link>

              {/* Logout Button (Desktop) */}
              <button
                onClick={Logout}
                className="hidden lg:flex items-center gap-1.5 text-slate-500 hover:text-rose-600 font-medium text-sm px-3 py-1.5 rounded-xl hover:bg-rose-50/80 transition-all border border-transparent hover:border-rose-100"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-emerald-600 font-semibold px-4 py-1.5 rounded-xl bg-emerald-50 border border-emerald-100 text-sm"
                    : "text-slate-600 hover:text-emerald-600 font-medium px-4 py-1.5 rounded-xl hover:bg-slate-50 text-sm transition-all"
                }
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm px-4 py-2 rounded-xl shadow-sm transition-all active:scale-95"
              >
                Register
              </NavLink>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-all"
            aria-label="Toggle Navigation"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-5 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            {token ? (
              <>
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "text-emerald-600 font-semibold bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-100 text-sm"
                        : "text-slate-700 hover:text-emerald-600 font-medium px-4 py-2.5 rounded-xl hover:bg-slate-50 text-sm transition-all"
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
                  <NavLink
                    to="/allorders"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 text-slate-700 font-medium px-4 py-2 rounded-xl hover:bg-slate-50 text-sm"
                  >
                    <ShoppingBag className="w-4 h-4 text-emerald-600" />
                    <span>My Orders</span>
                  </NavLink>
                  <button
                    onClick={Logout}
                    className="flex items-center gap-2 text-rose-600 font-medium px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-sm transition-all text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <NavLink
                  to="/"
                  onClick={() => setOpen(false)}
                  className="text-center text-slate-700 font-semibold py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="text-center bg-emerald-500 text-white font-semibold py-2.5 rounded-xl hover:bg-emerald-600 text-sm shadow-sm"
                >
                  Create Account
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;

