import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Activity, Brain, Bell, ArrowRight } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FeatureCard from '@/components/FeatureCard.jsx';
import GlowingButton from '@/components/GlowingButton.jsx';
import { useNavigate } from 'react-router-dom'; // 1. Import the hook

const HomePage = () => {
  const navigate = useNavigate(); // 2. Initialize the navigation function

  const features = [
    {
      icon: Activity,
      title: 'Real-time monitoring',
      description: 'Continuous 24/7 sensor data tracking across all critical engine components. Our advanced telemetry system captures temperature, vibration, pressure, and performance metrics in real-time.'
    },
    {
      icon: Brain,
      title: 'ML forecasting',
      description: 'Predict Remaining Useful Life (RUL) with precision using Support Vector Machines and Logistic Regression. Our models analyze historical patterns to forecast failures before they occur.'
    },
    {
      icon: Bell,
      title: 'Smart alerts',
      description: 'Automated maintenance scheduling based on predictive insights. Receive actionable notifications when intervention is needed, reducing downtime by 47.2% on average.'
    }
  ];

  // 3. Create a helper function for navigation
  const handleLaunchApp = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <Helmet>
        <title>AeroPredict AI - Predict Engine Failures Before They Happen</title>
        <meta name="description" content="AI-driven engine longevity prediction. Prevent crashes, reduce costs, and optimize maintenance with real-time monitoring and machine learning forecasting." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1591380371630-5189812d45a0"
              alt="Aircraft engine close-up"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background" />
          </div>

          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-primary/20 rounded-full glow-cyan animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 border border-primary/20 rounded-full glow-cyan animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6" style={{ letterSpacing: '-0.02em' }}>
                Predict the <span className="text-gradient-cyan glow-text">Unpredictable</span>
                <br />
                AI-Driven Engine Longevity
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 max-w-3xl mx-auto">
                Prevent catastrophic engine failures and reduce maintenance costs by 63% with machine learning-powered predictive analytics. Know when to act, before it's too late.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* 4. Add onClick to Launch App */}
                <GlowingButton size="lg" onClick={handleLaunchApp}>
                  Launch App
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </GlowingButton>
                <GlowingButton variant="outline" size="lg">
                  View Demo
                </GlowingButton>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-primary mb-2">94.7%</div>
                  <div className="text-sm text-muted-foreground">Prediction accuracy</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-primary mb-2">$2.4M</div>
                  <div className="text-sm text-muted-foreground">Average cost savings</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-primary mb-2">47.2%</div>
                  <div className="text-sm text-muted-foreground">Downtime reduction</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                How it works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Three core capabilities that transform raw sensor data into actionable intelligence
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 0.1}
                />
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-16"
            >
              {/* 5. Add onClick here too */}
              <GlowingButton size="lg" onClick={handleLaunchApp}>
                Launch App
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </GlowingButton>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;