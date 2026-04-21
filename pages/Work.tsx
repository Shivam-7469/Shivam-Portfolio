import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { ProjectItem } from '../types';
import { Play, Trophy, ChevronLeft, ChevronRight, Youtube, Globe, ArrowUpRight, Github, ExternalLink } from 'lucide-react';

// --- Carousel Data (Static - Design Element) ---
const GENRES = [
  {
    id: 1,
    title: "Commercial",
    subtitle: "Brand Stories",
    rating: "4.0",
    color: "bg-rose-600",
    img: "https://i.im.ge/2026/01/26/GvfDaa.Screenshot-2026-01-26-165338.png"
  },
  {
    id: 2,
    title: "Narrative",
    subtitle: "Short Films",
    rating: "3.9",
    color: "bg-blue-600",
    img: "https://i.im.ge/2026/01/26/GvkM6S.Storytelling.jpeg"
  },
  {
    id: 3,
    title: "Podcast Video",
    subtitle: "Visual Rhythm",
    rating: "4.8",
    color: "bg-purple-600",
    img: "https://i.im.ge/2026/01/26/GvWIuc.Podcast-ativos.jpeg"
  },
  {
    id: 4,
    title: "Gaming",
    subtitle: "Real Life",
    rating: "4.5",
    color: "bg-emerald-600",
    img: "https://i.im.ge/2026/01/26/Gvfbbp.gaming.jpeg"
  },
  {
    id: 5,
    title: "Social",
    subtitle: "Viral Edits",
    rating: "4.7",
    color: "bg-orange-600",
    img: "https://i.im.ge/2026/01/26/GvfHic.download.md.jpeg"
  },
  {
    id: 6,
    title: "Web Design",
    subtitle: "Digital Experiences",
    rating: "4.9",
    color: "bg-teal-600",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop"
  }
];

// --- 3D Carousel Component ---
const CarouselSection: React.FC = () => {
  const [index, setIndex] = useState(2);

  const handleNext = () => setIndex((prev) => (prev + 1) % GENRES.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + GENRES.length) % GENRES.length);

  return (
    <div className="relative w-full flex flex-col items-center justify-center mt-40 mb-20 overflow-visible">
        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
             <span className="text-stone-500 text-xs font-bold tracking-[0.3em] uppercase">Expertise</span>
             <h2 className="text-3xl md:text-5xl text-stone-200 mt-2 font-light">Production <span className="font-serif italic text-stone-500">Styles</span></h2>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-[1200px] h-[450px] flex items-center justify-center perspective-1000">
            {GENRES.map((item, i) => {
                const length = GENRES.length;
                let offset = (i - index + length) % length;
                if (offset > length / 2) offset -= length;
                
                const absOffset = Math.abs(offset);
                
                // Hide items that are too far away to prevent visual clutter
                if (absOffset > 2) return null;

                return (
                    <motion.div
                        key={item.id}
                        layout
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            x: offset * 240, // Horizontal spacing
                            y: absOffset * 30, // Arch effect (lower items on side)
                            scale: 1 - absOffset * 0.1, // Scale down side items
                            zIndex: 100 - absOffset,
                            rotateY: offset * -15, // Rotate inwards
                            opacity: 1 - absOffset * 0.3, // Fade out side items
                            filter: absOffset > 0 ? 'blur(2px)' : 'blur(0px)'
                        }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
                        className={`absolute w-[300px] h-[420px] rounded-[2.5rem] p-1 shadow-2xl cursor-pointer ${item.color} origin-bottom`}
                        onClick={() => setIndex(i)}
                    >
                         <div className="relative w-full h-full rounded-[2.3rem] overflow-hidden bg-gradient-to-br from-white/20 to-transparent flex flex-col border border-white/20">
                             {/* Card Header */}
                             <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-20">
                                 <div>
                                     <h3 className="text-white font-bold text-3xl leading-none tracking-tight shadow-black drop-shadow-md">{item.title}</h3>
                                     <span className="text-white/80 text-xs font-bold uppercase tracking-wider mt-1 block drop-shadow-sm">{item.subtitle}</span>
                                 </div>
                                 <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/10">
                                     <Trophy size={14} className="text-yellow-300 fill-current" />
                                     <span className="text-white text-sm font-bold">{item.rating}</span>
                                 </div>
                             </div>
                             
                             {/* Image Area */}
                             <div className="absolute top-24 left-3 right-3 bottom-3 rounded-[2rem] overflow-hidden bg-black/30 shadow-inner">
                                 <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-90 hover:scale-110 transition-transform duration-700" />
                                 {/* Overlay Gradient */}
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                             </div>
                         </div>
                    </motion.div>
                )
            })}
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex gap-6 mt-12 z-20">
            <button onClick={handlePrev} className="p-4 rounded-full glass-panel hover:bg-white/10 transition-colors text-white group">
                <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button onClick={handleNext} className="p-4 rounded-full glass-panel hover:bg-white/10 transition-colors text-white group">
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>

        {/* Youtube Button */}
        <motion.a 
            href="https://www.youtube.com/@mrshivam_666" 
            target="_blank" 
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 relative group overflow-hidden rounded-full glass-panel px-8 py-3 flex items-center gap-3 transition-all hover:bg-white/10 hover:border-red-500/30 z-20"
        >
             <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             <span className="relative z-10 text-xs font-bold tracking-[0.2em] uppercase text-stone-300 group-hover:text-white transition-colors">Visit Channel</span>
             <Youtube size={16} className="relative z-10 text-stone-300 group-hover:text-red-500 transition-colors" />
        </motion.a>
    </div>
  );
}

// --- Interactive 3D Card Component ---
const TiltCard: React.FC<{ project: ProjectItem; index: number }> = ({ project, index }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse position values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tilt effect
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map mouse position to rotation degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [12, -12]); // Tilt up/down
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]); // Tilt left/right
  
  // Gloss effect movement (moves opposite to tilt for depth)
  const glossX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glossY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to center of card (-0.5 to 0.5)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleOpenVideo = () => {
      if (project.videoUrl) window.open(project.videoUrl, '_blank');
  };

  return (
    <div className="flex flex-col items-center gap-6 group perspective-1000">
      {/* 3D TILT CONTAINER */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="relative w-full aspect-[9/16] rounded-[2rem] cursor-pointer"
        onClick={handleOpenVideo}
      >
        {/* Shadow Drop (Static behind tilt) */}
        <div className="absolute inset-4 bg-orange-500/20 rounded-[1.5rem] blur-2xl transform translate-y-8 opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10" />

        {/* Card Content Wrapper */}
        <div className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/10 bg-stone-900 shadow-2xl backdrop-blur-sm transform-gpu transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            
            {/* Background Image */}
            <motion.img 
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

            {/* Text Overlay (Internal) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[10px] font-bold tracking-[0.2em] text-orange-400 uppercase mb-2 block">{project.category}</span>
                <h3 className="text-2xl font-serif text-white italic">{project.title}</h3>
            </div>

            {/* Interactive Gloss/Reflection Layer */}
            <motion.div 
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                style={{
                    background: useTransform(
                        () => `radial-gradient(circle at ${mouseXSpring.get() * 100 + 50}% ${mouseYSpring.get() * 100 + 50}%, rgba(255,255,255,0.2) 0%, transparent 60%)`
                    ),
                    mixBlendMode: "overlay"
                }}
            />
            
            {/* Glass Shine Edge */}
            <div className="absolute inset-0 rounded-[2rem] border border-white/10 group-hover:border-white/30 transition-colors duration-500 z-30 pointer-events-none"></div>
        </div>
      </motion.div>

      {/* ACTION BUTTON (Separate from tilt to be stable) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpenVideo}
        className="relative group/btn overflow-hidden rounded-full glass-panel px-8 py-3 flex items-center gap-3 transition-all hover:bg-white/10 hover:border-white/30"
      >
        <span className="relative z-10 text-xs font-bold tracking-[0.2em] uppercase text-stone-300 group-hover/btn:text-white transition-colors">
          {project.category === 'Website Design' ? 'Visit Site' : 'Watch Now'}
        </span>
        {project.category === 'Website Design' ? (
          <Globe size={12} className="text-stone-300 group-hover/btn:text-white transition-colors" />
        ) : (
          <Play size={12} className="text-stone-300 group-hover/btn:text-white fill-current transition-colors" />
        )}
        
        {/* Subtle glow behind button */}
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
      </motion.button>
    </div>
  );
};

// --- Featured Portfolio Banner Component ---
const FeaturedPortfolio: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full max-w-[1200px] mx-auto mb-24 rounded-[2rem] overflow-hidden relative bg-stone-900 shadow-2xl flex flex-col lg:flex-row border border-white/5"
    >
      {/* Content Left */}
      <div className="relative z-10 lg:w-1/2 p-8 md:p-14 flex flex-col justify-center">
        <span className="inline-block px-3 py-1 bg-orange-500/10 text-orange-400 text-[10px] font-bold uppercase tracking-widest rounded-full w-max mb-6 border border-orange-500/20">
          Featured Project
        </span>
        
        <h2 className="text-3xl md:text-5xl font-light text-white mb-6">
          Personal <span className="font-serif italic text-stone-400">Portfolio</span> Website
        </h2>
        
        <p className="text-stone-300 font-light leading-relaxed mb-8">
          I designed and developed a fully responsive personal portfolio website to showcase my projects, skills, and achievements. The website focuses on clean UI, smooth navigation, and a user-friendly experience across all devices.
        </p>

        <div className="mb-8 p-6 bg-black/30 rounded-2xl border border-white/5">
          <h4 className="text-stone-100 text-xs uppercase tracking-widest font-bold mb-4">Key Features</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-stone-400 font-light">
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Responsive Design</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Smooth Scrolling UI</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Project Showcase</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Fast & Optimized</li>
          </ul>
        </div>

        <div className="flex flex-col space-y-4 mb-8">
          <div>
             <span className="text-stone-500 text-[10px] uppercase tracking-widest font-bold block mb-1">Technologies</span>
             <span className="text-stone-200 text-sm">React, Tailwind CSS, Framer Motion, TypeScript</span>
          </div>
          <div>
             <span className="text-stone-500 text-[10px] uppercase tracking-widest font-bold block mb-1">My Role</span>
             <span className="text-stone-200 text-sm">Designed UI & developed the complete frontend</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a 
            href="https://studio-shar.vercel.app/"
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-stone-200 transition-colors"
          >
            <ExternalLink size={16} /> Live Demo
          </a>
          <a 
            href="https://github.com/Shivam-7469/Studio-Shar"
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 glass-panel px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
          >
            <Github size={16} /> Source Code
          </a>
        </div>
      </div>

      {/* Image Right */}
      <div className="relative z-10 lg:w-1/2 min-h-[400px] lg:min-h-full">
        {/* Subtle glow behind image */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent mix-blend-overlay"></div>
        <img 
          src="https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000&auto=format&fit=crop" 
          alt="Portfolio Website Design" 
          className="w-full h-full object-cover opacity-80"
        />
        {/* Overlay gradient to fade nicely into the dark bg */}
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-transparent to-stone-900 pointer-events-none"></div>
      </div>
    </motion.div>
  );
};

// --- Main Page Component ---
const Work: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const { projects, photographs } = useContent();
  
  // Parallax Transforms for Cinematic Depth
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, -250]); // Top blob moves up faster
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, 150]);  // Bottom blob moves down
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 45]); // Slight rotation
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]); // Pulsing scale
  
  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-24 px-6 md:px-12 relative overflow-hidden bg-[#0c0a09]/90">
      
      {/* Background Ambience with Parallax */}
      <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
          {/* Deep Atmosphere Layer */}
          <motion.div 
            style={{ y: bgY1, rotate: bgRotate }}
            className="absolute top-[-20%] left-[-10%] w-[90vw] h-[90vw] bg-stone-900/50 rounded-full blur-[140px] opacity-60" 
          />
          
          {/* Secondary Light Source */}
          <motion.div 
             style={{ y: bgY2, scale: bgScale }}
             className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-stone-800/30 rounded-full blur-[120px] opacity-40" 
          />

          {/* Accent Glow - Connects with the orange liquid theme */}
          <motion.div 
             style={{ 
               y: useTransform(scrollYProgress, [0, 1], [100, -100]),
               x: useTransform(scrollYProgress, [0, 1], [-50, 50]),
               opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.1])
             }}
             className="absolute top-[40%] left-[20%] w-[40vw] h-[40vw] bg-orange-900/10 rounded-full blur-[100px] mix-blend-screen" 
          />
      </div>
      
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-20 text-center relative z-10"
        >
          <span className="text-orange-500/80 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Portfolio</span>
          <h1 className="text-5xl md:text-7xl font-light text-stone-100 mb-6">
            Selected <span className="font-serif italic text-stone-500">Works</span>
          </h1>
          <p className="text-stone-400 font-light text-lg max-w-xl mx-auto">
            A curated collection of commercial, narrative, and experimental motion projects.
          </p>
        </motion.div>

        {/* Featured Portfolio Banner */}
        <FeaturedPortfolio />

        {/* 3x3 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 lg:gap-x-12 lg:gap-y-24 px-4 lg:px-12">
          {projects.map((project, index) => (
            <TiltCard key={project.id} project={project} index={index} />
          ))}
        </div>

       {/* PHOTOGRAPHY SHOWCASE (MASONRY GRID) */}
       <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col items-center mt-32 mb-32">
            <div className="flex items-center gap-4 mb-16 opacity-80">
                <div className="h-[1px] w-12 bg-stone-500"></div>
                <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-stone-400">Memory Archives</h3>
                <div className="h-[1px] w-12 bg-stone-500"></div>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 px-4">
              {photographs.map((photo, i) => (
                  <motion.div 
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: i < 3 ? i * 0.1 : 0 }}
                    className="break-inside-avoid relative group rounded-2xl overflow-hidden border border-white/5 bg-black/50"
                  >
                     <img 
                       src={photo.url} 
                       alt={photo.alt}
                       className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${photo.aspectRatio === 'square' ? 'aspect-square' : photo.aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'}`} 
                       loading="lazy"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <p className="text-white font-medium tracking-wide text-sm">{photo.alt || 'Untitled'}</p>
                     </div>
                  </motion.div>
              ))}
            </div>
       </div>

        {/* 3D Carousel Section (Inserted Here) */}
        <CarouselSection />

        {/* Footer Line */}
        <div className="mt-12 w-full flex justify-center">
            <div className="w-px h-24 bg-gradient-to-b from-stone-500/50 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default Work;