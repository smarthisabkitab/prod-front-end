import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const TransactionDrawer = ({ isOpen, onClose, transaction }) => {
  if (!transaction) return null;

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
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-900 text-xl font-semibold"
              >
                &times;
              </button>
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
                        Rs. {Number(transaction.given_amount).toLocaleString()}
                      </td>
                      <td className="px-4 py-2">{transaction.time_duration}</td>
                      <td className="px-4 py-2">{transaction.interest_rate}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Financial Info */}
              <div className="grid grid-cols-2 gap-4">
                <Info label="Calculated Interest" value={`Rs. ${transaction.calculated_interest}`} />
                <Info label="Pending Amount" value={`Rs. ${transaction.pending_amount}`} />
                <Info label="Received Interest" value={`Rs. ${transaction.received_interest}`} />
                <Info label="Additional Amount" value={`Rs. ${transaction.add_amount}`} />
                <Info label="Decreased Amount" value={`Rs. ${transaction.decrease_amount}`} />
              </div>

              {/* Customer Info */}
              <Section title="Customer Info">
                <Info label="Name" value={transaction.Customer?.fullname} />
                <Info label="Phone No." value={transaction.Customer?.phone_no} />
              </Section>

              {/* Product Info */}
              <Section title="Product Info">
                <Info label="Product" value={transaction.Product?.product_name?.toUpperCase()} />
                <Info label="Quantity" value={transaction.Product?.quantity} />
                <Info label="Total Weight" value={`${transaction.Product?.total_weight} gm`} />
              </Section>

              {/* Dates */}
              <Section title="Timeline">
                <Info
                  label="Pledged Date"
                  value={new Date(transaction.pledged_date).toLocaleDateString()}
                />
                <Info
                  label="Due Date"
                  value={transaction.due_date ? new Date(transaction.due_date).toLocaleDateString() : "-"}
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

              {/* Other */}
              {transaction.notes && (
                <Section title="Notes">
                  <p className="text-sm text-gray-700">{transaction.notes}</p>
                </Section>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Reusable info line
const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-medium text-gray-800">{value ?? "-"}</p>
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
