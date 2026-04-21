import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { Activity, Aperture, Layers, Film, Music, Mic2, Lightbulb, ChevronRight, Monitor } from 'lucide-react';

const icons = [Film, Aperture, Layers, Music, Monitor, Lightbulb];

const Services: React.FC = () => {
  const { services } = useContent();
  const [activeId, setActiveId] = useState<string>(services.length > 0 ? services[0].id : '');

  const activeService = services.find(s => s.id === activeId) || services[0];
  const ActiveIcon = activeService ? icons[parseInt(activeService.id) - 1] || Film : Film;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-12 flex items-center justify-center relative overflow-hidden bg-[#0c0a09]">
      
      {/* Liquid Gradient Background */}
      <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            x: ["-10%", "10%", "-10%"],
            y: ["-10%", "10%", "-10%"],
            rotate: [0, 45, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-orange-900/20 rounded-full blur-[120px] opacity-60 mix-blend-screen"
        />
        <motion.div 
          animate={{ 
            x: ["10%", "-10%", "10%"],
            y: ["10%", "-20%", "10%"],
            rotate: [0, -30, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-orange-500/10 rounded-full blur-[140px] opacity-50 mix-blend-screen"
        />
        <motion.div 
          animate={{ 
            x: ["-20%", "20%", "-20%"],
            y: ["10%", "-10%", "10%"],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[20%] w-[50vw] h-[50vw] bg-orange-300/5 rounded-full blur-[150px]"
        />
      </div>

      <div className="w-full max-w-6xl relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 lg:h-[600px] items-center lg:items-stretch">
        
        {/* Left: Navigation Glass Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-sm lg:w-1/3 h-full"
        >
          <div className="glass-panel h-full rounded-[2.5rem] p-6 md:p-8 flex flex-col border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-2xl bg-white/[0.03]">
             <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
             
             <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-stone-500 mb-8 pl-4">Expertise</h2>
             
             <div className="flex flex-col space-y-2 relative z-10">
               {services.map((service, index) => {
                 const Icon = icons[index % icons.length];
                 const isActive = activeId === service.id;

                 return (
                   <button
                     key={service.id}
                     onClick={() => setActiveId(service.id)}
                     className={`relative group w-full flex items-center p-4 rounded-2xl transition-all duration-300 outline-none ${isActive ? 'text-black' : 'text-stone-300 hover:text-white'}`}
                   >
                     {/* Active Pill Background */}
                     {isActive && (
                       <motion.div
                         layoutId="activePill"
                         className="absolute inset-0 bg-stone-100 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                         transition={{ type: "spring", stiffness: 300, damping: 30 }}
                       />
                     )}
                     
                     {/* Hover Effect for non-active */}
                     {!isActive && (
                       <div className="absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                     )}

                     <div className="relative z-10 flex items-center justify-between w-full">
                       <div className="flex items-center gap-4">
                         <Icon size={20} strokeWidth={isActive ? 2 : 1.5} className={isActive ? "text-stone-900" : "text-stone-400 group-hover:text-white"} />
                         <span className={`text-lg font-medium tracking-wide ${isActive ? "font-bold" : "font-light"}`}>
                           {service.title}
                         </span>
                       </div>
                     </div>
                   </button>
                 );
               })}
             </div>

             <div className="mt-auto pl-4 pt-8">
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse"></div>
                 <span className="text-xs text-stone-500 uppercase tracking-widest">Available for Booking</span>
               </div>
             </div>
          </div>
        </motion.div>

        {/* Right: Content Popup Panel */}
        <div className="w-full lg:flex-1 h-full relative min-h-[400px]">
          <AnimatePresence mode="wait">
             {activeService && (
               <motion.div
                 key={activeService.id}
                 initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                 animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                 exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                 transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                 className="h-full glass-panel rounded-[2.5rem] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden bg-black/20"
               >
                 {/* Decorative background glow inside the card */}
                 <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-stone-500/10 rounded-full blur-[80px]"></div>
                 
                 <div className="h-full flex flex-col justify-center relative z-10">
                    <div className="mb-8 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
                       <ActiveIcon size={32} className="text-stone-100" strokeWidth={1} />
                    </div>

                    <motion.h1 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-4xl md:text-5xl font-light text-white mb-6 font-serif italic"
                    >
                      {activeService.title}
                    </motion.h1>

                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-lg md:text-xl text-stone-400 font-light leading-relaxed max-w-lg mb-10"
                    >
                      {activeService.description}
                    </motion.p>

                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                       <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                          <span className="text-xs text-stone-300 uppercase tracking-widest">Industry Standard</span>
                       </div>
                       <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                          <span className="text-xs text-stone-300 uppercase tracking-widest">Fast Turnaround</span>
                       </div>
                    </motion.div>

                    <motion.button 
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ delay: 0.4 }}
                       className="mt-12 flex items-center gap-2 text-sm uppercase tracking-widest font-bold text-stone-200 group w-max"
                    >
                       <span>View Related Projects</span>
                       <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                          <ChevronRight size={16} />
                       </div>
                    </motion.button>
                 </div>
               </motion.div>
             )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Services;
