import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Work from './pages/Work';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { AnimatePresence, motion } from 'framer-motion';
import { ContentProvider } from './context/ContentContext';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          } 
        />
        <Route 
          path="/work" 
          element={
            <PageWrapper>
              <Work />
            </PageWrapper>
          } 
        />
        <Route 
          path="/services" 
          element={
            <PageWrapper>
              <Services />
            </PageWrapper>
          } 
        />
        <Route 
          path="/about" 
          element={
            <PageWrapper>
              <About />
            </PageWrapper>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <PageWrapper>
              <Contact />
            </PageWrapper>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <PageWrapper>
              <Admin />
            </PageWrapper>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, filter: 'blur(10px)' }}
    animate={{ opacity: 1, filter: 'blur(0px)' }}
    exit={{ opacity: 0, filter: 'blur(10px)' }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

const LiquidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
      {/* Primary Orange Blob */}
      <motion.div
        animate={{
          x: ["-20%", "80%", "40%", "-20%"],
          y: ["-20%", "20%", "80%", "-20%"],
          scale: [1, 1.4, 0.8, 1],
          rotate: [0, 90, 180, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-orange-500/20 rounded-full blur-[120px] mix-blend-screen opacity-60"
      />
      
      {/* Secondary Amber Blob (Counter-movement) */}
      <motion.div
        animate={{
          x: ["100%", "0%", "60%", "100%"],
          y: ["100%", "60%", "0%", "100%"],
          scale: [1.2, 0.9, 1.3, 1.2],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-amber-600/15 rounded-full blur-[140px] mix-blend-screen opacity-50"
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ContentProvider>
      <Router>
        <div className="bg-[#0c0a09] min-h-screen text-stone-100 selection:bg-stone-100 selection:text-black flex flex-col relative">
          <LiquidBackground />
          <Navbar />
          <main className="flex-grow z-10">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </ContentProvider>
  );
};

export default App;
