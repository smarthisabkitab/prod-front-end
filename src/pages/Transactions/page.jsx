import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  useGetShopTransactionsQuery,
  useDeleteShopTransactionMutation,
} from "../../store/api/transactionApi";
import DashboardLayout from "../../components/layout/dashboard.layout";
import ErrorComponent from "../../components/ui/ErrorComponent";
import TransactionDrawer from "../../components/transaction/TransactionDrawer";

const TransactionsPage = () => {
  const { id } = useParams();
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    data: transactions = [],
    isLoading,
    error,
  } = useGetShopTransactionsQuery(id);

  const [deleteTransaction, { isLoading: isDeleting }] =
    useDeleteShopTransactionMutation();

  if (error) return <ErrorComponent />;

  const handleDelete = async (transactionId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (!confirmDelete) return;

    try {
      await deleteTransaction({ shopId: id, transactionId }).unwrap();
      alert("Transaction deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete transaction");
    }
  };

  const handleRowClick = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDrawerOpen(true);
  };

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
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center text-gray-500">
                Loading transactions...
              </div>
            ) : transactions.data?.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No transactions found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Customer Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Product Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.data.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleRowClick(item)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.Customer?.fullname}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.Product?.product_name?.toUpperCase()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.Product?.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(item.id);
                            }}
                            disabled={isDeleting}
                            className="text-red-600 hover:text-red-800 font-medium hover:cursor-pointer"
                          >
                            {isDeleting ? "Deleting..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Drawer */}
        <TransactionDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          transaction={selectedTransaction}
        />
      </main>
    </DashboardLayout>
  );
};

export default TransactionsPage;
