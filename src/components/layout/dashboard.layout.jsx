import Navbar from "../dashboard/Navbar";
import Footer from "../dashboard/Footer";
import Breadcrumb from "../dashboard/Breadcrumb";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Main Content */}
      <main className="flex-1 w-full px-6 py-6">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
