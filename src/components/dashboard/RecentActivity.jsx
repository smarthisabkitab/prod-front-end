import React from 'react';
import { Plus, DollarSign, AlertCircle, RefreshCw, History } from 'lucide-react';

const RecentActivity = ({ activities }) => {
  const getIcon = (type) => {
    switch(type) {
      case 'add':
        return <Plus className="h-4 w-4 text-green-600" />;
      case 'sale':
        return <DollarSign className="h-4 w-4 text-blue-600" />;
      case 'alert':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'update':
        return <RefreshCw className="h-4 w-4 text-purple-600" />;
      default:
        return <Plus className="h-4 w-4 text-green-600" />;
    }
  };

  const getBgColor = (type) => {
    switch(type) {
      case 'add':
        return 'bg-green-100';
      case 'sale':
        return 'bg-blue-100';
      case 'alert':
        return 'bg-yellow-100';
      case 'update':
        return 'bg-purple-100';
      default:
        return 'bg-green-100';
    }
  };

  return (
    <div className="bg-white shadow rounded-xl overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
          <History className="text-amber-500 mr-2 h-5 w-5" />
          Recent Activity
        </h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {activities.map((activity, index) => (
          <li key={index} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getBgColor(activity.type)}`}>
                  {getIcon(activity.type)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
              <div>
                <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                  View
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="bg-gray-50 px-4 py-4 sm:px-6">
        <div className="text-sm">
          <a href="#" className="font-medium text-amber-600 hover:text-amber-700">
            View all activity
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;