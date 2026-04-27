import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Activity, Brain, Bell, TrendingUp, Shield, Zap, ChevronDown } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
const FeaturesPage = () => {
  const [expandedFeature, setExpandedFeature] = useState(null);
  const features = [{
    icon: Activity,
    title: 'Real-time monitoring',
    subtitle: '24/7 sensor data tracking',
    description: 'Our advanced telemetry system continuously monitors critical engine parameters across all components. Temperature sensors, vibration detectors, pressure gauges, and performance metrics are tracked in real-time with millisecond precision.',
    benefits: ['Instant anomaly detection', 'Multi-sensor data fusion', 'Cloud-based data storage', 'Historical trend analysis'],
    metrics: {
      'Data points/sec': '12,847',
      'Sensors monitored': '284',
      'Response time': '<50ms'
    }
  }, {
    icon: Brain,
    title: 'ML forecasting',
    subtitle: 'Predictive analytics with SVM & Logistic Regression',
    description: 'Our machine learning models analyze years of historical data to predict Remaining Useful Life (RUL) with industry-leading accuracy. Support Vector Machines identify complex failure patterns while Logistic Regression provides probability-based risk assessment.',
    benefits: ['RUL prediction accuracy: 94.7%', 'Early failure detection: 30-45 days advance notice', 'Continuous model improvement', 'Multi-variable pattern recognition'],
    metrics: {
      'Prediction accuracy': '94.7%',
      'False positives': '2.3%',
      'Training data': '847K cycles'
    }
  }, {
    icon: Bell,
    title: 'Smart alerts',
    subtitle: 'Automated maintenance scheduling',
    description: 'Receive intelligent notifications when maintenance is needed, not just when thresholds are crossed. Our system prioritizes alerts based on severity, operational context, and maintenance windows to minimize disruption.',
    benefits: ['Priority-based alert routing', 'Maintenance window optimization', 'Multi-channel notifications', 'Integration with existing systems'],
    metrics: {
      'Downtime reduction': '47.2%',
      'Alert accuracy': '91.8%',
      'Response time': '< 2 min'
    }
  }, {
    icon: TrendingUp,
    title: 'Performance optimization',
    subtitle: 'Efficiency insights and recommendations',
    description: 'Beyond failure prediction, our system identifies opportunities to improve engine performance and fuel efficiency. Machine learning models detect suboptimal operating conditions and suggest corrective actions.',
    benefits: ['Fuel efficiency gains: 8-12%', 'Performance benchmarking', 'Operating envelope optimization', 'Automated tuning recommendations'],
    metrics: {
      'Efficiency gain': '11.3%',
      'Cost savings': '$2.4M/year',
      'ROI': '340%'
    }
  }, {
    icon: Shield,
    title: 'Safety compliance',
    subtitle: 'Regulatory reporting and audit trails',
    description: 'Maintain comprehensive records of all maintenance activities, predictions, and interventions. Our system generates audit-ready reports that meet aviation safety standards and regulatory requirements.',
    benefits: ['Automated compliance reporting', 'Complete audit trail', 'Regulatory standard alignment', 'Digital maintenance logs'],
    metrics: {
      'Compliance rate': '100%',
      'Audit time saved': '73%',
      'Report generation': 'Instant'
    }
  }, {
    icon: Zap,
    title: 'Rapid deployment',
    subtitle: 'Quick integration with existing systems',
    description: 'Get up and running in days, not months. Our platform integrates seamlessly with existing maintenance management systems, sensor networks, and data infrastructure through standard APIs and protocols.',
    benefits: ['Plug-and-play sensor integration', 'API-first architecture', 'Cloud or on-premise deployment', 'Minimal training required'],
    metrics: {
      'Setup time': '3-5 days',
      'Integration APIs': '12+',
      'Uptime': '99.97%'
    }
  }];
  return <>
      <Helmet>
        <title>Features - AeroPredict AI</title>
        <meta name="description" content="Explore the powerful features of AeroPredict AI: real-time monitoring, ML forecasting, smart alerts, and more. Prevent engine failures with cutting-edge technology." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{
              letterSpacing: '-0.02em'
            }}>
                Platform <span className="text-gradient-cyan">features</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Comprehensive engine health management powered by advanced machine learning and real-time analytics
              </p>
            </motion.div>

            {/* Dashboard Preview */}
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="relative rounded-2xl overflow-hidden border border-primary/20 glow-cyan">
              <img src="https://horizons-cdn.hostinger.com/7fcb39f5-514c-47b5-8f2e-5950281f47b6/oskar-kadaksoo-mkh27bpcpgc-unsplash-zD5cZ.jpg" alt="AeroPredict AI dashboard interface showing real-time engine monitoring" className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {features.map((feature, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true,
              margin: "-100px"
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} className="bg-card rounded-2xl border border-primary/20 overflow-hidden hover:border-primary/40 transition-all duration-300">
                  <button onClick={() => setExpandedFeature(expandedFeature === index ? null : index)} className="w-full p-8 text-left hover:bg-primary/5 transition-colors duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-1 text-card-foreground">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {feature.subtitle}
                          </p>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-200 flex-shrink-0 ${expandedFeature === index ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {expandedFeature === index && <motion.div initial={{
                height: 0,
                opacity: 0
              }} animate={{
                height: 'auto',
                opacity: 1
              }} exit={{
                height: 0,
                opacity: 0
              }} transition={{
                duration: 0.3
              }} className="px-8 pb-8">
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {feature.description}
                      </p>

                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-card-foreground mb-3">Key benefits</h4>
                        <ul className="space-y-2">
                          {feature.benefits.map((benefit, i) => <li key={i} className="flex items-start space-x-2 text-sm text-muted-foreground">
                              <span className="text-primary mt-0.5">•</span>
                              <span>{benefit}</span>
                            </li>)}
                        </ul>
                      </div>

                      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                        {Object.entries(feature.metrics).map(([key, value]) => <div key={key}>
                            <div className="text-lg font-bold text-primary">{value}</div>
                            <div className="text-xs text-muted-foreground">{key}</div>
                          </div>)}
                      </div>
                    </motion.div>}
                </motion.div>)}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>;
};
export default FeaturesPage;