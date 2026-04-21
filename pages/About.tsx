import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Scissors, Palette, Zap, Layout, MonitorPlay, Smartphone } from 'lucide-react';

const TOOLS = [
  {
    id: 1,
    name: "Premiere Pro",
    type: "Editor",
    level: "LVL 85",
    rarity: "Legendary",
    stats: { speed: "+60%", stability: "+80%" },
    gradient: "bg-gradient-to-br from-[#9900ff] to-[#33006f]", // Adobe Purple
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop",
    shadow: "shadow-[#9900ff]/40",
    textColor: "text-purple-200",
    icon: <MonitorPlay size={52} className="text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]" />
  },
  {
    id: 2,
    name: "Figma",
    type: "Colorist",
    level: "LVL 40",
    rarity: "Epic",
    stats: { color: "+100%", depth: "+60%" },
    gradient: "bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500", // DaVinci Rainbow/Circle vibe
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    shadow: "shadow-orange-500/40",
    textColor: "text-orange-200",
    icon: <Palette size={52} className="text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]" />
  },
  {
    id: 3,
    name: "Canva",
    type: "Design",
    level: "LVL 76",
    rarity: "Uncommon",
    stats: { layout: "+70%", assets: "+50%" },
    gradient: "bg-gradient-to-br from-[#00c4cc] to-[#7d2ae8]", // Canva Blue/Purple
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
    shadow: "shadow-[#00c4cc]/40",
    textColor: "text-cyan-200",
    icon: <Layout size={52} className="text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]" />
  },

];

const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center relative overflow-hidden bg-[#0c0a09]">
       {/* Ambient Motion Background */}
       <div className="absolute inset-0 w-full h-full -z-10 opacity-30 pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-stone-700 rounded-full blur-[150px]"
          />
           <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gray-800 rounded-full blur-[150px]"
          />
       </div>

       {/* MAIN CONTENT */}
       <div className="max-w-4xl mx-auto relative z-10 mb-32">
         <motion.div
           initial={{ opacity: 0, filter: "blur(10px)" }}
           animate={{ opacity: 1, filter: "blur(0px)" }}
           transition={{ duration: 1.5 }}
           className="text-center"
         >
           <h1 className="text-sm font-bold tracking-[0.5em] uppercase text-stone-500 mb-8">The Artist</h1>
           <p className="text-3xl md:text-5xl font-light leading-relaxed text-stone-200">
             "I believe that editing is not just about cutting footage—it is about <span className="text-white font-normal bg-gradient-to-r from-stone-500/20 to-transparent px-2 rounded-lg italic font-serif">sculpting time.</span>"
           </p>
         </motion.div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-24 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="glass-panel p-8 rounded-2xl relative">
                 <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-stone-500/50 rounded-tl-xl"></div>
                 <h2 className="text-3xl font-bold text-white mb-6">HI, I'M SHIVAM</h2>
                 <p className="text-stone-300 font-light leading-loose text-lg">
                  I am a B.Tech IT undergraduate at USICT, GGSIPU, with a strong interest in video editing and visual storytelling. I focus on creating clean, engaging content that combines creativity with technical precision. 
                   <br /><br />
                   I enjoy transforming raw ideas into polished visuals that communicate clearly and effectively. By blending editing skills with a technical mindset, I aim to deliver content that is both visually appealing and well-structured.
                 </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-8"
            >
               <div className="flex flex-col space-y-2">
                 <span className="text-xs uppercase tracking-widest text-stone-500">Philosophy</span>
                 <span className="text-xl font-light text-stone-200">Minimalism. Impact. Emotion.</span>
               </div>
               <div className="flex flex-col space-y-2">
                 <span className="text-xs uppercase tracking-widest text-stone-500">Tools</span>
                 <span className="text-xl font-light text-stone-200"> Adobe Premiere Pro,  CAP CUT,  Figma,  Canva,  DaVinci Resolve(Basic)</span>
               </div>
                <div className="flex flex-col space-y-2">
                 <span className="text-xs uppercase tracking-widest text-stone-500">Coding Language </span>
                 <span className="text-xl font-light text-stone-200">HTML,  C ,  Python</span>
               </div>
               <div className="flex flex-col space-y-2">
                 <span className="text-xs uppercase tracking-widest text-stone-500">Location</span>
                 <span className="text-xl font-light text-stone-200">New Delhi, INDIA</span>
               </div>
            </motion.div>
         </div>
       </div>

       {/* EDUCATION SECTION */}
       <div className="w-full max-w-6xl mx-auto relative z-10 flex flex-col items-center mt-12 mb-32">
            <div className="flex items-center gap-4 mb-16 opacity-80">
                <div className="h-[1px] w-12 bg-stone-500"></div>
                <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-stone-400">Education & Background</h3>
                <div className="h-[1px] w-12 bg-stone-500"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl px-4">
                {/* Timeline Item 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-colors relative"
                >
                  <span className="text-orange-500/80 font-bold text-[10px] tracking-widest uppercase mb-3 block border border-orange-500/20 bg-orange-500/10 w-max px-2 py-1 rounded">2025 - 2029</span>
                  <h4 className="text-xl font-light text-stone-200 mb-1">Bachelor's Degree</h4>
                  <p className="text-stone-400 font-light text-sm mb-4 italic">B. Tech ( Information and Technology)</p>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    Pursuing B.Tech IT at GGSIPU, building a strong foundation in programming, data structures, and software development. Actively working on projects to apply concepts and improve problem-solving skills. 
                  </p>
                </motion.div>
                
                {/* Timeline Item 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-colors relative"
                >
                  <span className="text-orange-500/80 font-bold text-[10px] tracking-widest uppercase mb-3 block border border-orange-500/20 bg-orange-500/10 w-max px-2 py-1 rounded">2025 - Present</span>
                  <h4 className="text-xl font-light text-stone-200 mb-1">ACM Student Chapter</h4>
                  <p className="text-stone-400 font-light text-sm mb-4 italic">Social Media Team (Video Editor)</p>
                  <p className="text-stone-500 text-sm leading-relaxed">
                  Member of the ACM Student Chapter, contributing to the Social Media Team as a Video Editor. Responsible for creating engaging visual content, editing event highlights, and maintaining digital presence.
                  </p>
                </motion.div>

                 {/* Timeline Item 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-colors relative"
                >
                  <span className="text-orange-500/80 font-bold text-[10px] tracking-widest uppercase mb-3 block border border-orange-500/20 bg-orange-500/10 w-max px-2 py-1 rounded">2024 - 2024</span>
                  <h4 className="text-xl font-light text-stone-200 mb-1">MS Solution - Video Editor</h4>
                  <p className="text-stone-400 font-light text-sm mb-4 italic">3 Months</p>
                  <p className="text-stone-500 text-sm leading-relaxed">
                   Worked as a video editor, creating and editing content for client projects and business social media. Produced engaging videos with basic animations, ensuring quality, clarity, and timely delivery. Gained practical experience in handling client requirements and improving visual storytelling.
                  </p>
                </motion.div>

                {/* Timeline Item 4 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-colors relative"
                >
                  <span className="text-orange-500/80 font-bold text-[10px] tracking-widest uppercase mb-3 block border border-orange-500/20 bg-orange-500/10 w-max px-2 py-1 rounded">2018 - 2024</span>
                  <h4 className="text-xl font-light text-stone-200 mb-1">CSA Govt. Boys Sr. Sec. School</h4>
                  <p className="text-stone-400 font-light text-sm mb-4 italic">School of Motion</p>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    Completed 12th grade with a focus on core subjects, developing analytical thinking and problem-solving abilities. Built a strong academic base that supports current technical studies..
                  </p>
                </motion.div>
            </div>
       </div>

       {/* PERSONAL SKILLS */}
       <div className="w-full max-w-6xl mx-auto relative z-10 flex flex-col items-center mt-12 mb-32">
            <div className="flex items-center gap-4 mb-16 opacity-80">
                <div className="h-[1px] w-12 bg-stone-500"></div>
                <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-stone-400">Personal Skills</h3>
                <div className="h-[1px] w-12 bg-stone-500"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 max-w-4xl px-4">
                {['Video Editing', 'Photography', 'Handcrafted Design', 'Artwork & Design',].map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="glass-panel px-6 py-3 rounded-full border border-white/5 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all cursor-default text-stone-300 font-light tracking-wide shadow-lg"
                    >
                      {skill}
                    </motion.div>
                ))}
            </div>
       </div>

       {/* CREATIVE ARSENAL (GAME CARD UI) */}
       <div className="w-full max-w-6xl mx-auto relative z-10 flex flex-col items-center">
            <div className="flex items-center gap-4 mb-16 opacity-80">
                <div className="h-[1px] w-12 bg-stone-500"></div>
                <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-stone-400">Software Inventory</h3>
                <div className="h-[1px] w-12 bg-stone-500"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-8 lg:gap-12 perspective-1000">
                {TOOLS.map((tool, i) => (
                    <motion.div
                        key={tool.id}
                        initial={{ y: 100, opacity: 0, rotateX: 20 }}
                        whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
                        className="relative group cursor-default"
                    >
                        {/* Floating Animation Wrapper */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                            className="relative"
                        >
                            {/* Glow/Shadow under card */}
                            <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-black/50 blur-xl rounded-full ${tool.shadow} transition-all duration-500 group-hover:opacity-100 opacity-60`}></div>

                            {/* Floating Sparkles */}
                            <motion.div 
                                animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 + i }}
                                className="absolute -top-4 -right-4 text-yellow-200 z-20"
                            >
                                <Sparkles size={24} fill="currentColor" />
                            </motion.div>
                            
                            {/* Main Card */}
                            <div className={`w-[260px] h-[380px] rounded-[2.5rem] p-1.5 ${tool.gradient} shadow-2xl relative overflow-visible transform transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-2 ring-1 ring-white/10`}>
                                
                                {/* Inner Border Container */}
                                <div className="w-full h-full rounded-[2.2rem] border border-white/20 bg-stone-900 flex flex-col relative overflow-hidden backdrop-blur-sm">
                                    
                                    {/* Background Image */}
                                    <div className="absolute inset-0 z-0">
                                        <img 
                                          src={tool.image} 
                                          alt={tool.name} 
                                          className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 mix-blend-overlay" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90"></div>
                                    </div>

                                    {/* Top Light Glare */}
                                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent opacity-50 rounded-t-[2.2rem] z-10 pointer-events-none"></div>
                                    
                                    {/* Icon / Character Section */}
                                    <div className="h-[55%] w-full flex items-center justify-center relative z-10">
                                        <motion.div 
                                            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                                            transition={{ duration: 0.5 }}
                                            className="relative z-20"
                                        >
                                            {tool.icon}
                                        </motion.div>
                                    </div>

                                    {/* Bottom Info Card (The "Box" look) */}
                                    <div className="absolute bottom-2 left-2 right-2 bg-stone-900/90 backdrop-blur-md rounded-[1.8rem] p-4 border border-white/10 shadow-lg z-20 h-[42%] flex flex-col justify-between">
                                        
                                        <div className="text-center">
                                            <h4 className={`text-xl font-bold uppercase tracking-tight ${tool.textColor} drop-shadow-sm`}>{tool.name}</h4>
                                            <div className="flex items-center justify-center gap-2 mt-1">
                                                <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded text-stone-300 uppercase">{tool.rarity}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2 mt-2">
                                            {/* Progress Bar / Level */}
                                            <div className="w-full flex justify-between items-end text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                                                <span>Mastery</span>
                                                <span className="text-white">{tool.level}</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: "90%" }}
                                                    transition={{ delay: 0.5, duration: 1 }}
                                                    className={`h-full ${tool.gradient}`}
                                                />
                                            </div>
                                            
                                            {/* Mini Stats Grid */}
                                            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/5">
                                                {Object.entries(tool.stats).map(([key, val]) => (
                                                    <div key={key} className="text-[9px] uppercase tracking-wider text-stone-500 flex justify-between">
                                                        <span>{key}</span>
                                                        <span className="text-stone-300 font-bold">{val}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
       </div>
    </div>
  );
};

export default About;