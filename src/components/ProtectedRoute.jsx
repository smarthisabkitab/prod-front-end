import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Redirect based on user role
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Usage examples:
// <ProtectedRoute> - any authenticated user
// <ProtectedRoute requiredRole="admin"> - admin only
// <ProtectedRoute requiredRole="subscriber"> - subscriber only
