import React from "react";
import { motion as m } from "framer-motion";
const Loading = () => {
  const parentVariant = {
    visible: {},
    hidden: {},
  };
  const childrenVariant = {
    visible: {
      opacity: [0, 1],
      x: [2, 0],
      y: [2, 0],
      transition: {
        repeat: Infinity,
        duration: 1,
        repeatType: "reverse",
      },
    },
    hidden: {
      opacity: 0,
    },
  };
  return (
    <m.div
      variants={parentVariant}
      transition={{
        staggerChildren: 0.2,
      }}
      initial="hidden"
      animate="visible"
      className="w-full h-screen flex items-center justify-center font-[900] text-[22px] font-pixels absolute top-[-40px] z-[999]"
    >
      {Array.from("Loading...").map((word, index) => (
        <m.span key={index} variants={childrenVariant}>
          {word}
        </m.span>
      ))}
    </m.div>
  );
};

export default Loading;
