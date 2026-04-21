import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Play, SkipForward, SkipBack } from 'lucide-react';
import { Link } from 'react-router-dom';

const PHONE_VIDEOS = [
  "https://www.youtube.com/embed/vDhl8f0jFiI?si=YeHWskoNzDPCuFVW",
  "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-red-lights-in-the-dark-2549-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-white-sand-beach-background-1564-large.mp4"
];

const TimelineSegment: React.FC = () => (
  <div className="flex-shrink-0 w-[100vw] md:w-[1400px] relative px-4 box-border">
     {/* Time Ruler */}
     <div className="flex justify-between w-full mb-3 border-b border-white/5 pb-2">
         {Array.from({ length: 14 }).map((_, i) => (
             <span key={i} className="font-mono text-[10px] text-stone-600 select-none opacity-70">
                 00:00:{String((i * 5) + 10).padStart(2, '0')}
             </span>
         ))}
     </div>

     <div className="flex flex-col gap-3 opacity-90">
         {/* Track V3 (Effects) */}
         <div className="h-10 w-full bg-white/[0.02] border border-white/5 rounded-sm relative overflow-hidden">
            <div className="absolute top-1 bottom-1 left-[15%] w-[18%] bg-purple-900/10 border border-purple-500/20 rounded-sm flex items-center justify-center">
                 <motion.div 
                   variants={{ hidden: { scale: 0, rotate: 0 }, visible: { scale: 1, rotate: 45 } }} 
                   className="w-1.5 h-1.5 bg-purple-400" 
                 />
            </div>
            <div className="absolute top-1 bottom-1 left-[45%] w-[10%] bg-purple-900/10 border border-purple-500/20 rounded-sm"></div>
            <div className="absolute top-1 bottom-1 left-[60%] w-[22%] bg-fuchsia-900/10 border border-fuchsia-500/20 rounded-sm flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-fuchsia-500/10"></div>
                 <motion.span 
                   variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} 
                   className="text-[8px] font-bold text-fuchsia-300/80 tracking-widest uppercase z-10"
                 >
                   GLOW
                 </motion.span>
            </div>
         </div>

         {/* Track V2 (B-Roll) */}
         <div className="h-12 w-full bg-white/[0.02] border border-white/5 rounded-sm relative overflow-hidden">
             <div className="absolute top-1 bottom-1 left-[5%] w-[12%] bg-blue-900/10 border border-blue-500/20 rounded-sm"></div>
             <div className="absolute top-1 bottom-1 left-[25%] w-[28%] bg-indigo-900/10 border border-indigo-500/20 rounded-sm flex items-center justify-center">
                  <motion.div 
                    variants={{ hidden: { width: 0 }, visible: { width: "100%" } }} 
                    className="h-[1px] bg-indigo-400/30 w-full absolute top-1/2 transform -translate-y-1/2" 
                  />
                  <motion.div
                    variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }}
                    className="w-1 h-1 bg-indigo-300 rounded-full absolute left-2"
                  />
                  <motion.div
                    variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }}
                    transition={{ delay: 0.1 }}
                    className="w-1 h-1 bg-indigo-300 rounded-full absolute right-2"
                  />
             </div>
             <div className="absolute top-1 bottom-1 left-[65%] w-[18%] bg-blue-900/10 border border-blue-500/20 rounded-sm"></div>
         </div>

         {/* Track V1 (Main) */}
         <div className="h-16 w-full bg-white/[0.02] border border-white/5 rounded-sm relative overflow-hidden">
             <div className="absolute top-1 bottom-1 left-0 w-[38%] bg-teal-900/10 border border-teal-500/20 rounded-sm overflow-hidden">
                  <div className="w-full h-full opacity-30 bg-gradient-to-r from-transparent via-teal-500/5 to-transparent"></div>
             </div>
             <div className="absolute top-1 bottom-1 left-[38.5%] w-[32%] bg-teal-900/10 border border-teal-500/20 rounded-sm overflow-hidden">
                  {/* Cut Marker */}
                  <motion.div 
                    variants={{ hidden: { height: 0 }, visible: { height: '100%' } }} 
                    transition={{ delay: 0.2 }}
                    className="absolute left-0 top-0 w-[1.5px] bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)] z-20" 
                  />
                  <div className="w-full h-full opacity-30 bg-gradient-to-r from-transparent via-teal-500/10 to-transparent"></div>
             </div>
             <div className="absolute top-1 bottom-1 left-[71%] w-[29%] bg-teal-900/10 border border-teal-500/20 rounded-sm overflow-hidden">
                  <div className="w-full h-full opacity-30 bg-gradient-to-r from-transparent via-teal-500/5 to-transparent"></div>
             </div>
         </div>

         {/* Track A1 (Audio) */}
         <div className="h-12 w-full bg-white/[0.02] border border-white/5 rounded-sm relative overflow-hidden flex items-center px-1">
             <div className="flex items-center gap-[2px] w-full h-1/2 opacity-60">
                 {Array.from({ length: 140 }).map((_, i) => (
                     <motion.div 
                        key={i} 
                        variants={{ hidden: { height: 2 }, visible: { height: `${Math.max(10, Math.random() * 100)}%` } }}
                        transition={{ delay: i * 0.002, duration: 0.5 }}
                        className="flex-1 bg-emerald-500/40 rounded-full min-h-[4px]"
                     />
                 ))}
             </div>
         </div>
     </div>
  </div>
);

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: showcaseProgress } = useScroll({
    target: showcaseRef,
    offset: ["start end", "center center"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const smoothShowcaseProgress = useSpring(showcaseProgress, { stiffness: 60, damping: 20, mass: 1 });
  const handX = useTransform(smoothShowcaseProgress, [0, 1], [-600, 0]);
  const handOpacity = useTransform(smoothShowcaseProgress, [0, 0.4], [0, 1]);

  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % PHONE_VIDEOS.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="h-screen flex items-center justify-center relative px-6">
        
        {/* Irregular Orange Background Shapes */}
        <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center overflow-hidden -z-10">
            {/* Primary Orange Shape */}
            <motion.div
                animate={{
                    rotate: [0, 360],
                    borderRadius: [
                        "50% 50% 50% 50% / 50% 50% 50% 50%",
                        "60% 40% 30% 70% / 60% 30% 70% 40%",
                        "30% 60% 70% 40% / 50% 60% 30% 60%",
                        "50% 50% 50% 50% / 50% 50% 50% 50%"
                    ],
                    scale: [1, 1.1, 0.9, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-[70vw] h-[70vw] md:w-[600px] md:h-[600px] bg-gradient-to-r from-orange-600/30 to-amber-500/20 blur-[100px]"
            />
            
             {/* Secondary Accent Shape */}
             <motion.div
                animate={{
                    rotate: [360, 0],
                    borderRadius: [
                        "50% 50% 50% 50% / 50% 50% 50% 50%",
                        "40% 60% 70% 30% / 40% 70% 30% 60%",
                        "60% 40% 30% 70% / 60% 30% 70% 40%",
                        "50% 50% 50% 50% / 50% 50% 50% 50%"
                    ],
                    scale: [0.9, 1.2, 1, 0.9]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-[60vw] h-[60vw] md:w-[500px] md:h-[500px] bg-gradient-to-l from-orange-400/20 to-red-500/20 blur-[120px] mix-blend-screen"
            />
        </div>

        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="max-w-5xl w-full z-10 text-center relative"
        >
          <motion.h1 
            initial={{ y: 50, opacity: 0, filter: "blur(20px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-8xl lg:text-9xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-stone-100 via-stone-300 to-stone-600 leading-[1.1]"
          >
            Crafting Motion <br /> 
            <span className="font-serif italic text-stone-200">That Speaks Emotion.</span>
          </motion.h1>

          <motion.p
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.5, duration: 1 }}
             className="mt-8 text-lg md:text-xl text-stone-400 font-light tracking-wide max-w-2xl mx-auto"
          >
            Premium visual storytelling for brands, artists, and visionaries.
          </motion.p>

          <motion.div
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.8, duration: 1 }}
             className="mt-12 flex justify-center space-x-6"
          >
            <Link to="/work" className="group relative px-8 py-4 overflow-hidden rounded-full glass-panel transition-all hover:bg-white/10">
              <span className="relative z-10 flex items-center space-x-2 text-stone-200 text-sm tracking-widest uppercase">
                <span>View Selected Work</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* SCROLL REACTIVE SECTION - INFINITE TIMELINE */}
      <section className="min-h-[50vh] py-24 flex flex-col justify-center items-center relative overflow-hidden bg-black/20">
        
        {/* Full Width Timeline Container */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="relative w-full h-[320px] mb-12 select-none"
        >
          {/* Edge Gradients for Soft Fade */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0c0a09] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0c0a09] to-transparent z-20 pointer-events-none"></div>
          
          {/* Infinite Loop Track Wrapper */}
          <motion.div 
            className="flex h-full items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
             <TimelineSegment />
             <TimelineSegment />
          </motion.div>

          {/* Fixed Playhead */}
          <div className="absolute inset-y-0 left-1/2 w-[1px] bg-red-500 z-30 shadow-[0_0_15px_rgba(239,68,68,0.8)] h-full overflow-visible">
             <div className="absolute -top-[6px] -left-[5px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-red-500 drop-shadow-md"></div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl text-center relative z-10 px-6"
        >
          <div className="inline-block p-4 rounded-full border border-white/10 bg-white/5 mb-6 backdrop-blur-md">
            <Play size={24} className="fill-white text-white ml-1" />
          </div>
          <h2 className="text-3xl md:text-5xl font-light leading-snug text-stone-200">
            A meticulous approach to <br />
            <span className="text-stone-500">rhythm, color, and sound.</span>
          </h2>
        </motion.div>
      </section>

      {/* FUTURE SHOWCASE SECTION */}
      <section 
        ref={showcaseRef}
        className="relative w-full min-h-screen py-32 px-6 overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#0c0a09] via-[#1c1917] to-[#0c0a09]"
      >
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#0c0a09] via-[#0c0a09] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[25vw] font-bold text-white/[0.02] uppercase tracking-tighter leading-none whitespace-nowrap">
            NEBULA
          </span>
        </div>

        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="order-2 lg:order-1 lg:pr-12 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h4 className="text-orange-400/80 font-medium tracking-widest uppercase text-sm mb-4">Project: Experimental</h4>
              <h2 className="text-5xl md:text-7xl font-bold text-stone-200 leading-[1.1] mb-8">
                The future of <br/>
                <span className="text-stone-500">viewing experience</span>
              </h2>
              <p className="text-lg text-stone-400 font-light leading-relaxed max-w-md mx-auto lg:mx-0 mb-12">
                Redefines what a media app can be—transforming passive listening into an immersive, interactive experience.
              </p>
              
              <div className="flex flex-col space-y-4 text-xs font-medium uppercase tracking-widest text-stone-500">
                 <div className="flex justify-between max-w-xs mx-auto lg:mx-0 border-b border-white/5 pb-2">
                   <span>Project Type</span>
                   <span className="text-stone-300">Mobile App</span>
                 </div>
                 <div className="flex justify-between max-w-xs mx-auto lg:mx-0 border-b border-white/5 pb-2">
                   <span>Category</span>
                   <span className="text-stone-300">Music / Video</span>
                 </div>
                 <div className="flex justify-between max-w-xs mx-auto lg:mx-0 border-b border-white/5 pb-2">
                   <span>Duration</span>
                   <span className="text-stone-300">4 Weeks</span>
                 </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            style={{ x: handX, opacity: handOpacity }}
            className="order-1 lg:order-2 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-[240px] md:w-[280px] aspect-[9/19] select-none">
              <img 
                src="https://freepngimg.com/thumb/iphone/68616-apple-holding-iphone-hand-x-space-gray.png" 
                alt=" "
                className="absolute -right-20 -bottom-24 w-[160%] max-w-none pointer-events-none z-20 drop-shadow-2xl brightness-75 grayscale-[0.5]"
              />
              <div className="absolute inset-0 bg-black rounded-[2.5rem] border-[8px] border-neutral-800 shadow-2xl z-10 overflow-hidden ring-1 ring-white/10">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-xl z-30"></div>
                <div className="relative w-full h-full bg-stone-900 overflow-hidden">
                   <motion.div 
                      className="w-full h-full flex flex-col"
                      animate={{ y: `-${currentVideo * 100}%` }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                   >
                     {PHONE_VIDEOS.map((videoUrl, idx) => (
                       <div key={idx} className="w-full h-full flex-shrink-0 relative">
                          <video 
                            src={videoUrl}
                            className="w-full h-full object-cover opacity-80"
                            autoPlay
                            muted
                            loop
                            playsInline
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                             <h3 className="text-2xl font-bold mb-1">Cinematic {idx + 1}</h3>
                             <p className="text-xs text-stone-300 mb-6">Visual Journey</p>
                             <div className="w-full h-1 bg-white/20 rounded-full mb-4 overflow-hidden">
                               <motion.div 
                                 className="h-full bg-orange-500"
                                 initial={{ width: "0%" }}
                                 animate={{ width: "100%" }}
                                 transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                                 key={currentVideo}
                               />
                             </div>
                             <div className="flex justify-between items-center text-white/80">
                               <SkipBack size={24} />
                               <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-black">
                                 <Play size={24} fill="currentColor" />
                               </div>
                               <SkipForward size={24} />
                             </div>
                          </div>
                       </div>
                     ))}
                   </motion.div>
                   <div className="absolute top-4 left-6 text-white text-xs font-bold z-20">9:41</div>
                   <div className="absolute top-4 right-6 text-white flex space-x-2 z-20">
                      <div className="w-4 h-3 border border-white rounded-[2px] flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-[1px]"></div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
