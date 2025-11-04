import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import DashboardLayout from "../../components/layout/dashboard.layout";
import { shopSchema } from "../../utils/validations/shop.schema";
import {
  useGetShopQuery,
  useUpdateShopMutation,
} from "../../store/api/shopApi";

const EditShopPage = () => {
  const { shop_id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Fetch shop data
  const {
    data: shopData,
    isLoading: isFetching,
    error: fetchError,
  } = useGetShopQuery(shop_id);

  // Mutation for updating shop
  const [updateShop, { isLoading: isUpdating, error: updateError }] =
    useUpdateShopMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(shopSchema),
  });

  // Prefill form when data is fetched
  useEffect(() => {
    if (shopData?.item) {
      console.log("Prefilling form with:", shopData.item);
      reset(shopData.item);
    }
  }, [shopData, reset]);

  const onSubmit = async (formData) => {
    console.log("Form Submitted:", formData);

    try {
      const updatedData = {
        ...formData,
        user_id: user?.id,
      };
      console.log("Updated Shop Data to send:", updatedData);

      // Try different parameter structures:

      // Option 1: Direct object (most common)
      const result = await updateShop(updatedData).unwrap();

      // Option 2: With id in the data
      // const result = await updateShop({ ...updatedData, id: shop_id }).unwrap();

      // Option 3: If your endpoint needs specific structure
      // const result = await updateShop({
      //   shopId: shop_id,
      //   updateData: updatedData
      // }).unwrap();

      console.log("Update successful:", result);
      navigate("/shop");
    } catch (err) {
      console.error("Failed to update shop:", err);
      console.error("Error status:", err.status);
      console.error("Error data:", err.data);
    }
  };

  // const onSubmit = async (formData) => {
  //   console.log("Form Submitted:", formData);

  //   try {
  //     const updatedData = {
  //       ...formData,
  //       user_id: user?.id,
  //     };
  //     console.log("Updated Shop Data to send:", updatedData);

  //     const result = await updateShop({
  //       id: shop_id,
  //       data: updatedData, // Note: API might expect a 'data' property
  //     }).unwrap();

  //     console.log("Update successful:", result);
  //     navigate("/shop");
  //   } catch (err) {
  //     console.error("Failed to update shop:", err);
  //     console.error("Error details:", err.data); // Check if there's more error info
  //   }
  // };

  // Add this to see what's happening with the update
  useEffect(() => {
    if (updateError) {
      console.error("Update error:", updateError);
    }
  }, [updateError]);

  if (isFetching)
    return (
      <DashboardLayout>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">Loading shop details...</p>
        </main>
      </DashboardLayout>
    );

  if (fetchError)
    return (
      <DashboardLayout>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
          <p className="text-red-600">
            Failed to load shop details. Please try again.
          </p>
        </main>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Shop</h2>
          <Link
            to="/shop"
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors font-semibold shadow"
          >
            Cancel
          </Link>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shop Name *
            </label>
            <input
              {...register("shop_name")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter shop name"
            />
            {errors.shop_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.shop_name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address *
            </label>
            <textarea
              {...register("address")}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter shop address"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                {...register("phone_no")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter phone number"
              />
              {errors.phone_no && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone_no.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Owner Name *
            </label>
            <input
              {...register("owner_name")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter owner name"
            />
            {errors.owner_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.owner_name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter shop description"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status *
            </label>
            <select
              {...register("status")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isUpdating}
              className="px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50 hover:cursor-pointer"
            >
              {isUpdating ? "Saving..." : "Update Shop"}
            </button>
          </div>
        </form>
      </main>
    </DashboardLayout>
  );
};

export default EditShopPage;
