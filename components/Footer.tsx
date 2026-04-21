import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, ArrowUp, Mail, Lock, MessageCircle, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { NAV_LINKS } from '../constants';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0c0a09] pt-24 pb-12 px-6 border-t border-white/5 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] bg-stone-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-50%] right-[-20%] w-[600px] h-[600px] bg-stone-800/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-5">
            <Link to="/" className="text-2xl font-light tracking-[0.2em] uppercase text-stone-100 relative inline-block group">
              Mr_Shivam
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-stone-100 transition-all duration-300 group-hover:w-full opacity-50"></span>
            </Link>
            <p className="mt-8 text-stone-500 font-light max-w-sm leading-relaxed text-sm">
              Crafting visual narratives that transcend the ordinary. A meticulous approach to rhythm, color, and emotion for brands and visionaries.
            </p>
            <div className="flex space-x-6 mt-8">
               <a href="https://www.instagram.com/mr_home_decor77/" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-white transition-colors"><Instagram size={20} strokeWidth={1.5} /></a>
               <a href="https://wa.me/919818087469" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-green-500 transition-colors"><MessageCircle size={20} strokeWidth={1.5} /></a>
               <a href="mailto:shivam.one76@gmail.com" className="text-stone-500 hover:text-white transition-colors"><Mail size={20} strokeWidth={1.5} /></a>
               <a href="https://www.youtube.com/@mrshivam_666" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-white transition-colors"><Youtube size={20} strokeWidth={1.5} /></a>
               <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-white transition-colors"><Linkedin size={20} strokeWidth={1.5} /></a>
            </div>
          </div>

          {/* Sitemaps */}
          <div className="md:col-span-3">
             <h4 className="text-stone-100 text-xs uppercase tracking-[0.2em] font-bold mb-8">Explore</h4>
             <ul className="space-y-4">
                {NAV_LINKS.map(link => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-stone-500 hover:text-orange-400 transition-colors text-sm font-light tracking-wide uppercase">
                      {link.name}
                    </Link>
                  </li>
                ))}
             </ul>
          </div>

          {/* Contact / CTA */}
          <div className="md:col-span-4">
             <h4 className="text-stone-100 text-xs uppercase tracking-[0.2em] font-bold mb-8">Get in Touch</h4>
             <p className="text-stone-500 font-light text-sm mb-6">
               Have a project in mind? Let's build something cinematic together.
             </p>
             <Link to="/contact" className="inline-flex items-center space-x-2 text-stone-300 hover:text-white transition-colors border-b border-stone-700 hover:border-white pb-1">
               <Mail size={16} />
               <span className="text-sm uppercase tracking-widest">Start a conversation</span>
             </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-stone-600 uppercase tracking-widest font-medium">
          <div className="flex items-center gap-4 md:gap-6 flex-col md:flex-row mb-4 md:mb-0">
             <p>© {new Date().getFullYear()} Mr. Shivam. All rights reserved.</p>
             <Link to="/admin" className="flex items-center gap-1.5 hover:text-stone-400 transition-colors opacity-40 hover:opacity-100 px-2 py-1 rounded hover:bg-white/5">
               <Lock size={10} />
               <span className="text-[10px]">Admin</span>
             </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link to="/services" className="hover:text-stone-400 transition-colors">Privacy Policy</Link>
            <button onClick={scrollToTop} className="flex items-center space-x-2 hover:text-stone-400 transition-colors group">
              <span>Back to Top</span>
              <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;