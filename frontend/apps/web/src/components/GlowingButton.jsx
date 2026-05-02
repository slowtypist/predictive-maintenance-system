import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const GlowingButton = ({ 
  children, 
  onClick, 
  className, 
  variant = 'primary',
  size = 'default',
  ...props 
}) => {
  const baseStyles = "relative font-semibold rounded-lg transition-all duration-300 active:scale-[0.98]";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:brightness-110 glow-cyan hover:glow-cyan-strong",
    outline: "border-2 border-primary text-primary hover:bg-primary/10 hover:glow-cyan",
    ghost: "text-primary hover:bg-primary/10"
  };

  const sizes = {
    default: "px-6 py-3 text-base",
    sm: "px-4 py-2 text-sm",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default GlowingButton;