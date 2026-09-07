import { Loader2 } from "lucide-react";

function Button({ name, children, className = "", width = "w-full", isLoading, onClick, type = "button", disabled }) {
  return (
    <button
      disabled={isLoading || disabled}
      type={type}
      onClick={onClick}
      className={`inline-flex justify-center items-center gap-2 py-3 px-5 rounded-2xl font-semibold text-sm transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed shadow-sm ${width} ${className}`}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          {children}
          {name}
        </>
      )}
    </button>
  );
}

export default Button;

