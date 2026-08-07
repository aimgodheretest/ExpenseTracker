function Card({ title, value }) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm text-zinc-400">{title}</p>

      <h2 className="mt-3 text-3xl font-bold text-emerald-400">{value}</h2>
    </div>
  );
}

function ReportCards() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <Card title="Reports Generated" value="18" />

      <Card title="Current Month" value="August" />

      <Card title="Downloads" value="42" />
    </div>
  );
}

export default ReportCards;
