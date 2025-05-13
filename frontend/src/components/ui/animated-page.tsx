import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedPageProps {
  children: ReactNode;
}

function AnimatedPage({ children }: AnimatedPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedPage;
