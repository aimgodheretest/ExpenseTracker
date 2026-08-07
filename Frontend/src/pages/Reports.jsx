import MainLayout from "../layouts/MainLayout";
import ReportCards from "../components/reports/ReportCards";
import DownloadReport from "../components/reports/DownloadReport";
import MonthlySummary from "../components/reports/MonthlySummary";

function Reports() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-5xl font-bold text-white">Reports</h1>

          <p className="mt-2 text-zinc-400">
            Download and review your financial reports.
          </p>
        </div>

        <ReportCards />

        <DownloadReport />

        <MonthlySummary />
      </div>
    </MainLayout>
  );
}

export default Reports;
