import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Envelope = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(onOpen, 900);
  };

  return (
    <div className="envelope-wrapper" onClick={handleOpen}>
      <motion.div 
        className="envelope"
        whileHover={{ scale: 1.03, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}
      >
        {/* Flap */}
        <motion.div 
          className="envelope-flap"
          animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: 'preserve-3d', transformOrigin: 'top center' }}
        />
        
        {/* Letter Inside */}
        <motion.div 
          className="envelope-letter"
          style={{ zIndex: 10 }}
          animate={isOpen ? { y: -120, scale: 1.3, opacity: 0 } : { y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span className="envelope-letter-emoji">💌</span>
          <p className="envelope-letter-text">For Rapunzel</p>
        </motion.div>

        {!isOpen && (
          <div className="envelope-click-text" style={{ zIndex: 30 }}>
            Click to Open
          </div>
        )}
      </motion.div>
    </div>
  );
};

const ProposalSection = ({ onYes }) => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = useState(0);

  const moveNoButton = () => {
    // Move button to a random position that's far from current mouse
    const x = (Math.random() - 0.5) * 300;
    const y = (Math.random() - 0.5) * 250;
    setNoBtnPosition({ x, y });
    setHoverCount(prev => prev + 1);
  };

  const getNoButtonText = () => {
    const texts = [
      "No",
      "Wait... are you sure?",
      "Really??",
      "Think about Banku! 🐱",
      "Please? 🥺",
      "Don't break my heart 💔",
      "Just say YES! ❤️",
    ];
    return texts[Math.min(hoverCount, texts.length - 1)];
  };

  if (!isEnvelopeOpen) {
    return (
      <motion.div 
        className="section"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Envelope onOpen={() => setIsEnvelopeOpen(true)} />
      </motion.div>
    );
  }

  return (
    <motion.div className="section">
      <motion.div 
        className="proposal-card"
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
      >
        <motion.h2 
          className="proposal-heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          My Dearest Rapunzel...
        </motion.h2>
        
        <motion.p 
          className="proposal-message"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          You make my world brighter, my smile wider, and my heart fuller. 
          I promise to always make an effort, to surprise you, and to love you more every day.
        </motion.p>

        <motion.h3 
          className="proposal-question"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Will you be my Valentine<br/>
          <span className="accent">& Prom Partner?</span> 🌹
        </motion.h3>

        <div className="proposal-buttons">
          <motion.button
            className="btn-yes"
            onClick={onYes}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, type: "spring" }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            YES! I'd Love To! 💕
          </motion.button>

          <motion.button
            className="btn-no"
            onMouseEnter={moveNoButton}
            onMouseOver={moveNoButton}
            onClick={(e) => {
              e.preventDefault();
              moveNoButton();
            }}
            animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1, x: noBtnPosition.x, y: noBtnPosition.y }}
            style={{ 
              position: hoverCount > 0 ? 'fixed' : 'relative',
              zIndex: hoverCount > 0 ? 100 : 1,
            }}
          >
            {getNoButtonText()}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProposalSection;
