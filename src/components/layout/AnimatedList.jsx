 
import { motion } from "framer-motion";
import React from "react";

const AnimatedList = ({ children, className }) => {
  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    <motion.ul
      variants={listVariants}
      initial="hidden"
      animate="show"
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.li key={index} variants={itemVariants}>
          {child}
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default AnimatedList;