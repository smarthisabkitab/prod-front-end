import React from "react";

const ErrorComponent = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Error Loading Shops
        </h2>
        <p className="text-gray-600 mb-4">
          Failed to load shop data. Please try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorComponent;
