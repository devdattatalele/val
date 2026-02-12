import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Stars } from 'lucide-react';

import IntroSection from './components/IntroSection';
import CollageSection from './components/CollageSection';
import ProposalSection from './components/ProposalSection';
import MusicPlayer from './components/MusicPlayer';

function App() {
  const [currentSection, setCurrentSection] = useState('intro');

  const config = {
    name: "Rapunzel",
    nickname: "Bubu",
  };

  const handleNext = (section) => {
    setCurrentSection(section);
  };

  const triggerCelebration = () => {
    setCurrentSection('celebration');
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };
    const random = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <div className="app-container">
      {/* Grainy Texture Overlay */}
      <div className="texture-overlay"></div>
      
      {/* Subtle floating hearts and sparkles */}
      <div className="floating-hearts-container">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              color: i % 2 === 0 ? 'rgba(230, 57, 70, 0.1)' : 'rgba(255, 179, 193, 0.2)',
              left: `${10 + i * 12}%`,
            }}
            initial={{ y: typeof window !== 'undefined' ? window.innerHeight + 50 : 800 }}
            animate={{ y: -80, rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{
              duration: 20 + i * 4,
              repeat: Infinity,
              ease: "linear",
              delay: i * 3,
            }}
          >
            {i % 3 === 0 ? <Sparkles size={24} /> : <Heart fill="currentColor" size={16 + i * 6} />}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {currentSection === 'intro' && (
          <IntroSection key="intro" onComplete={() => handleNext('collage')} config={config} />
        )}
        
        {currentSection === 'collage' && (
          <CollageSection key="collage" onComplete={() => handleNext('proposal')} config={config} />
        )}
        
        {currentSection === 'proposal' && (
          <ProposalSection key="proposal" onYes={triggerCelebration} config={config} />
        )}
        
        {currentSection === 'celebration' && (
          <motion.div 
            key="celebration"
            className="section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-6 text-primary-color"
            >
              <Stars size={48} color="#e63946" />
            </motion.div>

            <motion.h1 
              className="celebration-title"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              She Said YES!
            </motion.h1>
            <motion.p
              className="celebration-subtitle"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              I love you so much, Rapunzel! 💕
            </motion.p>
            <motion.div
              className="relative"
              initial={{ rotate: -5, scale: 0 }}
              animate={{ rotate: -3, scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
            >
              <img 
                src="/img/valentine.jpg" 
                alt="Us" 
                className="celebration-photo"
              />
              <motion.div 
                className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-lg"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <Heart fill="#e63946" color="#e63946" size={32} />
              </motion.div>
            </motion.div>
            
            <motion.p
              style={{ marginTop: 40, fontFamily: 'Homemade Apple', fontSize: '1.4rem', color: '#444' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              Ek Kissy to my Gulab-jamun!!  ❤️
            </motion.p>
            <motion.button
              className="btn-outline"
              style={{ marginTop: 32, borderColor: '#ccc', color: '#666', fontSize: '0.9rem' }}
              onClick={() => setCurrentSection('intro')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              whileHover={{ scale: 1.05, borderColor: '#e63946', color: '#e63946' }}
              whileTap={{ scale: 0.95 }}
            >
              Replay Surprise ↺
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <MusicPlayer />
    </div>
  );
}

export default App;
