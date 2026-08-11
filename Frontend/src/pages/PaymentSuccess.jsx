import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { CheckCircle, LoaderCircle, XCircle } from "lucide-react";

import { AuthContext } from "../context/AuthContext";
import { updateTransactionStatus } from "../services/purchaseService";

function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { token, user, login } = useContext(AuthContext);

  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const verifyPayment = async () => {
      const orderId = searchParams.get("order_id");

      if (!orderId) {
        setStatus("failed");
        return;
      }

      try {
        const response = await updateTransactionStatus(orderId);

        if (response.data.isPremium) {
          login({
            token,
            user,
            isPremium: true,
          });

          setStatus("success");

          toast.success("Premium membership activated!");

          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } else {
          setStatus("failed");
        }
      } catch (error) {
        console.log("Payment verification error:", error);

        setStatus("failed");

        toast.error(
          error.response?.data?.message || "Unable to verify payment",
        );
      }
    };

    verifyPayment();
  }, []);

  if (status === "verifying") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <LoaderCircle className="mx-auto h-12 w-12 animate-spin text-emerald-500" />

          <h1 className="mt-6 text-2xl font-bold text-white">
            Verifying Payment...
          </h1>

          <p className="mt-2 text-zinc-400">
            Please wait while we confirm your payment.
          </p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-emerald-500" />

          <h1 className="mt-6 text-3xl font-bold text-white">
            Payment Successful!
          </h1>

          <p className="mt-2 text-zinc-400">
            Your Premium membership has been activated.
          </p>

          <p className="mt-4 text-sm text-zinc-500">
            Redirecting to dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-center">
        <XCircle className="mx-auto h-16 w-16 text-red-500" />

        <h1 className="mt-6 text-3xl font-bold text-white">Payment Failed</h1>

        <p className="mt-2 text-zinc-400">We could not verify your payment.</p>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
