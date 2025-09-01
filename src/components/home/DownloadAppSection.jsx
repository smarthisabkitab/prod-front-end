import { Apple, Play } from "lucide-react";

const DownloadAppSection = () => {
  return (
    <div className="text-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-16 rounded-2xl shadow-md border border-amber-100 mb-20">
      <h3 className="text-3xl font-bold text-amber-900 mb-4">Get the GoldVault App</h3>
      <p className="text-amber-700 mb-8 max-w-xl mx-auto">
        Manage your jewellery business anywhere with our mobile app. Available for both iOS and Android.
      </p>
      <div className="flex justify-center space-x-4">
        <a href="#" className="flex items-center space-x-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800">
          <Apple size={20} /> <span>App Store</span>
        </a>
        <a href="#" className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700">
          <Play size={20} /> <span>Google Play</span>
        </a>
      </div>
    </div>
  );
};

export default DownloadAppSection;
