import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import StatsCard from "../components/dashboard/StatsCard";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import CategoryCard from "../components/dashboard/CategoryCard";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import { getDashboard } from "../services/dashboardService";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getDashboard();

        setDashboardData(response.data);
      } catch (error) {
        console.log("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Hero */}
        <section className="flex items-center justify-between rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Welcome Back 👋</h1>

            <p className="mt-2 text-zinc-400">
              Manage your finances with confidence.
            </p>
          </div>

          <button className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600 transition">
            + Add Expense
          </button>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-4 gap-6">
          <StatsCard
            title="This Month"
            amount={
              loading
                ? "Loading..."
                : `₹${dashboardData?.currentMonthExpenses || 0}`
            }
            color="text-white"
          />

          <StatsCard
            title="Transactions"
            amount={
              loading ? "Loading..." : dashboardData?.transactionCount || 0
            }
            color="text-emerald-400"
          />

          <StatsCard
            title="Expenses"
            amount={
              loading ? "Loading..." : `₹${dashboardData?.totalExpenses || 0}`
            }
            color="text-red-400"
          />

          <StatsCard
            title="Top Category"
            amount={
              loading
                ? "Loading..."
                : dashboardData?.categories?.length
                  ? dashboardData.categories[0].category
                  : "None"
            }
            color="text-cyan-400"
          />
        </section>

        {/* Middle Section */}
        <section className="grid grid-cols-3 gap-6">
          <div className="col-span-2 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 h-105">
            <ExpenseChart
              monthlyExpenses={dashboardData?.monthlyExpenses || []}
            />{" "}
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 h-105">
            <CategoryCard categories={dashboardData?.categories || []} />{" "}
          </div>
        </section>

        {/* Recent Transactions */}
        <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 h-87.5">
          <RecentTransactions
            recentExpenses={dashboardData?.recentExpenses || []}
          />{" "}
        </section>
      </div>
    </MainLayout>
  );
}

export default Dashboard;
