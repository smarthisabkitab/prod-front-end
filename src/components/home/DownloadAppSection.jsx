import { Apple, Play } from "lucide-react";
import { motion } from "framer-motion";

const DownloadAppSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative text-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-20 rounded-3xl shadow-lg border border-amber-100 mb-24 overflow-hidden"
    >
      {/* Animated Background Blob */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-rose-100 opacity-40 blur-3xl"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-amber-100 opacity-40 blur-3xl"
      />

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-extrabold text-amber-900 mb-4"
      >
        Get the GoldVault App
      </motion.h3>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        viewport={{ once: true }}
        className="text-amber-700 mb-10 max-w-2xl mx-auto leading-relaxed"
      >
        Manage your jewellery business anywhere with our mobile app. Available for both
        iOS and Android.
      </motion.p>

      {/* Store Buttons */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
        className="flex justify-center space-x-5"
      >
        {/* App Store */}
        <motion.a
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          href="#"
          className="flex items-center space-x-2 px-6 py-3 bg-black text-white rounded-xl shadow-md hover:bg-gray-900 transition"
        >
          <Apple size={22} /> <span className="font-medium">App Store</span>
        </motion.a>

        {/* Google Play */}
        <motion.a
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          href="#"
          className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition"
        >
          <Play size={22} /> <span className="font-medium">Google Play</span>
        </motion.a>
      </motion.div>

      {/* (Optional) Phone Mockup Preview */}
      {/* If you want, we can add a mockup image or animated phone illustration below */}
      {/* Example: */}
      {/* 
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-12 flex justify-center"
      >
        <img
          src="/mockups/app-preview.png"
          alt="App Preview"
          className="w-56 rounded-2xl shadow-xl"
        />
      </motion.div>
      */}
    </motion.section>
  );
};

export default DownloadAppSection;
