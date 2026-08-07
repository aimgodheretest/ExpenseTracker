import { User, Mail, Lock, Eye, EyeOff, LoaderCircle } from "lucide-react";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { signup } from "../../services/authService";

function RegisterCard() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await signup({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success("Account created successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur">
      <h1 className="text-4xl font-bold text-white">Create Account 🚀</h1>

      <p className="mt-3 text-zinc-400">Start managing your finances today.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        {/* Name */}
        <div>
          <label className="mb-3 block text-sm text-zinc-400">Full Name</label>

          <div className="flex items-center rounded-2xl border border-zinc-700 bg-zinc-800 px-4 focus-within:border-emerald-500">
            <User size={18} className="text-zinc-500" />

            <input
              className="w-full bg-transparent px-4 py-3 text-white outline-none"
              placeholder="Enter your name"
              {...register("name", {
                required: "Name is required",
              })}
            />
          </div>

          {errors.name && (
            <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-3 block text-sm text-zinc-400">Email</label>

          <div className="flex items-center rounded-2xl border border-zinc-700 bg-zinc-800 px-4 focus-within:border-emerald-500">
            <Mail size={18} className="text-zinc-500" />

            <input
              type="email"
              className="w-full bg-transparent px-4 py-3 text-white outline-none"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
            />
          </div>

          {errors.email && (
            <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="mb-3 block text-sm text-zinc-400">Password</label>

          <div className="flex items-center rounded-2xl border border-zinc-700 bg-zinc-800 px-4 focus-within:border-emerald-500">
            <Lock size={18} className="text-zinc-500" />

            <input
              type={showPassword ? "text" : "password"}
              className="w-full bg-transparent px-4 py-3 text-white outline-none"
              placeholder="Password"
              {...register("password", {
                required: "Password required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={18} className="text-zinc-500" />
              ) : (
                <Eye size={18} className="text-zinc-500" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-2 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-3 block text-sm text-zinc-400">
            Confirm Password
          </label>

          <div className="flex items-center rounded-2xl border border-zinc-700 bg-zinc-800 px-4 focus-within:border-emerald-500">
            <Lock size={18} className="text-zinc-500" />

            <input
              type={showConfirm ? "text" : "password"}
              className="w-full bg-transparent px-4 py-3 text-white outline-none"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />

            <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? (
                <EyeOff size={18} className="text-zinc-500" />
              ) : (
                <Eye size={18} className="text-zinc-500" />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          disabled={loading}
          className="flex w-full items-center justify-center rounded-2xl bg-emerald-600 py-4 text-lg font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? (
            <LoaderCircle className="h-5 w-5 animate-spin" />
          ) : (
            "Create Account"
          )}
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full rounded-2xl border border-blue-500 py-4 text-lg font-semibold text-blue-400 hover:bg-blue-500/10"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}

export default RegisterCard;
