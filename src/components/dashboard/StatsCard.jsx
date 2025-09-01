import React from 'react';
import { Diamond, TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ title, value, change, changePositive }) => {
  const getIcon = () => {
    switch(title) {
      case 'Total Items':
        return <Diamond className="h-5 w-5 text-amber-600" />;
      case 'Total Value':
        return <Diamond className="h-5 w-5 text-amber-600" />;
      case 'Monthly Sales':
        return <Diamond className="h-5 w-5 text-amber-600" />;
      case 'Low Stock Items':
        return <Diamond className="h-5 w-5 text-amber-600" />;
      default:
        return <Diamond className="h-5 w-5 text-amber-600" />;
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-xl border border-gray-100">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="p-2 rounded-full bg-amber-100">
              {getIcon()}
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="text-lg font-bold text-gray-900">
                {value}
              </dd>
              <dt className="text-xs mt-1">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${changePositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {changePositive ? (
                    <TrendingUp className="mr-1 h-3 w-3" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3" />
                  )}
                  {change}
                </span>
              </dt>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <a href="#" className="font-medium text-amber-600 hover:text-amber-700">
            View details
          </a>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;