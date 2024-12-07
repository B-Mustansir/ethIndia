import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { cn } from "../../lib/utils";
import Marquee from "../ui/Marquee";

const reviews1 = [
  {
    name: "Alice Johnson",
    username: "@alice",
    body: "“This platform has revolutionized how I manage my social media. It’s intuitive and efficient!”",
    img: "https://avatar.vercel.sh/alice",
  },
  {
    name: "Mark Spencer",
    username: "@mark",
    body: "“The AI-driven insights have been a game changer for my online presence. Highly recommend!”",
    img: "https://avatar.vercel.sh/mark",
  },
  {
    name: "Emily White",
    username: "@emily",
    body: "“Amazing! I can’t imagine going back to my old content strategies after using this tool.”",
    img: "https://avatar.vercel.sh/emily",
  },
];

const reviews2 = [
  {
    name: "Liam Davis",
    username: "@liam",
    body: "“This platform ensures my content reaches the right audience at the right time.”",
    img: "https://avatar.vercel.sh/liam",
  },
  {
    name: "Sophia Brown",
    username: "@sophia",
    body: "“I’m amazed by the seamless integration and data-driven recommendations!”",
    img: "https://avatar.vercel.sh/sophia",
  },
  {
    name: "James Wilson",
    username: "@james",
    body: "“The scheduling feature saves me so much time. A must-have for marketers!”",
    img: "https://avatar.vercel.sh/james",
  },
];

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <motion.figure
      className={cn(
        "relative h-64 w-96 cursor-pointer overflow-hidden rounded-lg border border-gray-700 dark:border-gray-200 p-6 shadow-lg bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:bg-gradient-to-r dark:from-gray-200 dark:via-gray-100 dark:to-gray-200"
      )}
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="flex flex-row items-center gap-4">
        <img
          className="rounded-full border-2 border-gray-300 h-16 w-16"
          alt=""
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-lg font-bold text-white dark:text-black">
            {name}
          </figcaption>
          <p className="text-sm font-medium text-gray-400 dark:text-gray-600">
            {username}
          </p>
        </div>
      </div>
      <blockquote className="mt-4 text-md leading-relaxed text-gray-200 dark:text-gray-700 italic">
        {body}
      </blockquote>
    </motion.figure>
  );
};

export default function Testimonials() {
  const leftSectionRef = useRef(null);
  const isInView = useInView(leftSectionRef, { once: true });
  const { scrollYProgress } = useScroll();
  const headingY = useTransform(scrollYProgress, [0, 1], [-50, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <motion.div
      className="h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Left Section */}
      <motion.div
        ref={leftSectionRef}
        className={`w-1/3 flex flex-col items-start justify-center px-10 ${
          isInView ? "opacity-100" : "opacity-0"
        }`}
        style={{ y: headingY }}
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          className="text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          What Our Customers Say
        </motion.h2>
        <motion.p
          className="text-lg text-gray-400 leading-relaxed"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        >
          Discover how our platform is making a difference for individuals and
          businesses alike. These testimonials highlight our commitment to
          innovation and excellence.
        </motion.p>
      </motion.div>

      {/* Right Section: Vertical Marquee */}
      <motion.div
        className="w-2/3 h-full flex items-center justify-center overflow-hidden"
        style={{ y: contentY }}
      >
        <div className="flex flex-row gap-4">
          <Marquee vertical className="[--duration:25s]">
            {reviews1.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </Marquee>
          <Marquee vertical className="[--duration:20s]">
            {reviews2.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </Marquee>
        </div>
      </motion.div>
    </motion.div>
  );
}
