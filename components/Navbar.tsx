import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        scrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          className={`glass-panel rounded-2xl flex items-center justify-between px-8 transition-all duration-500 mx-auto w-full max-w-[960px] ${
            scrolled ? 'h-[68px] bg-white/5' : 'h-[68px] bg-transparent border-transparent shadow-none'
          }`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo */}
          <Link to="/" className="text-2xl font-light tracking-[0.2em] uppercase text-stone-100 relative group">
            Mr_Shivam
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-stone-100 transition-all duration-300 group-hover:w-full opacity-50"></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-12">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`relative text-sm font-light tracking-widest uppercase transition-colors duration-300 ${
                  location.pathname === link.path ? 'text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="underline"
                    className="absolute -bottom-2 left-0 right-0 h-[1px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-stone-200"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-40 bg-black/80 flex items-center justify-center md:hidden"
          >
            <div className="flex flex-col space-y-8 text-center">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="text-3xl font-light tracking-widest text-stone-300 hover:text-white uppercase"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
