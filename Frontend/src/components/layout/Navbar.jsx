import { Bell, Search } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-8 py-4">
      <div className="relative w-full max-w-md">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          size={18}
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-2 pl-10 pr-4 text-white placeholder:text-zinc-500 outline-none focus:border-green-400"
        />
      </div>

      <div className="ml-6 flex items-center gap-5">
        <button className="relative">
          <Bell className="text-zinc-400" />
        </button>

        <button
          onClick={handleLogout}
          className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
