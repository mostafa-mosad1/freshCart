import { useNavigate, Link } from "react-router-dom";
import Button from "../../Components/ui/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { axiosBaseUrl } from "../../AxiosBaseUrl/AxiosBaseUrl";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { TokenContext } from "../../Context/TokenContext";
import { CartContext } from "./../../Context/CartContextProvider";
import { WishListContext } from "../../Context/WishListContextProvider";
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles } from "lucide-react";

function Login() {
  const { setToken } = useContext(TokenContext);
  const { setTokenWish } = useContext(WishListContext);
  const { setTokenStatus } = useContext(CartContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Email address is required"),
    password: yup
      .string()
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (inputsData) => {
    try {
      setIsLoading(true);
      const { data } = await axiosBaseUrl.post("/auth/signin", inputsData);
      localStorage.setItem("Token", data.token);
      setToken(data.token);
      if (data.message === "success") {
        setTokenStatus(true);
        setTokenWish(true);
      }
      toast.success("Welcome back to FreshCart!", {
        duration: 3000,
        position: "top-center",
      });
      navigate("/home");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid email or password", {
        duration: 3500,
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 px-4">
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" /> Welcome Back
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
            Sign In to FreshCart
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Access your grocery list, saved favorites, and fast checkout.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="name@example.com"
                {...register("email")}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>
            {errors.email && (
              <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <Link
                to="/ForgetPassword"
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.password.message}</p>
            )}
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 text-sm flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </Button>
          </div>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-500">
          Don&#39;t have an account?{" "}
          <Link to="/register" className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

