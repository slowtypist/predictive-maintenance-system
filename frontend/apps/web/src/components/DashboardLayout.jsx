import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Gauge, Zap, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const DashboardLayout = ({ children, engines, selectedEngineId, onSelectEngine }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Critical': return <AlertCircle className="w-4 h-4 text-destructive" />;
      case 'Caution': return <AlertCircle className="w-4 h-4 text-secondary" />;
      default: return <Zap className="w-4 h-4 text-primary" />;
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Gauge className="w-6 h-6 text-primary" />
          <span className="text-lg font-bold text-foreground tracking-wide">FLEET STATUS</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {engines.map((engine) => (
          <button
            key={engine.id}
            onClick={() => {
              onSelectEngine(engine.id);
              setIsMobileOpen(false);
            }}
            className={cn(
              "w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 border",
              selectedEngineId === engine.id
                ? "bg-primary/10 border-primary/50 text-primary glow-cyan"
                : "bg-card border-transparent text-muted-foreground hover:bg-card/80 hover:border-border"
            )}
          >
            <span className="font-medium">{engine.id}</span>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono">{Math.round(engine.currentRul)}%</span>
              {getStatusIcon(engine.status)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-80 border-r border-border bg-card/50 backdrop-blur-xl z-10">
        <SidebarContent />
      </aside>

      {/* Mobile Header & Sidebar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-border bg-background/90 backdrop-blur-lg z-40 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Gauge className="w-5 h-5 text-primary" />
          <span className="font-bold">FLEET STATUS</span>
        </div>
        <button onClick={() => setIsMobileOpen(true)} className="p-2 text-foreground">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-80 bg-card border-r border-border z-50"
            >
              <button 
                onClick={() => setIsMobileOpen(false)}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-16 md:pt-0 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="relative z-10 p-4 md:p-8 h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;