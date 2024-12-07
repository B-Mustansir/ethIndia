import Navbar from "./Navbar";
import BorderButton from "../ui/BorderButton";
import { motion } from "framer-motion";
import FillButton from "../ui/FillButton";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <div className="dark">
      <Navbar />
      <div className="h-[50rem] w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <motion.div
          className="flex flex-col justify-center items-center space-y-4 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={childVariants}>
            <BorderButton text="✨ Generate Trending Content" />
          </motion.div>

          <motion.p
            className="text-7xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400 py-1"
            variants={childVariants}
          >
            <span className="text-blue-500">AI-Powered</span> Social Media Genius:
          </motion.p>

          <motion.p
            className="text-7xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-blue-300 to-blue-600 py-1"
            variants={childVariants}
          >
            Unleash Your <span className="text-purple-500">Digital Persona</span>
          </motion.p>

          <motion.p
            className="text-2xl font-bold sm:text-xl relative z-20 text-slate-100"
            variants={childVariants}
          >
            Seamlessly manage multiple social platforms with AI-driven content creation and persona optimization.
          </motion.p>

          <motion.div variants={childVariants}>
            <FillButton text="Start Your Social AI Journey →" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
