import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MoreVertical, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200"
    >
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2c-3.31 0-6 2.69-6 6v14" />
              <path d="M16 6c-2.21 0-4 1.79-4 4v12" />
              <path d="M8 10c-1.1 0-2 .9-2 2v10" />
            </svg>
          </div>
          <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-800">
            Vasu <span className="hidden sm:inline">Hair <span className="text-teal-600">Transplant</span></span> <span className="text-teal-600 sm:text-slate-800">Clinic</span>
          </span>
        </div>
        
        <div className="hidden xl:flex flex-1 items-center justify-end gap-6 text-sm font-medium text-slate-600 ml-4">
          <a href="#top" className="hover:text-teal-600 transition-colors shrink-0">Home</a>
          <a href="#results" className="hover:text-teal-600 transition-colors shrink-0">Transformation</a>
          <a href="#reviews" className="hover:text-teal-600 transition-colors shrink-0">Review</a>
          <a href="#doctor" className="hover:text-teal-600 transition-colors shrink-0">Doctor</a>
          <a href="#why-choose-us" className="hover:text-teal-600 transition-colors shrink-0">Why Choose Us</a>
          <a href="#process" className="hover:text-teal-600 transition-colors shrink-0">Process</a>
          <a href="#calculator" className="hover:text-teal-600 transition-colors shrink-0">Cost</a>
          <a href="#about" className="hover:text-teal-600 transition-colors shrink-0">Clinic</a>
          <a href="#contact" className="hover:text-teal-600 transition-colors shrink-0">Contact Us</a>
        </div>

        {/* Tablet Menu Button */}
        <div className="hidden sm:flex xl:hidden ml-auto items-center">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-600 hover:text-teal-600 transition-colors rounded-full hover:bg-slate-100"
          >
            {isMenuOpen ? <X size={24} /> : <MoreVertical size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="hidden sm:block xl:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col py-4 px-6 gap-4 text-sm font-medium text-slate-600">
              <a href="#top" onClick={() => setIsMenuOpen(false)} className="hover:text-teal-600 transition-colors">Home</a>
              <a href="#results" onClick={() => setIsMenuOpen(false)} className="hover:text-teal-600 transition-colors">Transformation</a>
              <a href="#reviews" onClick={() => setIsMenuOpen(false)} className="hover:text-teal-600 transition-colors">Review</a>
              <a href="#doctor" onClick={() => setIsMenuOpen(false)} className="hover:text-teal-600 transition-colors">Doctor</a>
              <a href="#why-choose-us" onClick={() => setIsMenuOpen(false)} className="hover:text-teal-600 transition-colors">Why Choose Us</a>
              <a href="#process" onClick={() => setIsMenuOpen(false)} className="hover:text-teal-600 transition-colors">Process</a>
              <a href="#calculator" onClick={() => setIsMenuOpen(false)} className="hover:text-teal-600 transition-colors">Cost</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-teal-600 transition-colors">Clinic</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-teal-600 transition-colors">Contact Us</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
