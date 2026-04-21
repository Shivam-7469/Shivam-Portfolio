import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProjectItem, ServiceItem, ContactSubmission, Photograph } from '../types';
import { PROJECTS as INITIAL_PROJECTS, SERVICES as INITIAL_SERVICES, PHOTOGRAPHS as INITIAL_PHOTOGRAPHS } from '../constants';

interface ContentContextType {
  projects: ProjectItem[];
  services: ServiceItem[];
  submissions: ContactSubmission[];
  photographs: Photograph[];
  updateProject: (project: ProjectItem) => void;
  addProject: (project: ProjectItem) => void;
  deleteProject: (id: string) => void;
  updateService: (service: ServiceItem) => void;
  addService: (service: ServiceItem) => void;
  deleteService: (id: string) => void;
  addSubmission: (submission: Omit<ContactSubmission, 'id' | 'date' | 'read'>) => void;
  deleteSubmission: (id: string) => void;
  addPhotograph: (photo: Photograph) => void;
  updatePhotograph: (photo: Photograph) => void;
  deletePhotograph: (id: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem('site_projects');
      if (saved) {
        return JSON.parse(saved);
      }
      return INITIAL_PROJECTS;
    } catch (e) {
      return INITIAL_PROJECTS;
    }
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem('site_services');
      if (saved) {
        return JSON.parse(saved);
      }
      return INITIAL_SERVICES;
    } catch (e) {
      return INITIAL_SERVICES;
    }
  });

  const [submissions, setSubmissions] = useState<ContactSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('site_submissions');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [photographs, setPhotographs] = useState<Photograph[]>(() => {
    try {
      const saved = localStorage.getItem('site_photographs');
      if (saved) {
        return JSON.parse(saved);
      }
      return INITIAL_PHOTOGRAPHS;
    } catch (e) {
      return INITIAL_PHOTOGRAPHS;
    }
  });

  useEffect(() => {
    localStorage.setItem('site_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('site_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('site_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('site_photographs', JSON.stringify(photographs));
  }, [photographs]);

  const updateProject = (updatedProject: ProjectItem) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const addProject = (newProject: ProjectItem) => {
    setProjects(prev => [...prev, newProject]);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const updateService = (updatedService: ServiceItem) => {
    setServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
  };

  const addService = (newService: ServiceItem) => {
    setServices(prev => [...prev, newService]);
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const addSubmission = (data: Omit<ContactSubmission, 'id' | 'date' | 'read'>) => {
    const newSubmission: ContactSubmission = {
      ...data,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      read: false
    };
    setSubmissions(prev => [newSubmission, ...prev]);
  };

  const deleteSubmission = (id: string) => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
  };

  const addPhotograph = (newPhoto: Photograph) => {
    setPhotographs(prev => [newPhoto, ...prev]);
  };

  const updatePhotograph = (updatedPhoto: Photograph) => {
    setPhotographs(prev => prev.map(p => p.id === updatedPhoto.id ? updatedPhoto : p));
  };

  const deletePhotograph = (id: string) => {
    setPhotographs(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ContentContext.Provider value={{ 
      projects, 
      services, 
      submissions, 
      photographs,
      updateProject, 
      addProject, 
      deleteProject, 
      updateService,
      addService,
      deleteService,
      addSubmission,
      deleteSubmission,
      addPhotograph,
      updatePhotograph,
      deletePhotograph
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error("useContent must be used within ContentProvider");
  return context;
};