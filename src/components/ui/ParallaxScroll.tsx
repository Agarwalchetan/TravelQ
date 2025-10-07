import React, { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useMeasure from 'react-use-measure';

interface ParallaxScrollProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

export const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  children,
  offset = 50,
  className,
}) => {
  const [ref, bounds] = useMeasure();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-offset, offset]
  );

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
};