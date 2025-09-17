import { Crown, Sparkles, TrendingUp } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
    },
  },
};

const badgeVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: { scale: 0.98 },
};

const gradientTextVariants = {
  initial: {
    backgroundPosition: "0% 50%",
    backgroundSize: "200% 200%",
  },
  animate: {
    backgroundPosition: "100% 50%",
    transition: {
      duration: 4,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const Hero = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleDashboardClick = () => navigate("/dashboard");

  return (
    <motion.div
      className="text-center max-w-4xl mx-auto mb-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="inline-flex items-center space-x-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full mb-8 shadow-sm"
        variants={badgeVariants}
      >
        <Crown className="w-4 h-4" />
        <span className="text-sm font-medium">
          Premium Jewellery Management
        </span>
      </motion.div>

      <motion.h1
        className="text-5xl md:text-6xl font-bold text-amber-900 mb-6 leading-tight"
        variants={itemVariants}
      >
        Elevate Your{" "}
        <motion.span
          className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #f59e0b, #f97316, #ea580c)",
            backgroundSize: "200% auto",
          }}
          variants={gradientTextVariants}
          initial="initial"
          animate="animate"
        >
          Jewellery Business
        </motion.span>
      </motion.h1>

      <motion.p
        className="text-xl text-amber-700 mb-12 leading-relaxed"
        variants={itemVariants}
      >
        Streamline operations, track inventory with precision, and unlock growth
        opportunities with our comprehensive jewellery management platform.
      </motion.p>

      {/* CTA Button */}
      <motion.div className="mt-8" variants={itemVariants}>
        {!isAuthenticated ? (
          <motion.a
            href="/register"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-lg font-semibold rounded-xl shadow-lg"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Sparkles className="w-5 h-5" />
            <span>Start Free Trial</span>
          </motion.a>
        ) : (
          <motion.button
            onClick={handleDashboardClick}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-lg font-semibold rounded-xl shadow-lg"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <TrendingUp className="w-5 h-5" />
            <span>Go to Dashboard</span>
          </motion.button>
        )}
      </motion.div>

      {/* Animated decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-16 bg-amber-200 rounded-full opacity-20 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-40 right-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-12 h-12 bg-amber-300 rounded-full opacity-10 blur-lg"
        animate={{
          y: [0, -20, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </motion.div>
  );
};

export default Hero;
