function AuthStats() {
  const stats = [
    {
      value: "₹25K+",
      label: "Saved",
    },
    {
      value: "250+",
      label: "Expenses",
    },
    {
      value: "18",
      label: "Reports",
    },
    {
      value: "AI",
      label: "Insights",
    },
  ];

  return (
    <div className="mt-8 grid grid-cols-2 gap-5">
      {stats.map((item) => (
        <div
          key={item.label}
          className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]"
        >
          <h3 className="text-3xl font-bold text-emerald-400">{item.value}</h3>

          <p className="mt-2 text-zinc-400">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

export default AuthStats;
