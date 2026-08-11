import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

function SecurityCard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    toast.success("Logged out successfully");

    navigate("/login");
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-2xl font-semibold text-white">Security</h2>

      <div className="mt-6 space-y-4">
        {/* <button className="w-full rounded-xl border border-zinc-700 py-3 text-white hover:bg-zinc-800 transition">
          Change Password
        </button> */}

        <button
          onClick={handleLogout}
          className="w-full rounded-xl bg-red-500 py-3 font-semibold text-white hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default SecurityCard;
