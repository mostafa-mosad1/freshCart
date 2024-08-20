const InputErrorMessage = ({ msg }) => {
  return msg ? (
    <span className="block text-start mt-1 ms-3 text-red-700 font-semibold text-sm">
      {msg}
    </span>
  ) : null;
};

export default InputErrorMessage;
