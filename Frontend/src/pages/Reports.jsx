import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ReportCards from "../components/reports/ReportCards";
import DownloadReport from "../components/reports/DownloadReport";
import MonthlySummary from "../components/reports/MonthlySummary";
import { getReport } from "../services/reportService";

function Reports() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getReport();

        setReportData(response.data);
      } catch (error) {
        console.log("Report error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-5xl font-bold text-white">Reports</h1>

          <p className="mt-2 text-zinc-400">
            Download and review your financial reports.
          </p>
        </div>

        <ReportCards reportData={reportData || []} loading={loading} />

        <DownloadReport reportData={reportData || []} />

        <MonthlySummary reportData={reportData || []} loading={loading} />
      </div>
    </MainLayout>
  );
}

export default Reports;
