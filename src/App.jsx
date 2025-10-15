import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ShopManagementPage from "./pages/Shop/page";
import AddShopPage from "./pages/Shop/AddShopPage";
import UserManagementPage from "./pages/Users/page";
import AddUserPage from "./pages/Users/AddUserPage";
import ConversionPage from "./pages/Conversion/page";
import TransactionsPage from "./pages/Transactions/page";
import UploadTransactionPage from "./pages/Transactions/upload.transaction.page";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
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
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
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
