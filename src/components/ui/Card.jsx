import React from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className,
  onClick,
  hoverable = true,
  isAnimated = true,
  ...props
}) => {
  const isFirefox = typeof window !== 'undefined' && navigator.userAgent.toLowerCase().includes('firefox');
  const shouldAnimate = isAnimated && !isFirefox;

  const cardClasses = classNames(
    'card-custom position-relative h-100 overflow-hidden',
    { 'cursor-pointer': !!onClick },
    className
  );

  if (!shouldAnimate) {
    return (
      <div className={cardClasses} onClick={onClick} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cardClasses}
      onClick={onClick}
      whileHover={hoverable ? { y: -2, borderColor: '#55ff55' } : {}}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      viewport={{ once: true }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
