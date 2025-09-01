import { Crown, Sparkles, TrendingUp } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleDashboardClick = () => navigate("/dashboard");

  return (
    <div className="text-center max-w-4xl mx-auto mb-20">
      <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full mb-8 shadow-sm">
        <Crown className="w-4 h-4" />
        <span className="text-sm font-medium">Premium Jewellery Management</span>
      </div>

      <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-6 leading-tight">
        Elevate Your <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Jewellery Business</span>
      </h1>

      <p className="text-xl text-amber-700 mb-12 leading-relaxed">
        Streamline operations, track inventory with precision, and unlock growth opportunities 
        with our comprehensive jewellery management platform.
      </p>

      {/* CTA Button */}
      <div className="mt-8">
        {!isAuthenticated ? (
          <a
            href="/register"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-lg font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transform"
          >
            <Sparkles className="w-5 h-5" />
            <span>Start Free Trial</span>
          </a>
        ) : (
          <button
            onClick={handleDashboardClick}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-lg font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transform"
          >
            <TrendingUp className="w-5 h-5" />
            <span>Go to Dashboard</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Hero;
