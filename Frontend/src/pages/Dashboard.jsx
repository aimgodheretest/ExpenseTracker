import MainLayout from "../layouts/MainLayout";
import StatsCard from "../components/dashboard/StatsCard";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import CategoryCard from "../components/dashboard/CategoryCard";
import RecentTransactions from "../components/dashboard/RecentTransactions";
function Dashboard() {
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
          <StatsCard title="Balance" amount="$25,400" color="text-white" />

          <StatsCard title="Income" amount="$12,000" color="text-emerald-400" />

          <StatsCard title="Expenses" amount="$5,400" color="text-red-400" />

          <StatsCard title="Savings" amount="$6,600" color="text-cyan-400" />
        </section>

        {/* Middle Section */}
        <section className="grid grid-cols-3 gap-6">
          <div className="col-span-2 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 h-105">
            <ExpenseChart />
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 h-105">
            <CategoryCard />
          </div>
        </section>

        {/* Recent Transactions */}
        <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 h-87.5">
          <RecentTransactions />
        </section>
      </div>
    </MainLayout>
  );
}

export default Dashboard;
