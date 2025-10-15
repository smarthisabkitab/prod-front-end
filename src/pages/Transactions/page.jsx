import { useGetShopTransactionsQuery } from "../../store/api/transactionApi";
import { Link, useParams } from "react-router-dom";

import DashboardLayout from "../../components/layout/dashboard.layout";
import ErrorComponent from "../../components/ui/ErrorComponent";

const TransactionsPage = () => {
  const { id } = useParams();
  const {
    data: transactions = [],
    isLoading,
    error,
  } = useGetShopTransactionsQuery(id);

  if (error) <ErrorComponent />;

  return (
    <DashboardLayout>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Transaction Record
          </h2>
          <Link
            to={`/shop/upload-transaction/${id}`}
            className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition-colors font-semibold shadow"
          >
            Upload Record
          </Link>
        </div>

        <div className="grid grid-cols-1">
          {/* Shop Transactions Table Section*/}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="text-gray-500">Loading shops...</div>
              </div>
            ) : transactions.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-gray-500 mb-4">
                  No shop transactions found
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Weight
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Given Amount (Rs.)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration (Days)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rate (%)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Intrest (Rs.)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.data.map((items) => (
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {items.Customer.fullname}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {items.Product.product_name.toUpperCase()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {items.Product.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {items.Product.total_weight}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {items.given_amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {items.time_duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {items.interest_rate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {items.received_interest}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default TransactionsPage;
