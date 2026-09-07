import { useContext, useState } from "react";
import { TokenContext } from "./../../Context/TokenContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosBaseUrl } from "./../../AxiosBaseUrl/AxiosBaseUrl";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import Button from "../../Components/ui/Button";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, KeyRound } from "lucide-react";

function RestNewPassword() {
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Email is required"),
    newPassword: yup
      .string()
      .matches(/^[A-Z][a-zA-Z0-9]{5,15}$/, "Password must start with capital letter and be 6-16 characters")
      .required("New password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (inputsData) => {
    try {
      setIsLoading(true);
      const { data } = await axiosBaseUrl.put("/auth/resetPassword", inputsData);
      localStorage.setItem("Token", data.token);
      setToken(data.token);
      toast.success("Password reset successfully!", {
        duration: 3500,
        position: "top-center",
      });
      navigate("/home");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to reset password. Please check your data.", {
        duration: 4000,
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 px-4">
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
            <KeyRound className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
            Set New Password
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Create a strong new password for your account.
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

          {/* New Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Ex: NewPassword123"
                {...register("newPassword")}
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
            {errors.newPassword && (
              <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.newPassword.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 text-sm flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Update Password & Login</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RestNewPassword;