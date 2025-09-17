import { Shield, Lock, EyeOff, Database } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Lock, text: "End-to-End Encryption" },
  { icon: EyeOff, text: "Privacy by Design" },
  { icon: Database, text: "Secure Data Storage" },
];

const SecuritySection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="text-center bg-amber-50 rounded-3xl p-10 border border-amber-100 mb-16 shadow-md relative overflow-hidden"
    >
      {/* Background Circle Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber-100 opacity-40 blur-3xl"
      />
      
      {/* Badge with Shield */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
        className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full mb-6 shadow-lg hover:shadow-xl transition"
      >
        <Shield className="w-6 h-6 text-amber-600" />
        <span className="text-amber-700 font-semibold">Enterprise-Grade Security</span>
      </motion.div>

      {/* Heading */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-amber-900 mb-4"
      >
        Your Data is Protected
      </motion.h3>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        viewport={{ once: true }}
        className="text-amber-700 max-w-2xl mx-auto mb-8 leading-relaxed"
      >
        We employ bank-level security measures to ensure your valuable inventory data 
        and business information remain safe and confidential.
      </motion.p>

      {/* Features Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
      >
        {features.map((item, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center hover:shadow-md transition"
          >
            <item.icon className="w-8 h-8 text-amber-600 mb-3" />
            <p className="text-amber-800 font-medium">{item.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default SecuritySection;
