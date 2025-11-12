import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const TransactionDrawer = ({ isOpen, onClose, transaction, onUpdate }) => {
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // Initialize form data when transaction changes
  useEffect(() => {
    if (transaction) {
      setFormData({
        given_amount: transaction.given_amount || "",
        time_duration: transaction.time_duration || "",
        interest_rate: transaction.interest_rate || "",
        calculated_interest: transaction.calculated_interest || "",
        pending_amount: transaction.pending_amount || "",
        received_interest: transaction.received_interest || "",
        add_amount: transaction.add_amount || "",
        decrease_amount: transaction.decrease_amount || "",
        due_date: transaction.due_date || "",
        notes: transaction.notes || "",
      });
    }
  }, [transaction]);

  if (!transaction) return null;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onUpdate(transaction.id, formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to original transaction values
    setFormData({
      given_amount: transaction.given_amount || "",
      time_duration: transaction.time_duration || "",
      interest_rate: transaction.interest_rate || "",
      calculated_interest: transaction.calculated_interest || "",
      pending_amount: transaction.pending_amount || "",
      received_interest: transaction.received_interest || "",
      add_amount: transaction.add_amount || "",
      decrease_amount: transaction.decrease_amount || "",
      due_date: transaction.due_date || "",
      notes: transaction.notes || "",
    });
    setIsEditing(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                Transaction Details
              </h2>
              <div className="flex items-center gap-2">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
                <button
                  onClick={onClose}
                  className="text-gray-600 hover:text-gray-900 text-xl font-semibold ml-2"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Summary Table */}
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-md">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-gray-600 text-sm">
                      <th className="px-4 py-2 font-medium">Principal</th>
                      <th className="px-4 py-2 font-medium">Time (Days)</th>
                      <th className="px-4 py-2 font-medium">Rate (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t text-gray-800 text-sm">
                      <td className="px-4 py-2">
                        {isEditing ? (
                          <input
                            type="number"
                            value={formData.given_amount}
                            onChange={(e) =>
                              handleInputChange("given_amount", e.target.value)
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        ) : (
                          `Rs. ${Number(
                            transaction.given_amount
                          ).toLocaleString()}`
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {isEditing ? (
                          <input
                            type="number"
                            value={formData.time_duration}
                            onChange={(e) =>
                              handleInputChange("time_duration", e.target.value)
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        ) : (
                          transaction.time_duration
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {isEditing ? (
                          <input
                            type="number"
                            step="0.1"
                            value={formData.interest_rate}
                            onChange={(e) =>
                              handleInputChange("interest_rate", e.target.value)
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        ) : (
                          transaction.interest_rate
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Financial Info */}
              <div className="grid grid-cols-2 gap-4">
                <EditableInfo
                  label="Calculated Interest"
                  value={formData.calculated_interest}
                  isEditing={isEditing}
                  onChange={(value) =>
                    handleInputChange("calculated_interest", value)
                  }
                  type="number"
                />
                <EditableInfo
                  label="Pending Amount"
                  value={formData.pending_amount}
                  isEditing={isEditing}
                  onChange={(value) =>
                    handleInputChange("pending_amount", value)
                  }
                  type="number"
                />
                <EditableInfo
                  label="Received Interest"
                  value={formData.received_interest}
                  isEditing={isEditing}
                  onChange={(value) =>
                    handleInputChange("received_interest", value)
                  }
                  type="number"
                />
                <EditableInfo
                  label="Additional Amount"
                  value={formData.add_amount}
                  isEditing={isEditing}
                  onChange={(value) => handleInputChange("add_amount", value)}
                  type="number"
                />
                <EditableInfo
                  label="Decreased Amount"
                  value={formData.decrease_amount}
                  isEditing={isEditing}
                  onChange={(value) =>
                    handleInputChange("decrease_amount", value)
                  }
                  type="number"
                />
              </div>

              {/* Customer Info */}
              <Section title="Customer Info">
                <Info label="Name" value={transaction.Customer?.fullname} />
                <Info
                  label="Phone No."
                  value={transaction.Customer?.phone_no}
                />
              </Section>

              {/* Product Info */}
              <Section title="Product Info">
                <Info
                  label="Product"
                  value={transaction.Product?.product_name?.toUpperCase()}
                />
                <Info label="Quantity" value={transaction.Product?.quantity} />
                <Info
                  label="Total Weight"
                  value={`${transaction.Product?.total_weight} gm`}
                />
              </Section>

              {/* Dates */}
              <Section title="Timeline">
                <Info
                  label="Pledged Date"
                  value={new Date(
                    transaction.pledged_date
                  ).toLocaleDateString()}
                />
                <EditableInfo
                  label="Due Date"
                  value={formData.due_date}
                  isEditing={isEditing}
                  onChange={(value) => handleInputChange("due_date", value)}
                  type="date"
                />
                <Info
                  label="Created At"
                  value={new Date(transaction.createdAt).toLocaleString()}
                />
                <Info
                  label="Updated At"
                  value={new Date(transaction.updatedAt).toLocaleString()}
                />
              </Section>

              {/* Notes */}
              <Section title="Notes">
                {isEditing ? (
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 resize-none"
                    rows="3"
                    placeholder="Add notes..."
                  />
                ) : (
                  <p className="text-sm text-gray-700">
                    {transaction.notes || "No notes"}
                  </p>
                )}
              </Section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Reusable info line (read-only)
const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-medium text-gray-800">{value ?? "-"}</p>
  </div>
);

// Editable info line
const EditableInfo = ({ label, value, isEditing, onChange, type = "text" }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    {isEditing ? (
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-gray-800"
      />
    ) : (
      <p className="text-sm font-medium text-gray-800">
        {type === "number" && value
          ? `Rs. ${Number(value).toLocaleString()}`
          : type === "date" && value
          ? new Date(value).toLocaleDateString()
          : value || "-"}
      </p>
    )}
  </div>
);

// Section wrapper
const Section = ({ title, children }) => (
  <div className="space-y-2">
    <h3 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-1">
      {title}
    </h3>
    <div className="grid grid-cols-2 gap-3">{children}</div>
  </div>
);

export default TransactionDrawer;
