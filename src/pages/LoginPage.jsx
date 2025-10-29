import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/api/authApi";
import { setCredentials } from "../store/slices/authSlice";
import { Eye, EyeOff, LogIn, Gem } from "lucide-react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await login(formData).unwrap();
      dispatch(setCredentials(result));
      navigate("/dashboard");
    } catch (err) {
      setError(err.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-80 h-80 bg-amber-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-orange-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-rose-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-4000"></div>
      </div>

      <div className="relative z-10 bg-white p-8 rounded-2xl border border-amber-100 shadow-xl w-full max-w-md mx-4">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-xl shadow-lg">
              <Gem className="w-8 h-8 text-white" />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
              GoldVault
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-amber-700">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-amber-800 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-amber-900 placeholder-amber-500/60 transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-amber-800 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-amber-900 placeholder-amber-500/60 pr-12 transition-colors"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-500 hover:text-amber-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-4 rounded-xl hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <LogIn size={20} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-6 pt-6 border-t border-amber-100">
          <p className="text-amber-700">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-amber-600 hover:text-amber-800 font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="text-center mt-4">
          <Link
            to="/"
            className="text-amber-500 hover:text-amber-700 text-sm transition-colors inline-flex items-center"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Add these styles for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
