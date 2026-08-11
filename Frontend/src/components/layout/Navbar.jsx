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
    <header className="flex items-center justify-end border-b border-zinc-800 bg-zinc-950 px-8 py-4">
      <div className="ml-6 flex items-center gap-5">
        <button
          onClick={handleLogout}
          className="rounded-xl border border-red-500 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-red-600 hover:text-white"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
