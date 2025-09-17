import { useState } from "react";
import {
  useGetShopsQuery,
  useDeleteShopMutation,
} from "../../store/api/shopApi";
import DashboardLayout from "../../components/layout/dashboard.layout";
import { Link } from "react-router-dom";
import ErrorComponent from "../../components/ui/ErrorComponent";

const ShopManagementPage = () => {
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const { data: shops = [], isLoading, error } = useGetShopsQuery();
  const [deleteShop, { isLoading: isDeleting }] = useDeleteShopMutation();

  const handleDelete = async (shop) => {
    try {
      await deleteShop(shop.id).unwrap();
      setDeleteConfirm(null);
    } catch (err) {
      console.error("Failed to delete shop:", err);
    }
  };

  if (error) <ErrorComponent />;

  return (
    <DashboardLayout>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-6">
          <Link
            to="/shop/add"
            className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition-colors font-semibold shadow"
          >
            Add New Shop
          </Link>
        </div>
        <div className="grid grid-cols-1">
          {/* Shops Table Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Shops</h2>
            </div>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="text-gray-500">Loading shops...</div>
                </div>
              ) : shops.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-gray-500 mb-4">No shops found</div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Shop Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Owner
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {shops.items.map((shop) => (
                        <tr key={shop.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {shop.shop_name}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {shop.user_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                shop.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {shop.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              //   onClick={() => startEditShop(shop)}
                              className="text-yellow-600 hover:text-yellow-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(shop)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Confirm Delete
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete "{deleteConfirm.name}"? This
                action cannot be undone.
              </p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ShopManagementPage;
