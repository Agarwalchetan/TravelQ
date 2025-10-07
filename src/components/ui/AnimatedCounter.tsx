import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useSpring, useTransform, MotionValue, useMotionValue } from 'framer-motion';

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  className?: string;
  formatter?: (value: number) => string;
}

function useAnimatedCounter(value: MotionValue<number>) {
  const spring = useSpring(value, {
    damping: 50,
    stiffness: 100,
    mass: 0.5,
  });

  return spring;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from,
  to,
  duration = 2,
  className,
  formatter = (value) => Math.round(value).toString(),
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const count = useTransform(
    useAnimatedCounter(useMotionValue(inView ? to : from)),
    (value) => formatter(value)
  );

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {count}
    </motion.span>
  );
};