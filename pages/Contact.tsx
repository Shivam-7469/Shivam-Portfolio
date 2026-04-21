import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Linkedin, Youtube, ArrowRight, ThumbsUp, Loader2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const SERVICE_OPTIONS = [
  "Commercial",
  "Music Video",
  "Narrative", 
  "Social Media",
  "Color Grading",
  "I have NOT Decide"
];

const Contact: React.FC = () => {
  const { addSubmission } = useContent();
  const [formState, setFormState] = useState({ 
    name: '', 
    email: '', 
    contactNumber: '',
    message: '',
    services: [] as string[]
  });
  const [errors, setErrors] = useState({ contactNumber: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleService = (service: string) => {
    setFormState(prev => {
      const services = prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service];
      return { ...prev, services };
    });
  };

  const validatePhone = (phone: string) => {
    // Allows +, spaces, dashes, parentheses and numbers. Min 7 digits.
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{4,8}$/;
    // Also check if it has at least some numbers
    const hasNumbers = /\d{7,}/.test(phone.replace(/\D/g, ''));
    
    if (!phone) return true; // Allow empty if not required, but here we will make it required
    return phoneRegex.test(phone) && hasNumbers;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!validatePhone(formState.contactNumber)) {
        setErrors({ contactNumber: 'Please enter a valid phone number.' });
        return;
    }
    setErrors({ contactNumber: '' });
    
    setIsSubmitting(true);
    
    try {
      // 1. Save internally to Admin Panel
      addSubmission({
        name: formState.name,
        email: formState.email,
        contactNumber: formState.contactNumber,
        message: formState.message,
        services: formState.services
      });

      // 2. Send email notification via FormSubmit.co
      await fetch("https://formsubmit.co/ajax/shivam.one76@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          contact: formState.contactNumber,
          message: formState.message,
          services: formState.services.join(', '),
          _subject: `New Portfolio Project Inquiry from ${formState.name}`
        })
      });

      // We consider it a success even if email fails, as long as it's saved in Admin
      alert("Thank you! Your message has been sent successfully. I will be in touch shortly.");
      setFormState({ name: '', email: '', contactNumber: '', message: '', services: [] });
      
    } catch (error) {
      console.error("Submission Error:", error);
      // Fallback success message since local save worked
      alert("Thank you! Your message has been saved.");
      setFormState({ name: '', email: '', contactNumber: '', message: '', services: [] });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6 flex flex-col items-center relative overflow-hidden bg-[#0c0a09]">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-stone-800/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-stone-900/40 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-32"
      >
        {/* Info Side */}
        <div className="flex flex-col justify-center space-y-8 pt-8">
           <div>
             <span className="text-orange-500/80 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Contact</span>
             <h1 className="text-5xl md:text-7xl font-light text-stone-100 leading-tight">
               Let's <br/> <span className="font-serif italic text-stone-500">Collaborate.</span>
             </h1>
           </div>
           
           <p className="text-stone-400 font-light text-lg max-w-md leading-relaxed">
             Open for freelance projects, brand partnerships, and long-term contracts. Available for global remote work.
           </p>
           
           <div className="pt-8 flex items-center gap-4">
             <a href="mailto:shivam.one76@gmail.com" className="p-4 glass-panel rounded-full hover:bg-white/10 transition-all border border-white/5 text-stone-400 hover:text-white hover:-translate-y-1">
               <Mail size={20} />
             </a>
             <a href="https://www.instagram.com/mr_home_decor77/" target="_blank" rel="noopener noreferrer" className="p-4 glass-panel rounded-full hover:bg-white/10 transition-all border border-white/5 text-stone-400 hover:text-white hover:-translate-y-1">
               <Instagram size={20} />
             </a>
             <a href="https://www.youtube.com/@mrshivam_666" target="_blank" rel="noopener noreferrer" className="p-4 glass-panel rounded-full hover:bg-white/10 transition-all border border-white/5 text-stone-400 hover:text-white hover:-translate-y-1">
               <Youtube size={20} />
             </a>
             <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="p-4 glass-panel rounded-full hover:bg-white/10 transition-all border border-white/5 text-stone-400 hover:text-white hover:-translate-y-1">
               <Linkedin size={20} />
             </a>
           </div>
        </div>

        {/* Form Side - Enhanced UI */}
        <div className="relative">
           {/* Decorative Glow behind form */}
           <div className="absolute inset-0 bg-gradient-to-br from-stone-800/30 to-transparent blur-3xl rounded-[3rem] -z-10"></div>
           
           <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] bg-[#1c1917]/40 border border-white/10 shadow-2xl backdrop-blur-xl">
             <form onSubmit={handleSubmit} className="space-y-8">
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold ml-1">Name</label>
                   <input 
                     type="text" 
                     required
                     name="name"
                     value={formState.name}
                     onChange={e => setFormState({...formState, name: e.target.value})}
                     className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-stone-100 outline-none focus:border-orange-500/50 focus:bg-white/[0.05] transition-all placeholder-stone-600 text-sm"
                     placeholder="John Doe"
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold ml-1">Email</label>
                   <input 
                     type="email" 
                     required
                     name="email"
                     value={formState.email}
                     onChange={e => setFormState({...formState, email: e.target.value})}
                     className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-stone-100 outline-none focus:border-orange-500/50 focus:bg-white/[0.05] transition-all placeholder-stone-600 text-sm"
                     placeholder="john@example.com"
                   />
                 </div>
               </div>

               <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold ml-1">Contact Number</label>
                   <input 
                     type="tel" 
                     required
                     name="contactNumber"
                     value={formState.contactNumber}
                     onChange={e => {
                         setFormState({...formState, contactNumber: e.target.value});
                         if(errors.contactNumber) setErrors({contactNumber: ''});
                     }}
                     className={`w-full bg-white/[0.03] border rounded-xl px-4 py-3.5 text-stone-100 outline-none focus:border-orange-500/50 focus:bg-white/[0.05] transition-all placeholder-stone-600 text-sm ${errors.contactNumber ? 'border-red-500/50' : 'border-white/10'}`}
                     placeholder="+1 (555) 000-0000"
                   />
                   {errors.contactNumber && (
                       <p className="text-red-400 text-xs ml-1 pt-1">{errors.contactNumber}</p>
                   )}
               </div>

               {/* New Services Section */}
               <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold ml-1">I'm interested in...</label>
                  <div className="flex flex-wrap gap-3">
                      {SERVICE_OPTIONS.map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 transform active:scale-95 ${
                            formState.services.includes(service)
                              ? 'bg-stone-100 text-black border-stone-100 shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                              : 'bg-white/[0.03] text-stone-400 border-white/10 hover:border-white/30 hover:text-stone-200 hover:bg-white/[0.05]'
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                  </div>
               </div>

               <div className="space-y-2">
                 <label className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold ml-1">Project Details</label>
                 <textarea 
                   required
                   rows={4}
                   name="message"
                   value={formState.message}
                   onChange={e => setFormState({...formState, message: e.target.value})}
                   className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-stone-100 outline-none focus:border-orange-500/50 focus:bg-white/[0.05] transition-all placeholder-stone-600 text-sm resize-none leading-relaxed"
                   placeholder="Tell me about your vision, timeline, and goals..."
                 />
               </div>
               
               <button 
                 type="submit" 
                 disabled={isSubmitting}
                 className="group w-full py-4 rounded-xl bg-gradient-to-r from-stone-100 to-stone-300 text-black uppercase tracking-[0.2em] text-xs font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
               >
                 {isSubmitting ? (
                    <>
                        <Loader2 size={14} className="animate-spin" />
                        <span>Sending...</span>
                    </>
                 ) : (
                    <>
                        <span>Send Message</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </>
                 )}
               </button>
             </form>
           </div>
        </div>
      </motion.div>
      
      {/* THANK YOU SECTION - REPLICATED UI */}
      <div className="w-full max-w-[1400px] mb-20 relative px-4">
          <div className="relative w-full aspect-[21/9] md:aspect-[2.5/1] bg-gradient-to-br from-[#1a103c] via-[#0f0a1e] to-black rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl flex flex-col items-center justify-center group">
              
              {/* Background Glows */}
              <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[80%] bg-purple-600/20 blur-[100px] rounded-full"></div>
              <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[80%] bg-blue-600/20 blur-[100px] rounded-full"></div>
              
              {/* Content Grid */}
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8">
                  
                  {/* Floating Notification */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute left-[10%] top-[30%] md:top-[40%] bg-[#0c0a09]/90 backdrop-blur-md px-4 py-2.5 rounded-2xl rounded-bl-none border border-white/10 flex items-center gap-3 shadow-xl z-20"
                  >
                      <div className="text-[10px] font-bold text-stone-400 leading-tight">
                         PUSH <span className="text-white">THE LIKE</span> <br/> BUTTON
                      </div>
                      <div className="text-2xl">👍🏼</div>
                  </motion.div>

                  {/* Main Text */}
                  <div className="flex items-start gap-4 md:gap-8 relative">
                      <div className="flex flex-col items-center leading-[0.85]">
                           <motion.h2 
                             initial={{ y: 50, opacity: 0 }}
                             whileInView={{ y: 0, opacity: 1 }}
                             transition={{ duration: 0.8 }}
                             className="text-[5rem] md:text-[8rem] lg:text-[10rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-fuchsia-300 via-fuchsia-500 to-purple-600 drop-shadow-[0_0_30px_rgba(192,38,211,0.3)]"
                           >
                               Thank
                           </motion.h2>
                           <motion.h2 
                             initial={{ y: 50, opacity: 0 }}
                             whileInView={{ y: 0, opacity: 1 }}
                             transition={{ duration: 0.8, delay: 0.1 }}
                             className="text-[5rem] md:text-[8rem] lg:text-[10rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-sky-300 via-sky-500 to-blue-600 drop-shadow-[0_0_30px_rgba(14,165,233,0.3)]"
                           >
                               You
                           </motion.h2>
                      </div>

                      {/* Vertical Text */}
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="hidden md:flex h-full pt-4 md:pt-8"
                      >
                          <span className="writing-vertical-rl text-xs md:text-sm font-light tracking-[1em] text-stone-400 uppercase opacity-60">
                              Very Much
                          </span>
                      </motion.div>
                  </div>

                  {/* Avatars (Bottom Peeking) */}
                  <div className="absolute bottom-0 w-full flex justify-center items-end gap-4 md:gap-8 translate-y-[10%]">
                       {/* Left Avatar */}
                       <motion.div 
                         initial={{ y: 100 }}
                         whileInView={{ y: 0 }}
                         transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                         className="w-32 h-32 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#1a103c] shadow-2xl bg-stone-800 relative z-10"
                       >
                           <img src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=400&auto=format&fit=crop" alt="Avatar 1" className="w-full h-full object-cover hover:scale-110 transition-transform" />
                       </motion.div>
                       
                       {/* Center Avatar (Main) */}
                       <motion.div 
                         initial={{ y: 150 }}
                         whileInView={{ y: 0 }}
                         transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
                         className="w-40 h-40 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-[#1a103c] shadow-2xl bg-stone-800 relative z-20 -mb-6 md:-mb-12"
                       >
                           <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=400&auto=format&fit=crop" alt="Avatar 2" className="w-full h-full object-cover hover:scale-110 transition-transform" />
                       </motion.div>

                       {/* Right Avatar */}
                       <motion.div 
                         initial={{ y: 100 }}
                         whileInView={{ y: 0 }}
                         transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
                         className="w-32 h-32 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#1a103c] shadow-2xl bg-stone-800 relative z-10"
                       >
                           <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop" alt="Avatar 3" className="w-full h-full object-cover hover:scale-110 transition-transform" />
                       </motion.div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Contact;