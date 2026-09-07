import Button from "../../Components/ui/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { axiosBaseUrl } from "../../AxiosBaseUrl/AxiosBaseUrl";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { TokenContext } from "../../Context/TokenContext";
import { User, Mail, Lock, Phone, UserPlus, Sparkles, Eye, EyeOff } from "lucide-react";

function Register() {
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object({
    name: yup
      .string()
      .required("Full name is required")
      .min(3, "Name must be at least 3 characters")
      .max(25, "Name cannot exceed 25 characters"),
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .matches(/^[A-Z][a-zA-Z0-9]{5,15}$/, "Password must start with capital letter and be 6-16 characters")
      .required("Password is required"),
    rePassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords do not match"),
    phone: yup
      .string()
      .required("Phone number is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (inputsData) => {
    try {
      setIsLoading(true);
      const { data } = await axiosBaseUrl.post("/auth/signup", inputsData);
      localStorage.setItem("Token", data.token);
      setToken(data.token);
      toast.success("Account created successfully!", {
        duration: 3500,
        position: "top-center",
      });
      navigate("/home");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed. Please try again.", {
        duration: 4000,
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
            <Sparkles className="w-3.5 h-3.5" /> Start Shopping
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
            Create an Account
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Join FreshCart today and get exclusive daily deals.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="John Doe"
                {...register("name")}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>
            {errors.name && (
              <p className="text-rose-500 text-xs mt-1 font-medium">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="name@example.com"
                {...register("email")}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>
            {errors.email && (
              <p className="text-rose-500 text-xs mt-1 font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                placeholder="01012345678"
                {...register("phone")}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>
            {errors.phone && (
              <p className="text-rose-500 text-xs mt-1 font-medium">{errors.phone.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Ex: Password123"
                {...register("password")}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
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
              <p className="text-rose-500 text-xs mt-1 font-medium">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                {...register("rePassword")}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>
            {errors.rePassword && (
              <p className="text-rose-500 text-xs mt-1 font-medium">{errors.rePassword.message}</p>
            )}
          </div>

          {/* Submit CTA */}
          <div className="pt-3">
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 text-sm flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Account</span>
            </Button>
          </div>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/" className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;

