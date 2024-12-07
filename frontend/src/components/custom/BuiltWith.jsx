import React from "react";
import Marquee from "../ui/Marquee";
import { motion } from "framer-motion";
import Base from "../../assets/Base.png";
import Coinbase from "../../assets/Coinbase.png";
import Citrea from "../../assets/Citrea.png";
import Okto from "../../assets/Okto.png";
import Walrus from "../../assets/Walrus.png";

function BuiltWith() {
  const items = [
    {
      name: "Base",
      icon: Base,
      color: "#0052FF",
    },
    {
      name: "Coinbase Developer Platform",
      icon: Coinbase,
      color: "#0056FF",
    },
    {
      name: "Polygon",
      icon: "https://cryptologos.cc/logos/polygon-matic-logo.svg",
      color: "#8247E5",
    },
    {
      name: "Citrea",
      icon: Citrea,
      color: "#FFD700",
    },
    {
      name: "Walrus",
      icon: Walrus,
      color: "#4CAF50",
    },
    {
      name: "Okto",
      icon: Okto,
      color: "#F7931A",
    },
  ];

  return (
    <div className="w-full bg-black text-white py-20">
      {/* Section Title */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-400 to-blue-500 animate-gradient">
          Built With
        </h2>
        <p className="text-lg mt-4 text-gray-400">
          Powered by cutting-edge technologies and tools
        </p>
      </motion.div>

      {/* Marquee Section */}
      <Marquee className="[--duration:20s]">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-center justify-center gap-4 mx-8 p-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <motion.img
              src={item.icon}
              alt={`${item.name} Logo`}
              className="h-16 w-16 rounded-lg shadow-lg"
              whileHover={{
                scale: 1.3,
                rotate: 10,
                boxShadow: "0px 0px 20px 4px rgba(255, 255, 255, 0.5)",
              }}
              transition={{ type: "spring", stiffness: 200 }}
            />
            <motion.p
              className="text-2xl font-bold"
              style={{
                color: item.color,
              }}
              whileHover={{ scale: 1.2, rotate: 2 }}
            >
              {item.name}
            </motion.p>
          </motion.div>
        ))}
      </Marquee>
    </div>
  );
}

export default BuiltWith;
