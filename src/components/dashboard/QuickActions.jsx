import React from 'react';
import { Store, Users, PlusCircle, Receipt, Zap } from 'lucide-react';

const QuickActions = ({ actions, navigate }) => {
  const getIcon = (title) => {
    switch(title) {
      case 'Manage Shops':
        return <Store className="h-5 w-5" />;
      case 'Manage Users':
        return <Users className="h-5 w-5" />;
      case 'Add New Item':
        return <PlusCircle className="h-5 w-5" />;
      case 'Record Sale':
        return <Receipt className="h-5 w-5" />;
      default:
        return <Store className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-white shadow rounded-xl overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
          <Zap className="text-amber-500 mr-2 h-5 w-5" />
          Quick Actions
        </h3>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="space-y-3">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => navigate(action.path)}
              className={`w-full flex items-center justify-center space-x-2 text-white px-4 py-3 rounded-lg transition-all transform hover:-translate-y-0.5 hover:shadow-md ${action.color}`}
            >
              {getIcon(action.title)}
              <span>{action.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;