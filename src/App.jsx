import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";

import ShopManagementPage from "./pages/Shop/page";
import AddShopPage from "./pages/Shop/AddShopPage";
import EditShopPage from "./pages/Shop/edit.shop.page";
import TransactionsPage from "./pages/Transactions/page";
import UploadTransactionPage from "./pages/Transactions/upload.transaction.page";

import UserManagementPage from "./pages/Users/page";
import AddUserPage from "./pages/Users/AddUserPage";
import ProfilePage from "./pages/Profile/page";

import ConversionPage from "./pages/Conversion/page";

import { ProtectedRoute } from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />

            {/* Dashboard Layout with Nested Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            >
              {/* Nested routes under dashboard */}
              <Route path="shop" element={<ShopManagementPage />} />
              <Route path="shop/add" element={<AddShopPage />} />
              <Route path="shop/edit/:shop_id" element={<EditShopPage />} />
              <Route
                path="shop/transactions/:id"
                element={<TransactionsPage />}
              />
              <Route
                path="shop/upload-transaction/:id"
                element={<UploadTransactionPage />}
              />
              <Route path="conversion" element={<ConversionPage />} />
              <Route path="user-management" element={<UserManagementPage />} />
              <Route path="user-management/add" element={<AddUserPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            {/* Keep old routes for backward compatibility (optional) */}
            <Route
              path="/shop"
              element={
                <ProtectedRoute>
                  <ShopManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shop/add"
              element={
                <ProtectedRoute>
                  <AddShopPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shop/edit/:shop_id"
              element={
                <ProtectedRoute>
                  <EditShopPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shop/transactions/:id"
              element={
                <ProtectedRoute>
                  <TransactionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shop/upload-transaction/:id"
              element={
                <ProtectedRoute>
                  <UploadTransactionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/conversion"
              element={
                <ProtectedRoute>
                  <ConversionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-management"
              element={
                <ProtectedRoute>
                  <UserManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-management/add"
              element={
                <ProtectedRoute>
                  <AddUserPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
