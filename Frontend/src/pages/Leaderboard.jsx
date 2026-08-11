import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Crown, Trophy, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

import { getLeaderboard } from "../services/leaderboardService";
import { AuthContext } from "../context/AuthContext";

function Leaderboard() {
  const navigate = useNavigate();

  const { isPremium } = useContext(AuthContext);

  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Don't call the API for free users
    if (!isPremium) {
      setLoading(false);
      return;
    }

    const fetchLeaderboard = async () => {
      try {
        const response = await getLeaderboard();

        setLeaderboard(response.data);
      } catch (error) {
        console.log("Leaderboard error:", error);

        toast.error(
          error.response?.data?.message || "Unable to load leaderboard",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [isPremium]);

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-5xl font-bold text-white">Leaderboard</h1>

            <Crown className="text-emerald-400" size={32} />
          </div>

          <p className="mt-2 text-zinc-400">
            Compare your spending with other ExpenseTracker users.
          </p>
        </div>

        {/* FREE USER */}
        {!isPremium && (
          <section className="rounded-3xl border border-emerald-500/30 bg-zinc-900 p-10">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15">
                <Crown className="text-emerald-400" size={32} />
              </div>

              <h2 className="mt-6 text-2xl font-semibold text-white">
                Premium Feature
              </h2>

              <p className="mt-2 max-w-md text-zinc-400">
                The Spending Leaderboard is available exclusively to Premium
                members.
              </p>

              <button
                onClick={() => navigate("/dashboard")}
                className="mt-6 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
              >
                Upgrade to Premium
              </button>
            </div>
          </section>
        )}

        {/* PREMIUM USER */}
        {isPremium && (
          <>
            {/* Premium Banner */}
            <section className="rounded-3xl border border-emerald-500/30 bg-zinc-900 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15">
                  <Crown className="text-emerald-400" size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Premium Leaderboard
                  </h2>

                  <p className="mt-1 text-sm text-zinc-400">
                    See how your total expenses compare with other users.
                  </p>
                </div>
              </div>
            </section>

            {/* Leaderboard */}
            <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="mb-6 flex items-center gap-3">
                <Trophy className="text-emerald-400" size={24} />

                <h2 className="text-2xl font-semibold text-white">
                  Spending Leaderboard
                </h2>
              </div>

              {/* Header */}
              <div className="grid grid-cols-12 border-b border-zinc-800 px-4 pb-4 text-sm font-medium text-zinc-500">
                <div className="col-span-2">Rank</div>

                <div className="col-span-6">User</div>

                <div className="col-span-4 text-right">Total Expenses</div>
              </div>

              {/* Loading */}
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <LoaderCircle className="h-8 w-8 animate-spin text-emerald-500" />
                </div>
              )}

              {/* Empty */}
              {!loading && leaderboard.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-zinc-400">
                    No leaderboard data available.
                  </p>
                </div>
              )}

              {/* Rows */}
              {!loading && leaderboard.length > 0 && (
                <div className="divide-y divide-zinc-800">
                  {leaderboard.map((user, index) => {
                    const rank = index + 1;

                    return (
                      <div
                        key={user.userId}
                        className={`grid grid-cols-12 items-center px-4 py-5 transition ${
                          rank === 1
                            ? "bg-emerald-500/5"
                            : "hover:bg-zinc-800/50"
                        }`}
                      >
                        {/* Rank */}
                        <div className="col-span-2">
                          {rank === 1 ? (
                            <div className="flex items-center gap-2">
                              <Trophy size={20} className="text-yellow-400" />

                              <span className="font-bold text-white">1</span>
                            </div>
                          ) : (
                            <span className="text-zinc-400">{rank}</span>
                          )}
                        </div>

                        {/* User */}
                        <div className="col-span-6 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 font-semibold text-white">
                            {user.name?.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <p className="font-medium text-white">
                              {user.name}
                            </p>

                            {rank === 1 && (
                              <p className="text-xs text-emerald-400">
                                Highest spending
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Expense */}
                        <div className="col-span-4 text-right">
                          <span
                            className={`font-semibold ${
                              rank === 1 ? "text-emerald-400" : "text-white"
                            }`}
                          >
                            ₹
                            {Number(user.totalExpense || 0).toLocaleString(
                              "en-IN",
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default Leaderboard;
