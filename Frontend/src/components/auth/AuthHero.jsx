import { Wallet } from "lucide-react";
import AuthStats from "./AuthStats";

function AuthHero() {
  return (
    <div className="flex w-full max-w-2xl flex-col justify-center">
      {/* Logo */}
      <div className="mb-14 flex items-center gap-4">
        <div className="rounded-2xl bg-emerald-500/15 p-4 mt-5">
          <Wallet size={34} className="text-emerald-400  " />
        </div>

        <div>
          <h2 className="text-3xl mt-5 font-extrabold tracking-tight">
            Expense
            <span className="text-emerald-400">Tracker</span>
          </h2>

          <p className="text-zinc-400">Personal Finance</p>
        </div>
      </div>

      <h1 className="text-6xl xl:text-6xl font-black leading-none">
        Take Control
      </h1>

      <h1 className="text-6xl xl:text-6xl font-black leading-none">Of Your</h1>

      <h1 className="text-6xl xl:text-6xl font-black leading-none text-emerald-400">
        Money
      </h1>

      <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">
        Manage expenses, visualize spending, generate reports and build better
        financial habits from one modern dashboard.
      </p>

      <AuthStats />
    </div>
  );
}

export default AuthHero;
