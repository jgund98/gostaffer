"use client";

import { motion } from "framer-motion";

/* Re-mounts on each route change → a subtle fade-up as you move
   between portal pages. */
export default function PortalTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
