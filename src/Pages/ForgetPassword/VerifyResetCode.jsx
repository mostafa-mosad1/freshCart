import { useState } from "react";
import { axiosBaseUrl } from "../../AxiosBaseUrl/AxiosBaseUrl";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../Components/ui/Button";
import { ShieldCheck, ArrowLeft, CheckCircle2 } from "lucide-react";

function VerifyResetCode() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const verifyResetCode = async (e) => {
    e.preventDefault();
    if (!code.trim()) {
      toast.error("Please enter the 6-digit verification code");
      return;
    }
    try {
      setIsLoading(true);
      const res = await axiosBaseUrl.post("/auth/verifyResetCode", {
        resetCode: code.trim(),
      });
      toast.success(res.data.status || "Code verified successfully!");
      if (res.status === 200 || res.data.status === "Success") {
        navigate("/restNewPassword");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid or expired reset code", {
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
          to="/ForgetPassword"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Email</span>
        </Link>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
            Verify Reset Code
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Enter the 6-digit security code sent to your email.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={verifyResetCode} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Verification Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. 123456"
              maxLength={8}
              required
              className="w-full text-center tracking-widest text-lg font-bold py-3 bg-slate-50 border border-slate-200 rounded-2xl placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 text-sm flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verify & Continue</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerifyResetCode;