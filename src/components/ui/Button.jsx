import React from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  onClick, 
  type = 'button',
  disabled = false,
  fullWidth = false,
  href = null,
  target = null,
  rel = null,
  ...props 
}) => {
  const baseClasses = 'btn d-inline-flex align-items-center justify-content-center fw-bold text-uppercase rounded-pill';
  
  const variantClasses = {
    primary: 'btn-primary text-black shadow-sm',
    secondary: 'btn-secondary text-white',
    outline: 'btn-outline-primary',
    ghost: 'btn-link text-decoration-none text-muted hover-primary',
  };

  const sizeClasses = {
    sm: 'btn-sm px-3 py-1 text-xs tracking-wider',
    md: 'px-4 py-2 text-sm tracking-wide',
    lg: 'px-5 py-3 h4 mb-0 tracking-widest',
  };

  const classes = classNames(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    { 'w-100': fullWidth },
    className
  );

  const motionProps = !disabled ? {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  } : {};

  if (href) {
    return (
      <motion.a 
        href={href} 
        className={classes} 
        target={target} 
        rel={rel}
        aria-disabled={disabled}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
