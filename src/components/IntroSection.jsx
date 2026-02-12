import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroSection = ({ onComplete, config }) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Auto-advance through the sequence
  React.useEffect(() => {
    if (currentStep < 7) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, currentStep === 0 ? 2200 : currentStep === 6 ? 3200 : 2800); // Slightly adjusted timing
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <motion.div 
      className="section"
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
    >
      <AnimatePresence mode="wait">
        {/* Step 0: Greeting */}
        {currentStep === 0 && (
          <motion.div
            key="greeting"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="intro-step"
          >
            <h1 className="intro-title">
              Hey <span className="name-highlight">{config.name}</span>
            </h1>
            <p className="intro-subtitle">My {config.nickname}, my Babudya...</p>
          </motion.div>
        )}

        {/* Step 1: Valentine's Day */}
        {currentStep === 1 && (
          <motion.div
            key="valentine"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="intro-step"
          >
            <h2 className="valentine-heading">It's Valentine's Day!!! :D</h2>
          </motion.div>
        )}

        {/* Step 2: Simple message */}
        {currentStep === 2 && (
          <motion.div
            key="message"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="intro-step"
          >
            <div className="simple-message-box">
              Hey Saheli... I know I messed up. So this is me trying to do it the right way.
            </div>
          </motion.div>
        )}

        {/* Step 3: Angry text */}
        {currentStep === 3 && (
          <motion.div
            key="angry"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6 }}
            className="intro-step"
          >
            <p className="intro-text">
              I know you're angry with me... and #NYK-333547161-2143556
            </p>
          </motion.div>
        )}

        {/* Step 4: Call wasn't enough */}
        {currentStep === 4 && (
          <motion.div
            key="call"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6 }}
            className="intro-step"
          >
            <p className="intro-text">
              Asking on a call wasn't enough effort for someone as special as you.
            </p>
          </motion.div>
        )}

        {/* Step 5: Parents were there */}
        {currentStep === 5 && (
          <motion.div
            key="parents"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6 }}
            className="intro-step"
          >
            <p className="intro-text">
              I wanted to meet you but your parents were there...
            </p>
            <p className="intro-text-secondary">So I stopped and thought...</p>
          </motion.div>
        )}

        {/* Step 6: Something special */}
        {currentStep === 6 && (
          <motion.div
            key="special"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6 }}
            className="intro-step"
          >
            <p className="intro-text">
              I wanted to do something <span className="special-word">special</span>.
            </p>
            <p className="intro-text-secondary">Because you are not ordinary to me.</p>
          </motion.div>
        )}

        {/* Step 7: Banku + Button */}
        {currentStep === 7 && (
          <motion.div
            key="banku"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="intro-step"
          >
            <motion.div 
              className="intro-banku"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Even <span className="banku-name">Banku</span> agrees you deserve better! 🐱
            </motion.div>

            <motion.button
              className="btn-primary"
              onClick={onComplete}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See Our Memories →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default IntroSection;
