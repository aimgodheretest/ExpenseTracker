function Badge({ children, color = "emerald" }) {
  const colors = {
    emerald: "bg-emerald-500/20 text-emerald-400",
    red: "bg-red-500/20 text-red-400",
    amber: "bg-amber-500/20 text-amber-400",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${colors[color]}`}
    >
      {children}
    </span>
  );
}

export default Badge;
