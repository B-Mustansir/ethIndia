import React from "react";
import { motion } from "framer-motion";
import F1 from "../../assets/F1.png"
import F2 from "../../assets/F2.png"
import F3 from "../../assets/F3.png"

function Features() {
  const text = "Elevate Your Social Media Strategy with Intelligent Automation";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2, // Add delay before staggering starts
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeIn", duration: 0.9 },
    },
  };

  const blockVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 }, // Add delay
    },
  };

  const textBlockVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.5 }, // Add delay
    },
  };

  return (
    <div
      className="flex flex-col justify-center items-center border-t rounded-t-full relative"
      style={{
        borderTop: "1px solid #6C63FF",
        boxShadow: "0 0 50px 20px rgba(108, 99, 255, 0.5)",
      }}
    >
      {/* Main Animated Heading */}
      <motion.div
        className="text-9xl font-extralight px-16 py-14 mt-40 text-slate-300 flex flex-wrap justify-center tracking-wide gap-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }} // Trigger when 50% in view
      >
        {text.split(" ").map((word, index) => (
          <motion.span
            key={index}
            className="inline-block mx-2"
            variants={wordVariants}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>

      {/* Feature Blocks */}
      <div className="flex flex-col justify-center items-center my-12 gap-16">
        {/* Feature Block 1 */}
        <motion.div
          className=" bg-purple-300 w-[75rem] h-[32rem] rounded-xl flex flex-row-reverse shadow-lg"
          variants={blockVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger when 30% in view
        >
          <motion.div
            className="w-[50%] px-16 py-10 flex flex-col justify-center items-start"
            variants={textBlockVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-3xl font-bold pb-6">
              Your Digital Essence, Secured On-Chain Forever
            </p>
            <p className="text-lg leading-relaxed">
              Transform your social data into a decentralized, immutable digital
              persona. Create an autonomous web3 portfolio that learns and
              adapts based on your social interactions and crypto interests.
            </p>
          </motion.div>
          <motion.div
            className="flex justify-center items-center w-[50%] px-8"
            variants={blockVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src={F1}
              alt="Feature 1"
              className="w-[85%] h-auto rounded-lg"
            />
          </motion.div>
        </motion.div>

        {/* Feature Block 2 */}
        <motion.div
          className=" bg-green-300 w-[75rem] h-[32rem] rounded-xl flex flex-row shadow-lg"
          variants={blockVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="w-[50%] px-16 py-10 flex flex-col justify-center items-start"
            variants={textBlockVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-3xl font-bold pb-6">
              AI-Driven Content: Precision, Timing, Perfection
            </p>
            <p className="text-lg leading-relaxed">
              Intelligently analyze and process your content across text,
              images, and videos. Automatically optimize posting times for
              maximum engagement on each unique platform.
            </p>
          </motion.div>
          <motion.div
            className="flex justify-center items-center w-[50%] px-8"
            variants={blockVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src={F2}
              alt="Feature 2"
              className="w-[85%] h-auto rounded-lg"
            />
          </motion.div>
        </motion.div>

        {/* Feature Block 3 */}
        <motion.div
          className="bg-blue-400 w-[75rem] h-[32rem] rounded-xl flex flex-row-reverse shadow-lg"
          variants={blockVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="w-[50%] px-16 py-10 flex flex-col justify-center items-start"
            variants={textBlockVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-3xl font-bold pb-6">
              One Identity, Multiple Voices: AI-Powered Social Persona
            </p>
            <p className="text-lg leading-relaxed">
              Automatically craft unique communication styles for each social
              platform. Seamlessly switch between professional LinkedIn tone and
              casual Twitter banter while maintaining your core identity.
            </p>
          </motion.div>
          <motion.div
            className="flex justify-center items-center w-[50%] px-8"
            variants={blockVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src={F3}
              alt="Feature 3"
              className="w-[85%] h-auto rounded-lg"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Features;
