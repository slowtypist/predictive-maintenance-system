import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Circle, CircleDot } from 'lucide-react';

const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('right');
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const portfolioImages = [
    {
      src: 'https://images.unsplash.com/photo-1737305467768-cfcbf106a535',
      alt: 'Spacious open-concept office',
      title: 'Innovative Workspace',
      category: 'Commercial'
    },
    {
      src: 'https://horizons-cdn.hostinger.com/7fcb39f5-514c-47b5-8f2e-5950281f47b6/458084c01a6eef19fb80c2c8aadf3c4d.jpg',
      alt: 'Modern living room with minimalist decor',
      title: 'Serene Living Space',
      category: 'Residential'
    },
    {
      src: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
      alt: 'Sleek kitchen with marble countertops',
      title: 'Urban Hub',
      category: 'Residential'
    },
    {
      src: 'https://horizons-cdn.hostinger.com/7fcb39f5-514c-47b5-8f2e-5950281f47b6/8f1cc3c0e993b92351237f5700034e8a.jpg',
      alt: 'Cozy bedroom with natural light',
      title: 'Restful Sanctuary',
      category: 'Residential'
    },
  ];

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = portfolioImages.map((image) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = image.src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 1, 1]
      }
    }
  };

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % portfolioImages.length);
  };

  const handlePrev = () => {
    setDirection('left');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + portfolioImages.length) % portfolioImages.length);
  };

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  return (
    <section id="portfolio" className="py-24 px-6 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-[32px] uppercase font-light text-foreground mb-4 pb-10 md:pb-0">
            Our work
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of slick and modern interior design
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }} 
          className="relative h-[60vh] max-h-[600px] w-full mx-auto rounded-2xl overflow-hidden border border-border"
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={currentIndex}
              variants={slideVariants}
              initial={direction === 'right' ? 'hiddenRight' : 'hiddenLeft'}
              animate="visible"
              exit="exit"
              className="w-full h-full absolute"
            >
              <img
                src={portfolioImages[currentIndex].src}
                alt={portfolioImages[currentIndex].alt}
                className="w-full h-full object-cover shadow-2xl"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-foreground">
                <p className="text-sm tracking-widest uppercase text-primary">{portfolioImages[currentIndex].category}</p>
                <h3 className="text-3xl font-light mt-2 mb-10">{portfolioImages[currentIndex].title}</h3>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between items-center px-4 z-10">
            <motion.button 
              onClick={handlePrev} 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-background/50 hover:bg-background text-foreground p-3 rounded-full shadow-md transition-all duration-300 backdrop-blur-sm border border-border"
            >
              <ArrowLeft size={24} />
            </motion.button>
            <motion.button 
              onClick={handleNext} 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-background/50 hover:bg-background text-foreground p-3 rounded-full shadow-md transition-all duration-300 backdrop-blur-sm border border-border"
            >
              <ArrowRight size={24} />
            </motion.button>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {portfolioImages.map((_, index) => (
              <motion.button 
                key={index} 
                onClick={() => handleDotClick(index)} 
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="transition-all duration-300"
              >
                {currentIndex === index 
                  ? <CircleDot size={14} className="text-primary" /> 
                  : <Circle size={14} className="text-muted-foreground hover:text-primary" />
                }
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="hidden">
          {portfolioImages.map((image, index) => (
            <img key={index} src={image.src} alt="" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;