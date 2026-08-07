function StatsCard({ title, amount, color }) {
  return (
    <div className="rounded-2xl border border-zinc-700 bg-zinc-800 p-6">
      <p className="text-sm text-zinc-400">{title}</p>

      <h2 className={`mt-3 text-3xl font-bold ${color}`}>{amount}</h2>
    </div>
  );
}

export default StatsCard;
