function DownloadReport() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <h2 className="text-2xl font-semibold text-white">Download Report</h2>

      <p className="mt-2 text-zinc-400">Export your expenses as CSV or PDF.</p>

      <div className="mt-8 flex gap-4">
        <button className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600 transition">
          Download CSV
        </button>

        <button className="rounded-xl border border-zinc-700 px-6 py-3 text-zinc-300 hover:bg-zinc-800 transition">
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default DownloadReport;
