import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Crown, LoaderCircle } from "lucide-react";

import { AuthContext } from "../../context/AuthContext";
import { createPremiumOrder } from "../../services/purchaseService";

function PremiumCard() {
  const { isPremium } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const loadCashfree = () => {
    return new Promise((resolve, reject) => {
      if (window.Cashfree) {
        resolve(window.Cashfree);
        return;
      }

      const script = document.createElement("script");

      script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";

      script.async = true;

      script.onload = () => {
        resolve(window.Cashfree);
      };

      script.onerror = () => {
        reject(new Error("Unable to load Cashfree checkout"));
      };

      document.body.appendChild(script);
    });
  };

  const handleBuyPremium = async () => {
    try {
      setLoading(true);

      // Load Cashfree SDK
      const Cashfree = await loadCashfree();

      // Create order on backend
      const response = await createPremiumOrder();

      const { payment_session_id, orderId } = response.data;

      if (!payment_session_id) {
        throw new Error("Payment session was not created");
      }

      const cashfree = Cashfree({
        mode: "sandbox",
      });

      await cashfree.checkout({
        paymentSessionId: payment_session_id,
        redirectTarget: "_self",
      });

      /*
       * Cashfree redirects the user after checkout.
       *
       * The payment status should be verified from the
       * backend before making the user premium.
       */
    } catch (error) {
      console.log("Premium purchase error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to start premium purchase",
      );

      setLoading(false);
    }
  };

  if (isPremium) {
    return (
      <section className="rounded-3xl border border-emerald-500/30 bg-zinc-900 p-8">
        {/* Premium Header */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20">
            <Crown className="text-emerald-400" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">
              Premium Member
            </h2>

            <p className="mt-1 text-zinc-400">
              You have access to premium features.
            </p>
          </div>
        </div>

        {/* Premium Features */}
        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Premium Features
          </h3>

          <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-800/50 p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15">
                <span className="text-xl">🏆</span>
              </div>

              <div>
                <h4 className="font-semibold text-white">
                  Spending Leaderboard
                </h4>

                <p className="mt-1 text-sm text-zinc-400">
                  Compare your expenses with other users.
                </p>
              </div>
            </div>

            <Link
              to="/leaderboard"
              className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600"
            >
              View Leaderboard
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <div className="flex items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <Crown className="text-emerald-400" />

            <h2 className="text-2xl font-semibold text-white">
              Premium Membership
            </h2>
          </div>

          <p className="mt-2 text-zinc-400">
            Unlock premium features and get more from ExpenseTracker.
          </p>

          <p className="mt-4 text-2xl font-bold text-emerald-400">₹1,000</p>
        </div>

        <button
          type="button"
          onClick={handleBuyPremium}
          disabled={loading}
          className="flex min-w-40 items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <LoaderCircle className="h-5 w-5 animate-spin" />
          ) : (
            "Buy Premium"
          )}
        </button>
      </div>
    </section>
  );
}

export default PremiumCard;
