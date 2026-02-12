import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Photo list is updated by: node scripts/rename-photos.js
import photoList from '../photo-list.json';

const ALL_PHOTOS = Array.isArray(photoList) && photoList.length > 0
  ? photoList
  : [
      { src: '/img/photos/photo1.jpg', caption: 'Us being us' },
      { src: '/img/photos/photo2.jpg', caption: 'Cute moment' },
    ];

// Lightbox component for viewing a single photo full-screen
const Lightbox = ({ photo, onClose }) => {
  if (!photo) return null;
  return (
    <motion.div 
      className="lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="lightbox-content"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={photo.src} alt={photo.caption} className="lightbox-img" />
        <p className="lightbox-caption">{photo.caption}</p>
        <button className="lightbox-close" onClick={onClose}>✕</button>
      </motion.div>
    </motion.div>
  );
};

// Collage layouts for different grid sizes
const getCollageStyle = (index, total) => {
  // Create varied sizes for a natural collage look
  const patterns = [
    { gridColumn: 'span 2', gridRow: 'span 2' }, // Large
    { gridColumn: 'span 1', gridRow: 'span 1' }, // Small
    { gridColumn: 'span 1', gridRow: 'span 2' }, // Tall
    { gridColumn: 'span 1', gridRow: 'span 1' }, // Small
    { gridColumn: 'span 2', gridRow: 'span 1' }, // Wide
    { gridColumn: 'span 1', gridRow: 'span 1' }, // Small
  ];
  return patterns[index % patterns.length];
};

const CollageSection = ({ onComplete, config }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loadedPhotos, setLoadedPhotos] = useState([]);
  const scrollRef = useRef(null);

  // Track which photos actually exist (have loaded successfully)
  useEffect(() => {
    const checkPhotos = async () => {
      const valid = [];
      for (const photo of ALL_PHOTOS) {
        try {
          const img = new Image();
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = photo.src;
          });
          valid.push(photo);
        } catch {
          // Photo doesn't exist, skip it
        }
      }
      setLoadedPhotos(valid.length > 0 ? valid : ALL_PHOTOS.slice(0, 4)); // Fallback to first 4
    };
    checkPhotos();
  }, []);

  return (
    <motion.div 
      className="collage-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="collage-header">
        <motion.h2 
          className="collage-title"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Our Story in Pictures 📸
        </motion.h2>
        <motion.p 
          className="collage-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Here are some of our memories — the stupid, the cute, the lovely.
        </motion.p>
      </div>

      {/* Collage Grid */}
      <div className="collage-grid" ref={scrollRef}>
        {(loadedPhotos.length > 0 ? loadedPhotos : ALL_PHOTOS.slice(0, 4)).map((photo, index) => {
          const sizeStyle = getCollageStyle(index, loadedPhotos.length);
          return (
            <motion.div
              key={index}
              className="collage-item"
              style={sizeStyle}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(index * 0.06, 1.5), duration: 0.4 }}
              whileHover={{ scale: 1.03, zIndex: 10 }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <img 
                src={photo.src} 
                alt={photo.caption}
                className="collage-img"
                onError={(e) => {
                  e.target.parentElement.style.display = 'none';
                }}
              />
              <div className="collage-item-overlay">
                <span>{photo.caption}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Continue Button */}
      <div className="collage-footer">
        <motion.button
          className="btn-primary"
          onClick={onComplete}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          One last thing from my heart... →
        </motion.button>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CollageSection;
