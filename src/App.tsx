/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

const VoidwallzLogo = () => (
  <motion.svg
    width="180"
    height="180"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-2xl"
    initial="hidden"
    animate="visible"
  >
    {/* Bone Outline Rectangle */}
    <motion.rect
      x="25"
      y="50"
      width="150"
      height="100"
      fill="none"
      stroke="#F6EFD2"
      strokeWidth="6"
      style={{ transformOrigin: "100px 100px" }}
      variants={{
        hidden: { opacity: 0, rotate: 0, scale: 0.8 },
        visible: { 
          opacity: 1, 
          rotate: 12, 
          scale: 1, 
          transition: { duration: 1, ease: "easeOut" } 
        }
      }}
    />

    {/* Red Solid + V Group */}
    <motion.g
      style={{ transformOrigin: "100px 100px" }}
      variants={{
        hidden: { opacity: 0, rotate: 0, scale: 0.8 },
        visible: { 
          opacity: 1, 
          rotate: -6, 
          scale: 1, 
          transition: { duration: 1, delay: 0.2, ease: "easeOut" } 
        }
      }}
    >
      <rect x="20" y="55" width="160" height="90" fill="#B83030" />
      
      {/* The "V" */}
      <motion.path
        d="M 55 75 H 85 C 85 85, 88 95, 94 110 L 100 122 L 106 110 C 112 95, 115 85, 115 75 H 145 C 135 90, 122 115, 112 130 C 105 142, 95 142, 88 130 C 78 115, 65 90, 55 75 Z"
        fill="#F6EFD2"
        stroke="#000000"
        strokeWidth="2"
        strokeLinejoin="round"
        style={{ transformOrigin: "100px 100px" }}
        variants={{
          hidden: { opacity: 0, scale: 0.5 },
          visible: { 
            opacity: 1, 
            scale: 1, 
            transition: { duration: 0.8, delay: 0.6, ease: "backOut" } 
          }
        }}
      />
    </motion.g>
  </motion.svg>
);

export default function App() {
  const title = "VOIDWALLZ";
  const subtitle = "Coming Soon";

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 1.0,
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 2.0,
        staggerChildren: 0.05,
      },
    },
  };

  const subtitleLetterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-void p-6 overflow-hidden relative">
      {/* Subtle ambient background glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-void-red/5 rounded-full blur-[100px] pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="text-center space-y-2 relative z-10 flex flex-col items-center">
        <VoidwallzLogo />

        <motion.h1
          className="font-heading text-7xl md:text-9xl tracking-wider text-bone drop-shadow-lg flex justify-center mt-4"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          {title.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="font-sans text-lg md:text-2xl text-dust uppercase tracking-[0.3em] flex justify-center mt-4"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          {subtitle.split("").map((char, index) => (
            <motion.span key={index} variants={subtitleLetterVariants}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.p>

        <div className="pt-8 flex justify-center w-full">
          <motion.div
            className="h-1 bg-void-red rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "6rem", opacity: 1 }}
            transition={{ duration: 1, delay: 2.8, ease: "easeOut" }}
          />
        </div>
      </div>
    </main>
  );
}
