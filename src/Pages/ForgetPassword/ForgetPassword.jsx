import { memo, useState } from "react";
import Button from "../../Components/ui/Button";
import { axiosBaseUrl } from "../../AxiosBaseUrl/AxiosBaseUrl";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { Mail, KeyRound, ArrowLeft, Send } from "lucide-react";

function ForgetPassword() {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const verification = async (e) => {
    e.preventDefault();
    if (!mail.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    try {
      setIsLoading(true);
      const res = await axiosBaseUrl.post("/auth/forgotPasswords", {
        email: mail,
      });
      toast.success(res.data.message || "Reset code sent to your email!");
      navigate("/verifyResetCode");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send reset code", {
        duration: 3500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 px-4">
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-xl space-y-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </Link>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
            <KeyRound className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
            Forgot Password?
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Enter your registered email address and we&#39;ll send you a verification code.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={verification} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 text-sm flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Reset Code</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default memo(ForgetPassword);

