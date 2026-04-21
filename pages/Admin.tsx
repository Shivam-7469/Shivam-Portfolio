import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Save, Plus, Trash2, Edit2, LogOut, Image, Youtube, Type, Mail, Calendar, User, AlignLeft, Phone, Download, UploadCloud } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { ProjectItem, ServiceItem, Photograph } from '../types';

const ADMIN_PASSWORD = "password"; // Simple password for demo

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const { 
    projects, services, submissions, photographs,
    updateProject, addProject, deleteProject, 
    updateService, addService, deleteService,
    deleteSubmission,
    updatePhotograph, addPhotograph, deletePhotograph 
  } = useContent();
  
  const [activeTab, setActiveTab] = useState<'projects' | 'services' | 'inbox' | 'photographs'>('projects');
  
  // Editor States
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [editingPhotograph, setEditingPhotograph] = useState<Photograph | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [isNewService, setIsNewService] = useState(false);
  const [isNewPhotograph, setIsNewPhotograph] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid Access Code');
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      if (isNewProject) {
        addProject({ ...editingProject, id: Date.now().toString() });
      } else {
        updateProject(editingProject);
      }
      setEditingProject(null);
      setIsNewProject(false);
    }
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      if (isNewService) {
        addService({ ...editingService, id: Date.now().toString() });
      } else {
        updateService(editingService);
      }
      setEditingService(null);
      setIsNewService(false);
    }
  };

  const handleSavePhotograph = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPhotograph) {
      if (isNewPhotograph) {
        addPhotograph({ ...editingPhotograph, id: Date.now().toString() });
      } else {
        updatePhotograph(editingPhotograph);
      }
      setEditingPhotograph(null);
      setIsNewPhotograph(false);
    }
  };

  const handleDownloadCSV = () => {
    if (submissions.length === 0) {
      alert("No messages to export.");
      return;
    }
    
    const headers = ["ID", "Name", "Email", "Contact Number", "Date", "Services", "Message"];
    const csvContent = [
      headers.join(","),
      ...submissions.map(sub => {
        const date = new Date(sub.date).toLocaleString().replace(/,/g, ' '); 
        const services = sub.services.join("; ");
        const cleanMessage = (sub.message || "").replace(/"/g, '""').replace(/\n/g, ' '); 
        
        return [
          sub.id,
          `"${sub.name}"`,
          `"${sub.email}"`,
          `"${sub.contactNumber || ''}"`,
          `"${date}"`,
          `"${services}"`,
          `"${cleanMessage}"`
        ].join(",");
      })
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `portfolio_messages_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteProject = () => {
    if (editingProject && window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(editingProject.id);
      setEditingProject(null);
    }
  };

  const handleDeleteService = () => {
    if (editingService && window.confirm('Are you sure you want to delete this service?')) {
      deleteService(editingService.id);
      setEditingService(null);
    }
  };

  const handleDeletePhotograph = () => {
    if (editingPhotograph && window.confirm('Are you sure you want to delete this photograph?')) {
      deletePhotograph(editingPhotograph.id);
      setEditingPhotograph(null);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        // Compress image using canvas
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio automatically
        let autoRatio: 'portrait' | 'landscape' | 'square' = 'landscape';
        if (width / height > 1.2) autoRatio = 'landscape';
        else if (height / width > 1.2) autoRatio = 'portrait';
        else autoRatio = 'square';

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Get compressed data URL
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          
          if (editingPhotograph) {
            setEditingPhotograph({
              ...editingPhotograph,
              url: dataUrl,
              aspectRatio: autoRatio
            });
          }
        }
      };
      
      if (e.target?.result && typeof e.target.result === 'string') {
        img.src = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0c0a09] px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md glass-panel p-8 rounded-2xl border border-white/10"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-stone-300">
              <Lock size={24} />
            </div>
            <h1 className="text-2xl font-light text-stone-100">Restricted Access</h1>
            <p className="text-stone-500 text-sm mt-2">Enter administration credentials</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Password"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-stone-100 outline-none focus:border-orange-500/50 transition-all placeholder-stone-600 text-center tracking-widest"
                autoFocus
              />
              {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}
            </div>
            <button 
              type="submit" 
              className="w-full py-3.5 rounded-xl bg-stone-100 text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors"
            >
              Unlock
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0a09] pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Admin Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <span className="text-orange-500 font-bold tracking-[0.2em] uppercase text-xs mb-2 block">CMS 1.0</span>
            <h1 className="text-3xl font-light text-stone-100">Admin Dashboard</h1>
          </div>
          <button 
            type="button"
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center space-x-2 text-stone-500 hover:text-red-400 transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
          >
            <LogOut size={18} />
            <span className="text-xs uppercase tracking-widest font-bold">Logout</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 mb-8 border-b border-white/10">
          <button 
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`pb-4 px-2 text-sm uppercase tracking-widest font-bold transition-colors relative ${activeTab === 'projects' ? 'text-white' : 'text-stone-500 hover:text-stone-300'}`}
          >
            Projects
            {activeTab === 'projects' && <motion.div layoutId="adminTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500" />}
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('services')}
            className={`pb-4 px-2 text-sm uppercase tracking-widest font-bold transition-colors relative ${activeTab === 'services' ? 'text-white' : 'text-stone-500 hover:text-stone-300'}`}
          >
            Services
            {activeTab === 'services' && <motion.div layoutId="adminTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500" />}
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('photographs')}
            className={`pb-4 px-2 text-sm uppercase tracking-widest font-bold transition-colors relative ${activeTab === 'photographs' ? 'text-white' : 'text-stone-500 hover:text-stone-300'}`}
          >
            Photographs
            {activeTab === 'photographs' && <motion.div layoutId="adminTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500" />}
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('inbox')}
            className={`pb-4 px-2 text-sm uppercase tracking-widest font-bold transition-colors relative flex items-center gap-2 ${activeTab === 'inbox' ? 'text-white' : 'text-stone-500 hover:text-stone-300'}`}
          >
            Inbox
            <span className="bg-white/10 text-xs px-1.5 rounded-full">{submissions.length}</span>
            {activeTab === 'inbox' && <motion.div layoutId="adminTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500" />}
          </button>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* List View */}
          <div className="lg:col-span-1 space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            {activeTab === 'projects' ? (
              <>
                <button 
                  type="button"
                  onClick={() => {
                    setEditingProject({ id: '', title: '', category: '', imageUrl: '', videoUrl: '', description: '' });
                    setIsNewProject(true);
                  }}
                  className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-stone-500 hover:text-white hover:border-white/30 transition-all flex items-center justify-center gap-2 mb-4"
                >
                  <Plus size={20} />
                  <span className="text-xs font-bold uppercase tracking-widest">Add New Project</span>
                </button>
                
                {projects.map(project => (
                  <div 
                    key={project.id}
                    onClick={() => { setEditingProject(project); setIsNewProject(false); }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex gap-4 items-center ${editingProject?.id === project.id ? 'bg-white/10 border-orange-500' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                  >
                    <img src={project.imageUrl} alt={project.title} className="w-16 h-16 object-cover rounded-lg bg-black/50" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-stone-200 font-bold truncate">{project.title}</h3>
                      <p className="text-stone-500 text-xs uppercase tracking-wider">{project.category}</p>
                    </div>
                  </div>
                ))}
              </>
            ) : activeTab === 'services' ? (
              <>
                <button 
                  type="button"
                  onClick={() => {
                    setEditingService({ id: '', title: '', description: '' });
                    setIsNewService(true);
                  }}
                  className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-stone-500 hover:text-white hover:border-white/30 transition-all flex items-center justify-center gap-2 mb-4"
                >
                  <Plus size={20} />
                  <span className="text-xs font-bold uppercase tracking-widest">Add New Service</span>
                </button>
                {services.map(service => (
                  <div 
                    key={service.id}
                    onClick={() => { setEditingService(service); setIsNewService(false); }}
                    className={`p-6 rounded-xl border cursor-pointer transition-all ${editingService?.id === service.id ? 'bg-white/10 border-orange-500' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                  >
                    <h3 className="text-stone-200 font-bold text-lg">{service.title}</h3>
                    <p className="text-stone-500 text-xs mt-1 truncate">{service.description}</p>
                  </div>
                ))}
              </>
            ) : activeTab === 'photographs' ? (
              <>
                <button 
                  type="button"
                  onClick={() => {
                    setEditingPhotograph({ id: '', url: '', alt: '', aspectRatio: 'portrait' });
                    setIsNewPhotograph(true);
                  }}
                  className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-stone-500 hover:text-white hover:border-white/30 transition-all flex items-center justify-center gap-2 mb-4"
                >
                  <Plus size={20} />
                  <span className="text-xs font-bold uppercase tracking-widest">Add New Photograph</span>
                </button>
                {photographs.map(photo => (
                  <div 
                    key={photo.id}
                    onClick={() => { setEditingPhotograph(photo); setIsNewPhotograph(false); }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex gap-4 items-center ${editingPhotograph?.id === photo.id ? 'bg-white/10 border-orange-500' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                  >
                    <img src={photo.url} alt={photo.alt} className="w-16 h-16 object-cover rounded-lg bg-black/50" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-stone-200 font-bold truncate">{photo.alt || 'Untitled'}</h3>
                      <p className="text-stone-500 text-xs uppercase tracking-wider">{photo.aspectRatio}</p>
                    </div>
                  </div>
                ))}
              </>
            ) : (
                // Inbox List
                <>
                  <div className="flex justify-between items-center mb-4 px-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
                       Messages ({submissions.length})
                    </span>
                    <button 
                      type="button"
                      onClick={handleDownloadCSV}
                      className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-orange-500 hover:text-orange-400 bg-orange-500/10 hover:bg-orange-500/20 px-3 py-1.5 rounded-lg transition-colors"
                      title="Download CSV"
                    >
                      <Download size={12} /> CSV
                    </button>
                  </div>
                  {submissions.length === 0 ? (
                      <div className="text-center py-8 text-stone-500 text-sm">No messages yet.</div>
                  ) : (
                      submissions.map(msg => (
                          <div 
                              key={msg.id}
                              className="p-6 rounded-xl border border-white/5 bg-white/5 hover:border-white/20 transition-all space-y-3 relative group"
                          >
                              <div className="flex justify-between items-start">
                                  <div>
                                      <h3 className="text-white font-bold">{msg.name}</h3>
                                      <p className="text-xs text-stone-500">{new Date(msg.date).toLocaleDateString()} • {new Date(msg.date).toLocaleTimeString()}</p>
                                  </div>
                                  <button 
                                      type="button"
                                      onClick={(e) => {
                                          e.stopPropagation();
                                          if(window.confirm("Permanently delete this message?")) {
                                              deleteSubmission(msg.id);
                                          }
                                      }}
                                      className="relative z-10 text-stone-600 hover:text-red-400 p-2 -mr-2 -mt-2 rounded-full hover:bg-red-500/10 transition-colors"
                                      title="Delete"
                                  >
                                      <Trash2 size={16} />
                                  </button>
                              </div>
                              
                              <div className="flex items-center gap-2 text-xs text-orange-400/80 font-mono">
                                  <Mail size={12} /> {msg.email}
                              </div>
                              
                              {msg.contactNumber && (
                                  <div className="flex items-center gap-2 text-xs text-stone-400 font-mono">
                                      <Phone size={12} /> {msg.contactNumber}
                                  </div>
                              )}

                              <div className="flex flex-wrap gap-2">
                                  {msg.services.map(s => (
                                      <span key={s} className="px-2 py-1 bg-white/10 rounded text-[10px] uppercase text-stone-300">{s}</span>
                                  ))}
                              </div>
                          </div>
                      ))
                  )}
                </>
            )}
          </div>

          {/* Editor/View Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {activeTab === 'inbox' ? (
                 <div className="glass-panel p-8 rounded-2xl border border-white/10 h-full overflow-y-auto">
                    <h2 className="text-xl font-light text-white mb-6">Message Details</h2>
                    {submissions.length > 0 ? (
                        <div className="space-y-8">
                             {submissions.map(msg => (
                                 <div key={msg.id} className="border-b border-white/10 pb-8 mb-8 last:border-0">
                                     <div className="flex justify-between items-start mb-6">
                                         <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-black font-bold text-xl">
                                                {msg.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="text-lg text-white font-bold">{msg.name}</h3>
                                                <div className="flex flex-col gap-1 text-stone-400 text-sm">
                                                    <span className="flex items-center gap-2"><Mail size={14}/> {msg.email}</span>
                                                    {msg.contactNumber && (
                                                        <span className="flex items-center gap-2"><Phone size={14}/> {msg.contactNumber}</span>
                                                    )}
                                                </div>
                                            </div>
                                         </div>
                                         <div className="flex flex-col items-end gap-2">
                                            <span className="text-xs text-stone-500 font-mono">{new Date(msg.date).toLocaleString()}</span>
                                            <button 
                                                type="button"
                                                onClick={() => {
                                                    if(window.confirm("Permanently delete this message?")) {
                                                        deleteSubmission(msg.id);
                                                    }
                                                }}
                                                className="flex items-center gap-1.5 text-red-400 hover:text-red-300 text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-red-500/10 hover:bg-red-500/20 rounded transition-colors"
                                            >
                                                <Trash2 size={12} /> Delete
                                            </button>
                                         </div>
                                     </div>

                                     <div className="bg-black/20 rounded-xl p-6 border border-white/5">
                                         <p className="text-stone-300 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                                     </div>

                                     {msg.services.length > 0 && (
                                         <div className="mt-4 flex gap-2">
                                             {msg.services.map(s => (
                                                 <span key={s} className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-200 text-xs rounded-full uppercase tracking-wide">
                                                     {s}
                                                 </span>
                                             ))}
                                         </div>
                                     )}
                                 </div>
                             ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-stone-500">
                             <Mail size={48} className="mb-4 opacity-20" />
                             <p>Select a message from the list</p>
                        </div>
                    )}
                 </div>
              ) : activeTab === 'projects' && editingProject ? (
                <motion.div 
                  key="projectEditor"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass-panel p-8 rounded-2xl border border-white/10"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-light text-white">{isNewProject ? 'New Project' : 'Edit Project'}</h2>
                    {!isNewProject && (
                      <button 
                        type="button"
                        onClick={handleDeleteProject}
                        className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-900/20 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSaveProject} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs uppercase font-bold text-stone-500 flex items-center gap-2"><Type size={14}/> Title</label>
                        <input 
                          value={editingProject.title}
                          onChange={e => setEditingProject({...editingProject, title: e.target.value})}
                          className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-stone-200 outline-none focus:border-orange-500/50"
                          placeholder="Project Title"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs uppercase font-bold text-stone-500 flex items-center gap-2">Category</label>
                         <input 
                          value={editingProject.category}
                          onChange={e => setEditingProject({...editingProject, category: e.target.value})}
                          className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-stone-200 outline-none focus:border-orange-500/50"
                          placeholder="e.g. Commercial, Music Video"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold text-stone-500 flex items-center gap-2"><Image size={14}/> Thumbnail URL</label>
                        <input 
                          value={editingProject.imageUrl}
                          onChange={e => setEditingProject({...editingProject, imageUrl: e.target.value})}
                          className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-stone-200 outline-none focus:border-orange-500/50"
                          placeholder="https://..."
                          required
                        />
                         {editingProject.imageUrl && (
                            <div className="mt-2 w-full h-40 rounded-lg overflow-hidden bg-black/50 border border-white/5">
                              <img src={editingProject.imageUrl} className="w-full h-full object-cover opacity-70" alt="Preview" />
                            </div>
                         )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold text-stone-500 flex items-center gap-2"><Youtube size={14}/> Video URL</label>
                        <input 
                          value={editingProject.videoUrl || ''}
                          onChange={e => setEditingProject({...editingProject, videoUrl: e.target.value})}
                          className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-stone-200 outline-none focus:border-orange-500/50"
                          placeholder="YouTube Link"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold text-stone-500">Description</label>
                        <textarea 
                          value={editingProject.description}
                          onChange={e => setEditingProject({...editingProject, description: e.target.value})}
                          className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-stone-200 outline-none focus:border-orange-500/50 min-h-[100px]"
                          placeholder="Short description..."
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-4">
                      <button 
                        type="button" 
                        onClick={() => setEditingProject(null)}
                        className="px-6 py-3 rounded-xl hover:bg-white/5 text-stone-400 font-bold uppercase text-xs tracking-wider"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold uppercase text-xs tracking-wider flex items-center gap-2"
                      >
                        <Save size={16} /> Save Changes
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : activeTab === 'services' && editingService ? (
                 <motion.div 
                  key="serviceEditor"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass-panel p-8 rounded-2xl border border-white/10"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-light text-white">{isNewService ? 'New Service' : 'Edit Service'}</h2>
                    {!isNewService && (
                      <button 
                        type="button"
                        onClick={handleDeleteService}
                        className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-900/20 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                  <form onSubmit={handleSaveService} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-bold text-stone-500">Title</label>
                      <input 
                        value={editingService.title}
                        onChange={e => setEditingService({...editingService, title: e.target.value})}
                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-stone-200 outline-none focus:border-orange-500/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-bold text-stone-500">Description</label>
                      <textarea 
                        value={editingService.description}
                        onChange={e => setEditingService({...editingService, description: e.target.value})}
                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-stone-200 outline-none focus:border-orange-500/50 min-h-[150px]"
                        required
                      />
                    </div>
                    
                    <div className="pt-4 flex justify-end gap-4">
                      <button 
                        type="button" 
                        onClick={() => setEditingService(null)}
                        className="px-6 py-3 rounded-xl hover:bg-white/5 text-stone-400 font-bold uppercase text-xs tracking-wider"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold uppercase text-xs tracking-wider flex items-center gap-2"
                      >
                        <Save size={16} /> Save Changes
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : activeTab === 'photographs' && editingPhotograph ? (
                 <motion.div 
                  key="photographEditor"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass-panel p-8 rounded-2xl border border-white/10"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-light text-white">{isNewPhotograph ? 'New Photograph' : 'Edit Photograph'}</h2>
                    {!isNewPhotograph && (
                      <button 
                        type="button"
                        onClick={handleDeletePhotograph}
                        className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-900/20 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                  <form onSubmit={handleSavePhotograph} className="space-y-6">
                      <div className="space-y-2">
                          <label className="text-xs uppercase font-bold text-stone-500 flex items-center gap-2"><Image size={14}/> Image Upload</label>
                          <div 
                            onDrop={handleFileDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onClick={() => fileInputRef.current?.click()}
                            className={`w-full h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all ${
                              isDragging 
                                ? 'border-orange-500 bg-orange-500/10' 
                                : 'border-white/20 bg-black/30 hover:border-white/40 hover:bg-black/40'
                            }`}
                          >
                            <input 
                              type="file" 
                              ref={fileInputRef} 
                              onChange={handleFileInput} 
                              accept="image/jpeg,image/png,image/webp" 
                              className="hidden" 
                            />
                            {editingPhotograph.url ? (
                              <div className="w-full h-full relative overflow-hidden rounded-lg group">
                                <img src={editingPhotograph.url} className="w-full h-full object-cover opacity-80" alt="Preview" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <span className="text-white text-sm font-bold flex items-center gap-2"><UploadCloud size={16} /> Click or Drag to replace</span>
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center text-stone-400">
                                <UploadCloud size={32} className="mb-2 opacity-50" />
                                <p className="text-sm font-medium">Click or Drag Image Here</p>
                                <p className="text-xs opacity-60 mt-1">JPEG, PNG, WebP</p>
                              </div>
                            )}
                          </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase font-bold text-stone-500">Caption (Alt text)</label>
                        <input 
                          value={editingPhotograph.alt || ''}
                          onChange={e => setEditingPhotograph({...editingPhotograph, alt: e.target.value})}
                          className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-stone-200 outline-none focus:border-orange-500/50"
                          placeholder="e.g. Sunset in mountains"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase font-bold text-stone-500">Aspect Ratio</label>
                        <select
                          value={editingPhotograph.aspectRatio || 'portrait'}
                          onChange={e => setEditingPhotograph({...editingPhotograph, aspectRatio: e.target.value as 'portrait'|'landscape'|'square'})}
                          className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-stone-200 outline-none focus:border-orange-500/50 appearance-none"
                        >
                          <option value="portrait">Portrait</option>
                          <option value="landscape">Landscape</option>
                          <option value="square">Square</option>
                        </select>
                      </div>
                      <div className="pt-4 flex justify-end gap-4">
                        <button 
                          type="button" 
                          onClick={() => setEditingPhotograph(null)}
                          className="px-6 py-3 rounded-xl hover:bg-white/5 text-stone-400 font-bold uppercase text-xs tracking-wider"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit"
                          className="px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold uppercase text-xs tracking-wider flex items-center gap-2"
                        >
                          <Save size={16} /> Save Changes
                        </button>
                      </div>
                  </form>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-stone-600 border border-dashed border-white/5 rounded-2xl p-12">
                  <Edit2 size={48} className="mb-4 opacity-50" />
                  <p className="text-sm uppercase tracking-widest font-bold">Select an item to edit</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;