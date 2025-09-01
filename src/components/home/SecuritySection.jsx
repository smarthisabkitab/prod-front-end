import { Shield } from "lucide-react";

const SecuritySection = () => {
  return (
    <div className="text-center bg-amber-50 rounded-2xl p-8 border border-amber-100 mb-12">
      <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full mb-4 shadow-sm">
        <Shield className="w-5 h-5 text-amber-600" />
        <span className="text-amber-700 font-medium">Enterprise-Grade Security</span>
      </div>
      <h3 className="text-2xl font-semibold text-amber-900 mb-4">Your Data is Protected</h3>
      <p className="text-amber-700 max-w-2xl mx-auto">
        We employ bank-level security measures to ensure your valuable inventory data and business information remain safe and confidential.
      </p>
    </div>
  );
};

export default SecuritySection;
