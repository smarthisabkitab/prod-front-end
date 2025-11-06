import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
} from "../store/api/authApi";
import {
  setCredentials,
  logout as logoutAction,
} from "../store/slices/authSlice";

// Hook for login
export const useAuthLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async (credentials) => {
    try {
      const response = await login(credentials).unwrap();

      if (response.success) {
        // Store tokens and user data
        dispatch(
          setCredentials({
            accessToken: response.accessToken,
            user: response.user,
          })
        );

        // Redirect based on user role
        if (response.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }

        return response;
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  return {
    login: handleLogin,
    isLoading,
    error,
  };
};

// Hook for logout
export const useAuthLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Always clear local state
      dispatch(logoutAction());
      navigate("/login");
    }
  };

  return handleLogout;
};

// Hook for token refresh
export const useTokenRefresh = () => {
  const [refreshToken] = useRefreshTokenMutation();
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const response = await refreshToken().unwrap();

      if (response.success) {
        dispatch(
          setCredentials({
            accessToken: response.accessToken,
            user: response.user,
          })
        );
        return response.accessToken;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      // If refresh fails, logout user
      dispatch(logoutAction());
      throw error;
    }
  };

  return refresh;
};
