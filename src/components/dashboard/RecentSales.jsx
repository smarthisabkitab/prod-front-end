import React from 'react';
import { Gem, BellRing, Award, PieChart } from 'lucide-react';

const RecentSales = ({ sales }) => {
  const getIcon = (name) => {
    if (name.includes('Ring')) return <BellRing className="h-4 w-4 text-amber-600" />;
    if (name.includes('Necklace')) return <Gem className="h-4 w-4 text-amber-600" />;
    if (name.includes('Bracelet')) return <Award className="h-4 w-4 text-amber-600" />;
    return <Gem className="h-4 w-4 text-amber-600" />;
  };

  return (
    <div className="bg-white shadow rounded-xl overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
          <PieChart className="text-amber-500 mr-2 h-5 w-5" />
          Recent Sales
        </h3>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="flow-root">
          <ul className="-my-4 divide-y divide-gray-200">
            {sales.map((sale, index) => (
              <li key={index} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 bg-amber-100 rounded-md p-2">
                    {getIcon(sale.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">{sale.name}</p>
                    <p className="truncate text-sm text-gray-500">{sale.details}</p>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sale.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {sale.status}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <a href="#" className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            View all sales
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecentSales;