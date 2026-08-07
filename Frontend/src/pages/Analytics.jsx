import MainLayout from "../layouts/MainLayout";
import AnalyticsCards from "../components/analytics/AnalyticsCards";
import MonthlyChart from "../components/analytics/MonthlyChart";
import CategoryChart from "../components/analytics/CategoryChart";
import TopCategories from "../components/analytics/TopCategories";

function Analytics() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold text-white">Analytics</h1>
          <p className="mt-2 text-zinc-400">Track your spending insights.</p>
        </div>

        <AnalyticsCards />

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <MonthlyChart />
          </div>

          <CategoryChart />
        </div>

        <TopCategories />
      </div>
    </MainLayout>
  );
}

export default Analytics;
