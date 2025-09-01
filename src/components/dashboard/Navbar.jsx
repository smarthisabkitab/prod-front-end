import { Gem, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectCurrentUser } from "../../store/slices/authSlice";

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-amber-800 to-amber-600 text-white shadow-lg">
      <div className="w-full px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-amber-400 p-2 rounded-lg shadow-md">
              <Gem className="h-5 w-5 text-amber-800" />
            </div>
            <h1 className="text-2xl font-bold">Gold Jewellery Dashboard</h1>
          </div>

          {/* User + Logout */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-amber-700/30 px-3 py-1 rounded-full">
              <div className="h-8 w-8 rounded-full bg-amber-400 flex items-center justify-center text-amber-900 font-semibold">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="text-sm">Welcome, {user?.name || "User"}</div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 bg-white/20 px-4 py-2 rounded-md hover:bg-white/30 hover:cursor-pointer transition-colors backdrop-blur-sm"
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
