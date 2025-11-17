import { LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectCurrentUser } from "../../store/slices/authSlice";
import { useLogoutMutation } from "../../store/api/authApi";

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } catch (error) {
      console.error("Logout API failed:", error);
    }

    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-amber-800 to-amber-600 text-white shadow-lg">
      <div className="w-full px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>

          {/* User + Logout */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-amber-700/30 px-3 py-1 rounded-full">
              <div className="h-8 w-8 rounded-full bg-amber-400 flex items-center justify-center text-amber-900 font-semibold">
                {user?.fullname?.charAt(0) || "U"}
              </div>
              <div className="text-sm">Welcome, {user?.fullname || "User"}</div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 bg-white/20 px-4 py-2 rounded-md hover:bg-white/30 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
