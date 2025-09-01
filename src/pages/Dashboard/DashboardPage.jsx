import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import components
import StatsCard from "../../components/dashboard/StatsCard";
import RecentActivity from "../../components/dashboard/RecentActivity";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentSales from "../../components/dashboard/RecentSales";

// Layout
import DashboardLayout from "../../components/layout/dashboard.layout";

// Data
import {
  statsData,
  recentActivities,
  quickActions,
  recentSales,
} from "../../utils/data/dashboard.data";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <DashboardLayout>
      {/* Tabs */}
      <div className="w-full mb-6">
        <div className="flex space-x-1 bg-white rounded-lg shadow-sm p-1">
          {["overview", "inventory", "sales", "reports", "settings"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-amber-500 text-white shadow"
                    : "text-gray-600 hover:text-amber-700 hover:bg-amber-50"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changePositive={stat.changePositive}
          />
        ))}
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity activities={recentActivities} />
        </div>

        {/* Quick Actions & Recent Sales */}
        <div className="lg:col-span-1">
          <QuickActions actions={quickActions} navigate={navigate} />
          <div className="mt-6">
            <RecentSales sales={recentSales} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
