import { useState } from "react";

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

  const [activeField, setActiveField] = useState("");

  const convertFrom = (unit, amount) => {
    if (amount === "" || isNaN(amount)) {
      setValues({ gram: "", tola: "", aana: "", lal: "" });
      return;
    }

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
    const amount = e.target.value === "" ? "" : parseFloat(e.target.value);
    setActiveField(unit);
    convertFrom(unit, amount);
  };

  const handleFocus = (unit) => {
    setActiveField(unit);
  };

  const handleBlur = () => {
    setActiveField("");
  };

  const formatValue = (value) => {
    if (value === "") return "";
    return Math.round(value * 1000) / 1000; // Round to 3 decimal places
  };

  return (
    <>
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Gold & Silver Converter
          </h1>
          <p className="text-gray-600">
            Convert between different units of measurement for precious metals
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700">
              Unit Conversion
            </h2>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { unit: "gram", label: "Grams (g)", icon: "⚖️" },
              { unit: "tola", label: "Tola", icon: "🥘" },
              { unit: "aana", label: "Aana", icon: "🪙" },
              { unit: "lal", label: "Lal", icon: "🔴" },
            ].map(({ unit, label, icon }) => (
              <div
                key={unit}
                className={`p-5 rounded-xl border-2 transition-all duration-200 ${
                  activeField === unit
                    ? "border-blue-500 bg-blue-50/50"
                    : "border-gray-200 bg-gray-50/50"
                }`}
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">{icon}</span>
                  <label className="text-gray-700 font-medium">{label}</label>
                </div>
                <input
                  type="number"
                  value={formatValue(values[unit])}
                  onChange={(e) => handleChange(unit, e)}
                  onFocus={() => handleFocus(unit)}
                  onBlur={handleBlur}
                  placeholder={`Enter ${label}`}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-colors"
                />
              </div>
            ))}
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">1 Tola</div>
                <div className="font-semibold">{gramPerTola.toFixed(4)} g</div>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">1 Aana</div>
                <div className="font-semibold">{gramPerAana.toFixed(4)} g</div>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">1 Lal</div>
                <div className="font-semibold">{gramPerLal.toFixed(6)} g</div>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">1 Tola</div>
                <div className="font-semibold">16 Aana</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-5 bg-blue-50 rounded-xl">
          <h3 className="font-semibold text-blue-800 mb-2">How to use:</h3>
          <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
            <li>
              Enter a value in any field to automatically convert to other units
            </li>
            <li>All conversions happen in real-time as you type</li>
            <li>
              The active field is highlighted in blue for better visibility
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ConversionPage;
