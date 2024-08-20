import { ClipLoader } from "react-spinners";

function Button({ name, children, className, width, isLoading,onClick,type}) {
  return (
    <>
      <button
        disabled={isLoading}
        type={type}
       onClick={onClick}
        className={`${className}  ${width} flex justify-center items-center p-3 rounded-md  text-xl font-bold  disabled:cursor-not-allowed `}
      >
        {children}
        {name}
        {isLoading ? <i className="fa-solid fa-spinner fa-spin ms-4"></i> : null}
      </button>
    </>
  );
}

export default Button;
