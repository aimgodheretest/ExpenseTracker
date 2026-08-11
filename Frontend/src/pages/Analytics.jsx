import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import AnalyticsCards from "../components/analytics/AnalyticsCards";
import MonthlyChart from "../components/analytics/MonthlyChart";
import CategoryChart from "../components/analytics/CategoryChart";
import TopCategories from "../components/analytics/TopCategories";
import { getDashboard } from "../services/dashboardService";

function Analytics() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await getDashboard();

        setDashboardData(response.data);
      } catch (error) {
        console.log("Analytics error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold text-white">Analytics</h1>

          <p className="mt-2 text-zinc-400">Track your spending insights.</p>
        </div>

        <AnalyticsCards dashboardData={dashboardData} loading={loading} />

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <MonthlyChart
              monthlyExpenses={dashboardData?.monthlyExpenses || []}
            />
          </div>

          <CategoryChart categories={dashboardData?.categories || []} />
        </div>

        <TopCategories categories={dashboardData?.categories || []} />
      </div>
    </MainLayout>
  );
}

export default Analytics;
