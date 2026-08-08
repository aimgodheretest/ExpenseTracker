import { Mail, Lock, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login } from "../../services/authService";
import { forgotPassword } from "../../services/authService";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function LoginCard() {
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await login(data);

      authLogin({
        token: response.data.token,
        user: null,
        isPremium: response.data.isPremium,
      });

      toast.success(response.data.message);

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 backdrop-blur">
      <h2 className="text-3xl font-bold text-white">Welcome Back</h2>

      <p className="mt-3 text-zinc-400">
        Sign in to continue managing your finances.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
        {/* Email */}

        <div>
          <label className="mb-3 block text-sm text-zinc-400">Email</label>

          <div className="flex items-center rounded-2xl border border-zinc-700 bg-zinc-800 px-4 transition focus-within:border-emerald-500">
            <Mail size={18} className="text-zinc-500" />

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent px-3 py-3 text-white placeholder:text-zinc-500 outline-none autofill:bg-transparent"
              {...register("email", {
                required: "Email is required",
                onChange: (e) => setEmail(e.target.value),
              })}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Password */}

        <div>
          <label className="mb-3 block text-sm text-zinc-400">Password</label>

          <div className="flex items-center rounded-2xl border border-zinc-700 bg-zinc-800 px-4 transition focus-within:border-emerald-500">
            <Lock size={18} className="text-zinc-500" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full bg-transparent px-3 py-3 text-white outline-none"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={18} className="cursor-pointer text-zinc-500" />
              ) : (
                <Eye size={18} className="cursor-pointer text-zinc-500" />
              )}
            </button>{" "}
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <button
            type="button"
            onClick={() => {
              setForgotEmail(email);
              setShowForgotModal(true);
            }}
            className="text-emerald-400 hover:text-emerald-300"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-2xl bg-emerald-600 py-3 text-lg font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? (
            <LoaderCircle className="h-5 w-5 animate-spin" />
          ) : (
            "Login"
          )}
        </button>
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="w-full rounded-2xl border border-blue-500 py-3 text-lg font-semibold text-blue-400 transition hover:bg-blue-500/10"
        >
          Signup
        </button>
      </form>
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white">Forgot Password?</h2>

            <p className="mt-2 text-zinc-400">
              Enter your email and we'll send you a password reset link.
            </p>

            <div className="mt-6">
              <label className="mb-3 block text-sm text-zinc-400">Email</label>

              <div className="flex items-center rounded-2xl border border-zinc-700 bg-zinc-800 px-4 focus-within:border-emerald-500">
                <Mail size={18} className="text-zinc-500" />

                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent px-4 py-4 text-white outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="w-1/2 rounded-2xl border border-zinc-700 py-3.5 font-semibold text-zinc-300 transition hover:bg-zinc-800"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={async () => {
                  if (!forgotEmail) {
                    toast.error("Please enter your email");
                    return;
                  }

                  try {
                    setLoading(true);

                    const response = await forgotPassword(forgotEmail);

                    toast.success(
                      response.data.message || "Reset link sent successfully",
                    );

                    setShowForgotModal(false);
                  } catch (error) {
                    toast.error(
                      error.response?.data?.message ||
                        "Unable to send reset link",
                    );
                  } finally {
                    setLoading(false);
                  }
                }}
                className="w-1/2 rounded-2xl bg-emerald-600 py-3.5 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Link"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginCard;
