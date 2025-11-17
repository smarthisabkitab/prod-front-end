import { useState } from "react";
import { Lock, Save, X } from "lucide-react";
import { useUpdateProfilePasswordMutation } from "../../../store/api/userApi";

const PasswordChangeForm = () => {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [updateProfilePassword] = useUpdateProfilePasswordMutation();

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    setIsPasswordLoading(true);

    try {
      const body = {
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      };

      const res = await updateProfilePassword(body).unwrap();

      alert(res?.message || "Password updated successfully!");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setIsEditingPassword(false);
    } catch (error) {
      console.error("Error updating password:", error);
      alert(error?.data?.message || "Unable to update password");
    } finally {
      setIsPasswordLoading(false);
    }
  };

  const handlePasswordCancel = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsEditingPassword(false);
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
        {!isEditingPassword && (
          <button
            onClick={() => setIsEditingPassword(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Lock className="w-4 h-4" />
            <span>Change Password</span>
          </button>
        )}
      </div>

      {isEditingPassword ? (
        <form onSubmit={handlePasswordSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter current password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter new password"
                required
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm new password"
                required
                minLength={6}
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={isPasswordLoading}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>
                  {isPasswordLoading ? "Updating..." : "Update Password"}
                </span>
              </button>

              <button
                type="button"
                onClick={handlePasswordCancel}
                className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="text-center py-4">
          <Lock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">
            Click "Change Password" to update your password
          </p>
        </div>
      )}
    </div>
  );
};

export default PasswordChangeForm;
