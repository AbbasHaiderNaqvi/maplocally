"use client"
import React, { useState } from 'react';
import { motion } from "framer-motion";
import FaqSection from "./components/FAQ's/faq";
import Feedback from "./components/Feedback/Feedback";
import Hero from "./components/Hero/HeroSection";
import MemorablePlace from "./components/MemorablePlace/MemorablePlace";
import Post from "./components/BestOfNewYork/Post";
import Feature from "./components/Featured/Feature";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div className="max-w-6xl mx-auto px-4">
      <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
        <Hero onSearch={setSearchValue}/>
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
        <Post  search={searchValue} />
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
        <Feature />
      </motion.div>

      {/* <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
        <MemorablePlace />
      </motion.div> */}

      <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
        <Feedback />
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
        <FaqSection />
      </motion.div>
    </div>
  );
}
