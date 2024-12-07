import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaLink, FaBrain, FaPenFancy, FaCalendarAlt } from 'react-icons/fa';

const steps = [
  {
    icon: <FaLink />,
    title: 'Connect Your Social Platforms',
    description: 'Link all your social media accounts to get started.',
  },
  {
    icon: <FaBrain />,
    title: 'AI Analyzes Your Digital Persona',
    description: 'Our AI evaluates your online presence for insights.',
  },
  {
    icon: <FaPenFancy />,
    title: 'Create Customized Content',
    description: 'Receive content tailored to your style and audience.',
  },
  {
    icon: <FaCalendarAlt />,
    title: 'Publish or Schedule',
    description: 'Easily publish immediately or schedule for later.',
  },
];

const HorizontalScroll = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <section ref={containerRef} className="h-[300vh] bg-gray-900 text-white flex flex-col items-center justify-center">
      <motion.h2
        className="text-9xl font-bold mb-20"
        style={{ y: titleY }}
      >
        How It Works
      </motion.h2>
      <div className="w-full h-screen overflow-hidden flex items-center justify-center">
        <motion.div className="flex space-x-10" style={{ x }}>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="min-w-[80vw] md:min-w-[40vw] bg-gray-800 rounded-lg shadow-lg p-10 flex flex-col items-center text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-6xl text-blue-400 mb-6">{step.icon}</div>
              <h3 className="text-4xl font-semibold mb-4">{step.title}</h3>
              <p className="text-lg text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScroll;
