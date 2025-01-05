import { motion } from "motion/react";

interface SummariesContainerProps {
  children: React.ReactNode;
  className?: string;
  initial?: { opacity: number; x?: number; y?: number };
  animate?: { opacity: number; x?: number; y?: number };
  transition?: { duration: number; ease: string };
}

function SummariesContainer({
  children,
  className,
  initial,
  animate,
  transition,
}: SummariesContainerProps) {
  return (
    <motion.div
      className={`px-5 py-8 rounded-lg bg-white overflow-hidden ${className}`}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

export default SummariesContainer;
