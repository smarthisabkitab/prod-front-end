const StatsBanner = () => {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-12 border border-amber-100 shadow-lg">
        <div className="grid grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-700">500+</div>
            <div className="text-amber-600">Jewellery Businesses</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-700">$42M+</div>
            <div className="text-amber-600">Inventory Managed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-700">99.9%</div>
            <div className="text-amber-600">Uptime Reliability</div>
          </div>
        </div>
      </div>
    );
  };
  
  export default StatsBanner;
  