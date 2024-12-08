import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import Logo from "../../assets/logo.png";

function Footer() {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-400, 0]);

  return (
    <div
      className=" bottom-0 w-[90%] border-t mx-auto h-fit overflow-hidden bg-black text-white"
      ref={container}
    >
      <motion.div
        className="h-full flex flex-col items-center gap-8 pt-8"
        style={{ y }}
      >
        <div className="flex flex-row gap-8 text-lg">
          <motion.a
            href="#"
            whileHover={{ scale: 1.1, x: 5 }}
            className="hover:text-blue-400 transition"
          >
            Home
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.1, x: 5 }}
            className="hover:text-blue-400 transition"
          >
            Features
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.1, x: 5 }}
            className="hover:text-blue-400 transition"
          >
            Pricing
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.1, x: 5 }}
            className="hover:text-blue-400 transition"
          >
            About Us
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.1, x: 5 }}
            className="hover:text-blue-400 transition"
          >
            Contact
          </motion.a>
        </div>

        <div className="flex flex-row gap-8 mb-12">
          <motion.a
            href="#"
            whileHover={{ scale: 1.3 }}
            className="hover:text-pink-500 transition"
          >
            <Instagram className="h-8 w-8" />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.3 }}
            className="hover:text-blue-500 transition"
          >
            <Linkedin className="h-8 w-8" />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.3 }}
            className="hover:text-blue-400 transition"
          >
            <Twitter className="h-8 w-8" />
          </motion.a>
        </div>

        {/* Large Text */}
        <div className="bottom-0 transform pb-8">
          <img src={Logo} alt="" />
        </div>
      </motion.div>
    </div>
  );
}

export default Footer;
