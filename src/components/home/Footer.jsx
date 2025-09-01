import { Facebook, Twitter, Linkedin, Instagram, Gem } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-amber-100 border-t border-amber-200">
      <div className="px-16 py-12 grid md:grid-cols-4 gap-10 text-amber-800">
        {/* Brand */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2 rounded-lg shadow">
              <Gem className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
              GoldVault
            </span>
          </div>
          <p className="text-sm text-amber-700">
            Premium jewellery business management platform — helping you streamline operations, track inventory, and grow with confidence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3 text-amber-900">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-amber-600">Home</a></li>
            <li><a href="/#features" className="hover:text-amber-600">Features</a></li>
            <li><a href="/pricing" className="hover:text-amber-600">Pricing</a></li>
            <li><a href="/contact" className="hover:text-amber-600">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold mb-3 text-amber-900">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/docs" className="hover:text-amber-600">Documentation</a></li>
            <li><a href="/faq" className="hover:text-amber-600">FAQ</a></li>
            <li><a href="/support" className="hover:text-amber-600">Support</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="font-semibold mb-3 text-amber-900">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-amber-600"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-amber-600"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-amber-600"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="hover:text-amber-600"><Instagram className="w-5 h-5" /></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-amber-200 mt-6 py-4 text-center text-sm text-amber-700">
        © {new Date().getFullYear()} GoldVault. All rights reserved. | 
        <a href="/privacy" className="ml-2 hover:text-amber-600">Privacy Policy</a> · 
        <a href="/terms" className="ml-2 hover:text-amber-600">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
