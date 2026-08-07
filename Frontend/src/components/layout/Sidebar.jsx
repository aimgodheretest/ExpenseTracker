import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  PieChart,
  FileText,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Expenses",
    path: "/expenses",
    icon: Wallet,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: PieChart,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: FileText,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
      <div className="h-20 flex items-center px-8 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15
border border-emerald-500/20
text-emerald-400  "
          >
            <span className="text-xl">💰</span>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">ExpenseTracker</h2>

            <p className="text-sm text-zinc-400">Personal Finance</p>
          </div>
        </div>{" "}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 transition-all
                 ${
                   isActive
                     ? "bg-green-500 text-white"
                     : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                 }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
        <div className="border-t border-zinc-800 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 font-semibold text-white">
              MK
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">Murli Kumar</h3>

              <p className="text-xs text-zinc-400">Free Plan</p>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
