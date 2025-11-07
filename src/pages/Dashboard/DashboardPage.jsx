import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Store, Users, RefreshCcw, User } from "lucide-react";

import DashboardLayout from "../../components/layout/dashboard.layout";

const baseQuickActions = [
  {
    title: "Shops",
    description: "Manage all your registered shops",
    icon: <Store className="w-8 h-8 text-blue-500" />,
    path: "/shop",
    color: "bg-blue-50 hover:bg-blue-100",
  },

  {
    title: "Conversion",
    description: "Check shop conversions and reports",
    icon: <RefreshCcw className="w-8 h-8 text-purple-500" />,
    path: "/conversion",
    color: "bg-purple-50 hover:bg-purple-100",
  },
  {
    title: "Profile",
    description: "Update your personal information",
    icon: <User className="w-8 h-8 text-orange-500" />,
    path: "/#",
    color: "bg-orange-50 hover:bg-orange-100",
  },
];

const adminQuickAction = [
  {
    title: "Users",
    description: "View and manage users",
    icon: <Users className="w-8 h-8 text-green-500" />,
    path: "/user-management",
    color: "bg-green-50 hover:bg-green-100",
  },
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === "admin";

  // Combine actions based on user role
  const quickActions = isAdmin
    ? [baseQuickActions[0], adminQuickAction, ...baseQuickActions.slice(1)]
    : baseQuickActions;

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Heading */}
        <h1 className="text-2xl font-semibold mb-6">Welcome back 👋</h1>
        {user?.role && (
          <p className="text-gray-600 mt-1">
            Role: <span className="capitalize font-medium">{user.role}</span>
          </p>
        )}
        {/* Quick Actions */}
        <div
          className={`grid gap-6 ${
            quickActions.length === 4
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              : quickActions.length === 3
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2"
          }`}
        >
          {quickActions.map((action, idx) => (
            <div
              key={idx}
              onClick={() => navigate(action.path)}
              className={`cursor-pointer p-5 rounded-2xl shadow-md transition-all duration-200 ${action.color} border border-transparent hover:border-gray-300`}
            >
              <div className="flex items-center gap-4">
                {action.icon}
                <div>
                  <h2 className="text-lg font-medium">{action.title}</h2>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Optionally Add More Sections */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-gray-600 text-sm">
              No recent activities yet. Start by managing your shops or users.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
