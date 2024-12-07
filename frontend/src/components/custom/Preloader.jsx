import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Preloader = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(); // Notify when loading is complete
    }, 3000); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 flex justify-center items-center bg-black text-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5, delay: 2 }}
    >
      <motion.div
        className="text-4xl font-bold"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 1.5, 1], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        Loading...
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
