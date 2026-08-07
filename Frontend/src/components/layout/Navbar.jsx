import { Bell, Search } from "lucide-react";

function Navbar() {
  return (
    <header className="h-20 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-8">
      <div className="relative w-96">
        <Search className="absolute left-3 top-3 text-zinc-500" size={18} />

        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-xl bg-zinc-800 border border-zinc-700 py-2 pl-10 pr-4 text-white placeholder:text-zinc-500 outline-none focus:border-green-400"
        />
      </div>

      <button className="relative">
        <Bell className="text-zinc-400" />
      </button>
    </header>
  );
}

export default Navbar;
