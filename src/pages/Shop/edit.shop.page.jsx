import React from "react";
import { useParams, Link } from "react-router-dom";

import DashboardLayout from "../../components/layout/dashboard.layout";
import { useGetShopQuery } from "../../store/api/shopApi";

const EditShopPage = () => {
  const { shop_id } = useParams();

  const {
    data: shop = { items: [] },
    isLoading,
    error,
  } = useGetShopQuery(shop_id);

  console.log("Edit Shop: ", shop);
  return (
    <DashboardLayout>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-6">
          <Link
            to="/shop"
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:text-white-900 hover:bg-red-700 transition-colors font-semibold shadow"
          >
            Cancel
          </Link>
        </div>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Edit Shop</h2>
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
};

export default EditShopPage;
