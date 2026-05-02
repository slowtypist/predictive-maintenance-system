import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const handleReadMore = () => {
    const section = document.getElementById('features');
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const featuredProjects = [{
    title: 'Eclipse Haven',
    src: "https://horizons-cdn.hostinger.com/7fcb39f5-514c-47b5-8f2e-5950281f47b6/karolina-grabowska-qcweohhvddq-unsplash-tvDNK.jpg",
    alt: "Modern house on a rocky shore at dusk"
  }, {
    title: 'Aurora Crest',
    src: "https://horizons-cdn.hostinger.com/7fcb39f5-514c-47b5-8f2e-5950281f47b6/sumaid-pal-singh-bakshi-sdjcbl3ck4a-unsplash-Yl6VZ.jpg",
    alt: "Abstract architectural detail with a sliver of light"
  }];

  return (
    <section className="relative h-screen min-h-[900px] md:min-h-[700px] text-foreground flex flex-col justify-end isolate">
      <div className="absolute inset-0 w-full h-full -z-10">
        <img className="w-full h-full object-cover" alt="Sleek, futuristic architectural building exterior" src="https://horizons-cdn.hostinger.com/7fcb39f5-514c-47b5-8f2e-5950281f47b6/meli-system-knhgrbih7ay-unsplash-VGsdU.jpg" />
        <div className="absolute inset-0 bg-background/60"></div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-6 pb-12">
        <div className="grid lg:grid-cols-2 gap-8 items-end">
          {/* LEFT SIDE - Vision */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="flex-shrink-0">
            <p className="text-sm tracking-wider text-primary">INTERIOR DESIGN STUDIO</p>
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">EVOLVE YOUR SPACE</h1>
          </motion.div>

          {/* RIGHT SIDE - Content */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} className="space-y-8">
            {/* Mobile: Description first */}
            <p className="md:hidden text-sm leading-relaxed text-muted-foreground">
              Evolved Studio redefines spaces, where innovation meets timeless elegance.
            </p>
            
            {/* Project Cards */}
            <div className="grid grid-cols-2 gap-4">
              {featuredProjects.map((project, index) => (
                <div key={index} className="relative group overflow-hidden max-h-[360px] border border-border/30 rounded-lg">
                  <img src={project.src} alt={project.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-background/40 transition-all duration-300"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="font-light tracking-wide text-foreground">{project.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Description and button after cards */}
            <div className="hidden md:grid md:grid-cols-2 gap-8 items-end">
              <p className="text-sm leading-relaxed text-muted-foreground">Evolved Studio redefines spaces, where innovation meets timeless elegance.</p>
              <button onClick={handleReadMore} className="flex items-center gap-3 text-sm tracking-wider group justify-self-end text-primary hover:text-primary/80 transition-colors">
                <span>EXPLORE MORE</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Mobile: Button after cards */}
            <button onClick={handleReadMore} className="flex md:hidden items-center gap-3 text-sm tracking-wider group justify-self-start text-primary hover:text-primary/80 transition-colors">
              <span>EXPLORE MORE</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;