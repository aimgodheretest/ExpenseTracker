function Button({ children, onClick, className = "", type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-xl bg-emerald-500 px-5 py-3 font-medium text-white transition-all duration-200 hover:bg-emerald-600 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
