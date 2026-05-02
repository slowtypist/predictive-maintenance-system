import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Target, Eye, TrendingUp, Users } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
const AboutPage = () => {
  const impactMetrics = [{
    icon: TrendingUp,
    value: '2,847',
    label: 'Engines monitored',
    description: 'Across commercial and private aviation'
  }, {
    icon: Users,
    value: '94.7%',
    label: 'Prediction accuracy',
    description: 'Industry-leading failure forecasting'
  }, {
    icon: Target,
    value: '$2.4M',
    label: 'Average savings',
    description: 'Per client annually'
  }];
  return <>
      <Helmet>
        <title>About - AeroPredict AI</title>
        <meta name="description" content="Learn about AeroPredict AI's mission to prevent engine failures through intelligent prediction. Our vision for safer, more efficient aviation." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section with Background */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="https://horizons-cdn.hostinger.com/7fcb39f5-514c-47b5-8f2e-5950281f47b6/eduardo-buscariolli-znkuv5-vadk-unsplash-SLSxU.jpg" alt="Advanced aerospace technology and engineering" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/85 to-background" />
          </div>

          <div className="absolute inset-0 bg-grid-pattern opacity-20" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6" style={{
              letterSpacing: '-0.02em'
            }}>
                Preventing failures,
                <br />
                <span className="text-gradient-cyan glow-text">saving lives</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Our mission is to eliminate catastrophic engine failures through predictive intelligence
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Our mission</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Every year, engine failures cost the aviation industry billions in unplanned maintenance, flight delays, and safety incidents. We believe these failures are preventable.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  AeroPredict AI was founded by aerospace engineers and data scientists who witnessed firsthand the devastating impact of unexpected engine failures. We built a platform that combines deep domain expertise with cutting-edge machine learning to predict failures before they happen.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our mission is simple: use artificial intelligence to make aviation safer, more reliable, and more cost-effective. We're not just predicting failures — we're preventing them.
                </p>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              x: 30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }} className="relative">
                <div className="bg-card rounded-2xl p-8 border border-primary/20 glow-cyan">
                  <h3 className="text-2xl font-semibold mb-6 text-card-foreground">Why it matters</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground">
                        <span className="font-semibold text-card-foreground">Safety first:</span> Prevent catastrophic failures that put lives at risk
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground">
                        <span className="font-semibold text-card-foreground">Cost reduction:</span> Avoid expensive emergency repairs and flight cancellations
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground">
                        <span className="font-semibold text-card-foreground">Operational efficiency:</span> Optimize maintenance schedules and reduce downtime
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground">
                        <span className="font-semibold text-card-foreground">Environmental impact:</span> Reduce waste and improve fuel efficiency
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }} className="order-2 lg:order-1">
                <div className="bg-card rounded-2xl p-8 border border-primary/20">
                  <h3 className="text-2xl font-semibold mb-6 text-card-foreground">The future of predictive maintenance</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We envision a world where engine failures are a thing of the past. Where maintenance is proactive, not reactive. Where airlines can operate with confidence, knowing their fleet is continuously monitored by intelligent systems.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Our platform is just the beginning. We're continuously improving our models, expanding our sensor capabilities, and developing new ways to extract insights from data. The goal: zero unexpected failures.
                  </p>
                </div>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              x: 30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }} className="order-1 lg:order-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-secondary-foreground">Our vision</h2>
                </div>
                <p className="text-lg text-secondary-foreground/80 leading-relaxed mb-6">
                  To become the global standard for engine health monitoring and predictive maintenance across all aviation sectors.
                </p>
                <p className="text-lg text-secondary-foreground/80 leading-relaxed">
                  We're building the infrastructure that will power the next generation of intelligent aircraft — where every component is monitored, every anomaly is detected, and every failure is prevented.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{
              letterSpacing: '-0.02em'
            }}>
                Our impact
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real results from real deployments
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {impactMetrics.map((metric, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} className="bg-card rounded-2xl p-8 border border-primary/20 text-center hover:border-primary/40 transition-all duration-300 hover:glow-cyan">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <metric.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">{metric.value}</div>
                  <div className="text-lg font-semibold text-card-foreground mb-2">{metric.label}</div>
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                </motion.div>)}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>;
};
export default AboutPage;