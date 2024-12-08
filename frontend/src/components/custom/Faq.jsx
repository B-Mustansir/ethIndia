import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQs = [
  {
    question: "How does the platform create different personas for each social media platform?",
    answer:
      "Our AI analyzes your existing content, communication style, and interactions across platforms to generate unique personas that maintain your core identity while adapting to each platform's specific tone and audience.",
  },
  {
    question: "Is my data secure when connecting social media accounts?",
    answer:
      "We use industry-leading encryption and blockchain technology to secure your social media connections. Your data is stored decentrally, giving you complete control and maximum privacy.",
  },
  {
    question: "Can I customize the AI-generated content before posting?",
    answer:
      "Absolutely! Our platform provides AI-generated content drafts that you can fully edit, refine, or completely rewrite. You have complete control over the final content.",
  },
  {
    question: "How does the blockchain-powered content oracle work?",
    answer:
      "The content oracle creates an on-chain profile of your digital persona, capturing your interests, communication style, and web3 interactions. This data can be used for personalized content creation and potential future autonomous portfolio management.",
  },
  {
    question: "Which social media platforms are supported?",
    answer:
      "Currently, we support LinkedIn, Twitter, Instagram, Telegram, YouTube, Warpcast, and 0xPPL. We're continuously adding more platforms based on user demand.",
  },
  {
    question: "How does the AI determine optimal posting times?",
    answer:
      "Our AI analyzes your historical engagement data, platform-specific trends, and audience interactions to recommend the most effective times for posting on each social media platform.",
  },
  {
    question: "What type of content can I create?",
    answer:
      "You can generate text posts, create content with images and videos, and schedule posts across multiple platforms. Our AI supports various content types and adapts to each platform's specific requirements.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a free trial that allows you to connect one social media platform and experience the core features of our AI-powered content creation tool.",
  },
  {
    question: "How does the web3 portfolio management work?",
    answer:
      "Based on your social media interactions and expressed interests in crypto assets, our AI can potentially create and manage an autonomous portfolio, tracking and investing in assets that align with your digital persona.",
  },
  {
    question: "Can I use this for personal and professional branding?",
    answer:
      "Definitely! Our platform is designed to help you maintain consistent yet platform-specific branding, whether you're building a personal network, a professional profile, or a web3 community presence.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-black text-white py-20 px-10" id="#faq">
      <motion.h2
        className="text-6xl font-semibold text-center mb-10 text-gray-200"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        FAQs
      </motion.h2>
      <motion.div
        className="space-y-10 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {FAQs.map((faq, index) => (
          <motion.div
            key={index}
            className="cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            {/* Question */}
            <div
              className="flex justify-between items-center pb-2 border-b border-gray-700 mb-4"
              onClick={() => toggleFAQ(index)}
            >
              <p className="text-lg font-medium">{faq.question}</p>
              <motion.span
                initial={{ rotate: 0 }}
                animate={{ rotate: activeIndex === index ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-xl font-medium"
              >
                +
              </motion.span>
            </div>

            {/* Answer */}
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-gray-400"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Faq;
