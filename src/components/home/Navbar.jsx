import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown,
  HomeIcon,
  Store,
  Users,
  Gem,
} from "lucide-react";
import {
  logout,
  selectIsAuthenticated,
  selectCurrentUser,
} from "../../store/slices/authSlice";

const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setShowUserMenu(false);
  };

  return (
    <nav className="flex justify-between items-center mb-16 pt-4">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-xl shadow-lg">
          <Gem className="w-8 h-8 text-white" />
        </div>
        <div className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
          Smart Hisab Kittab
        </div>
      </div>

      {/* Links */}
      <div className="flex items-center space-x-4">
        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="flex items-center space-x-2 px-6 py-3 bg-white text-amber-700 rounded-xl border border-amber-200 shadow-md hover:bg-amber-50"
            >
              <LogIn size={20} />
              <span className="font-medium">Login</span>
            </Link>
            <Link
              to="/register"
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 shadow-md"
            >
              <UserPlus size={20} />
              <span className="font-medium">Register</span>
            </Link>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 px-6 py-3 bg-white text-amber-700 rounded-xl border border-amber-200 shadow-md"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>
              <span>{user?.name || "My Account"}</span>
              <ChevronDown
                size={16}
                className={`${showUserMenu ? "rotate-180" : ""}`}
              />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-amber-100 shadow-2xl overflow-hidden animate-fade-in">
                <div className="p-4 border-b border-amber-100 bg-amber-50">
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-sm text-amber-600">{user?.email}</div>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-amber-50"
                  >
                    <HomeIcon size={18} />
                    <span>Dashboard</span>
                  </button>
                  <Link
                    to="/shop-management"
                    className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-amber-50"
                  >
                    <Store size={18} />
                    <span>Manage Shops</span>
                  </Link>
                  <Link
                    to="/user-management"
                    className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-amber-50"
                  >
                    <Users size={18} />
                    <span>Manage Users</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-amber-50"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
