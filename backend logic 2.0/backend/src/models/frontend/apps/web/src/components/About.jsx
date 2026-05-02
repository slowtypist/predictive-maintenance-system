import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Clock } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Award, value: '50+', label: 'Awards Won' },
    { icon: Users, value: '200+', label: 'Happy Clients' },
    { icon: Clock, value: '10+', label: 'Years Experience' }
  ];

  return (
    <section id="about" className="py-24 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-[32px] uppercase font-light text-foreground">
              About Our Studio
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base">
              We are a team of passionate designers dedicated to creating spaces that inspire and delight. With over a decade of experience, we've transformed countless homes and commercial spaces into beautiful, functional environments.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base">
              Our approach combines timeless design principles with contemporary aesthetics, ensuring every project is both beautiful and practical.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center p-6 bg-card border border-border rounded-xl"
              >
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mx-auto mb-4 rounded-lg">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-light text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;