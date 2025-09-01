import React, { useState } from "react";

import DashboardLayout from "../../components/layout/dashboard.layout";

const ConversionPage = () => {
  const gramPerAana = 0.728987738;
  const gramPerTola = gramPerAana * 16; // ≈11.6638
  const gramPerLal = gramPerTola / 100;

  const [values, setValues] = useState({
    gram: "",
    tola: "",
    aana: "",
    lal: "",
  });

  const convertFrom = (unit, amount) => {
    let g;
    if (unit === "gram") g = amount;
    if (unit === "tola") g = amount * gramPerTola;
    if (unit === "aana") g = amount * gramPerAana;
    if (unit === "lal") g = amount * gramPerLal;

    setValues({
      gram: g,
      tola: g / gramPerTola,
      aana: g / gramPerAana,
      lal: g / gramPerLal,
    });
  };

  const handleChange = (unit, e) => {
    const amount = parseFloat(e.target.value) || 0;
    convertFrom(unit, amount);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Gold & Silver Converter
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["gram", "tola", "aana", "lal"].map((unit) => (
            <div
              key={unit}
              className="p-5 bg-white/70 backdrop-blur-lg shadow-lg rounded-2xl"
            >
              <label className="block text-gray-700 font-medium capitalize mb-2">
                {unit}
              </label>
              <input
                type="number"
                value={values[unit]}
                onChange={(e) => handleChange(unit, e)}
                placeholder={`Enter ${unit}`}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ConversionPage;
