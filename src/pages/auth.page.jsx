import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../store/api/authApi";
import { setCredentials } from "../store/slices/authSlice";
import {
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  Crown,
  Diamond,
  Sparkles,
} from "lucide-react";
import { div } from "framer-motion/client";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_no: "",
    address: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [register, { isLoading: registerLoading }] = useRegisterMutation();

  const isLoading = loginLoading || registerLoading;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLogin) {
      // Register validation
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (!formData.fullname || !formData.phone_no || !formData.address) {
        setError("All fields are required for registration");
        return;
      }
    }

    try {
      if (isLogin) {
        // Login - only send email and password
        const loginData = {
          email: formData.email,
          password: formData.password,
        };
        const result = await login(loginData).unwrap();
        dispatch(setCredentials(result));
        navigate("/dashboard");
      } else {
        // Register - send all data except confirmPassword
        const { confirmPassword, ...registerData } = formData;
        await register(registerData).unwrap();

        // Clear form and switch to login after successful registration
        setFormData({
          fullname: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone_no: "",
          address: "",
        });
        setIsLogin(true);
        setError(""); // Clear any errors

        // Show success message or redirect to login
        navigate("/auth?message=Registration successful! Please login.");
      }
    } catch (err) {
      setError(err.data?.message || `Authentication failed. Please try again.`);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError("");
    // Don't clear all form data, keep email for better UX
    const currentEmail = formData.email;
    setFormData({
      fullname: "",
      email: currentEmail, // Keep email when switching
      password: "",
      confirmPassword: "",
      phone_no: "",
      address: "",
    });
  };

  // Only validate required fields for register mode
  const isFormValid = () => {
    if (isLogin) {
      return formData.email && formData.password;
    } else {
      return (
        formData.fullname &&
        formData.email &&
        formData.password &&
        formData.confirmPassword &&
        formData.phone_no &&
        formData.address &&
        formData.password === formData.confirmPassword
      );
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Luxury background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated sparkles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-amber-300 rounded-full animate-pulse animation-delay-2000"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-amber-200 rounded-full animate-pulse animation-delay-3000"></div>

        {/* Geometric patterns */}
        <div className="absolute -top-32 -right-32 w-64 h-64 border border-amber-400/20 rounded-full"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 border border-amber-400/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-amber-400/10 rounded-full"></div>

        {/* Luxury gradient orbs */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-amber-400/10 to-yellow-300/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-float animation-delay-4000"></div>
      </div>

      {/* Main card */}
      <div className="relative z-10 bg-slate-800/80 backdrop-blur-xl p-8 rounded-3xl border border-amber-500/30 shadow-2xl w-full max-w-2xl mx-4">
        {/* Luxury header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="bg-gradient-to-r from-amber-400 to-yellow-300 p-4 rounded-2xl shadow-lg transform rotate-6">
                <Crown className="w-8 h-8 text-slate-900" />
              </div>
              <div className="absolute -top-2 -right-2 bg-rose-500 rounded-full p-1.5 shadow-lg">
                <Diamond className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent mb-2">
            {isLogin ? "Welcome Back" : "Join GoldVault"}
          </h1>
          <p className="text-slate-300 text-sm">
            {isLogin
              ? "Sign in to your jewellery management account"
              : "Create your account and start managing your collection"}
          </p>
        </div>

        {/* Mode toggle */}
        <div className="flex bg-slate-700/50 rounded-xl p-1 mb-6 backdrop-blur-sm">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 ${
              isLogin
                ? "bg-amber-500 text-slate-900 shadow-lg"
                : "text-slate-300 hover:text-white"
            } font-medium`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 ${
              !isLogin
                ? "bg-amber-500 text-slate-900 shadow-lg"
                : "text-slate-300 hover:text-white"
            } font-medium`}
          >
            Register
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-rose-900/50 border border-rose-700 text-rose-200 px-4 py-3 rounded-xl mb-6 backdrop-blur-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-rose-400 rounded-full mr-2 animate-pulse"></div>
              {error}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-slate-400 transition-all duration-300 backdrop-blur-sm"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-slate-400 transition-all duration-300 backdrop-blur-sm"
              placeholder="Enter your email"
            />
          </div>

          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone_no"
                    value={formData.phone_no}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-slate-400 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Phone number"
                  />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-slate-400 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your address"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-slate-400 pr-12 transition-all duration-300 backdrop-blur-sm"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-amber-400 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  minLength={6}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-slate-400 pr-12 transition-all duration-300 backdrop-blur-sm"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-amber-400 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !isFormValid()}
            className="w-full group relative bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 py-4 px-4 rounded-xl hover:from-amber-400 hover:to-yellow-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg hover:shadow-amber-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div>
                <span>{isLogin ? "Signing In..." : "Creating Account..."}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2 relative">
                {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                <span>{isLogin ? "Sign In" : "Create Account"}</span>
              </div>
            )}
          </button>
        </form>

        <div className="text-center mt-6 pt-6 border-t border-slate-700">
          <p className="text-slate-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={switchMode}
              className="text-amber-400 hover:text-amber-300 font-medium transition-colors hover:underline"
            >
              {isLogin ? "Create one here" : "Sign in here"}
            </button>
          </p>
        </div>

        <div className="text-center mt-4">
          <Link
            to="/"
            className="text-slate-400 hover:text-amber-400 text-sm transition-colors inline-flex items-center group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">
              ←
            </span>
            <span className="ml-1">Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Luxury footer note */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-slate-500 text-xs flex items-center justify-center space-x-1">
          <Sparkles size={12} />
          <span>Elevating Jewellery Management Experience</span>
          <Sparkles size={12} />
        </p>
      </div>

      {/* Add these styles for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default AuthPage;
