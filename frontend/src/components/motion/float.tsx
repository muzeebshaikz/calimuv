"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface FloatProps {
  children: ReactNode;
  className?: string;
  /** peak vertical travel in px */
  distance?: number;
  /** seconds for a full up-down cycle */
  duration?: number;
  delay?: number;
}

/** Gently floats its children up and down forever (parallax feel). */
export function Float({
  children,
  className,
  distance = 14,
  duration = 5,
  delay = 0,
}: FloatProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: [-distance, distance, -distance] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}
