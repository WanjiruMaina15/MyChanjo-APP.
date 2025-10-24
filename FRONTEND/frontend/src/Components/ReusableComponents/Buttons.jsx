import React from "react";
import { motion } from "framer-motion";

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  ...props
}) {
  const baseStyles =
    "rounded-2xl font-lato px-5 py-2 text-base transition-colors duration-300 ease-in-out";

  const colorStyles =
    "bg-[#b57edc] text-[#0b2545] hover:bg-[#9b5edc] focus:ring-2 focus:ring-[#b57edc] focus:outline-none";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${colorStyles} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
