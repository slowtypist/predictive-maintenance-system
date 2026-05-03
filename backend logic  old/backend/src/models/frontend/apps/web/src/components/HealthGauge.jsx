import React from 'react';
import { motion } from 'framer-motion';

const HealthGauge = ({ rul }) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (rul / 100) * circumference;

  let color = 'hsl(var(--primary))'; // Cyan
  let status = 'Healthy';
  
  if (rul < 30) {
    color = 'hsl(var(--destructive))'; // Red
    status = 'Critical';
  } else if (rul <= 70) {
    color = 'hsl(var(--secondary))'; // Amber/Orange
    status = 'Caution';
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-card rounded-2xl border border-border">
      <h3 className="text-lg font-medium text-muted-foreground mb-4">Remaining Useful Life</h3>
      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-muted opacity-20"
          />
          {/* Progress circle */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            stroke={color}
            strokeWidth="12"
            fill="transparent"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ strokeDasharray: circumference }}
            className="drop-shadow-[0_0_8px_rgba(0,217,255,0.5)]"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <motion.span 
            className="text-4xl font-bold text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={rul}
          >
            {Math.round(rul)}%
          </motion.span>
        </div>
      </div>
      <div className="mt-6 text-center">
        <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Status</span>
        <div className="text-xl font-bold mt-1" style={{ color }}>{status}</div>
      </div>
    </div>
  );
};

export default HealthGauge;