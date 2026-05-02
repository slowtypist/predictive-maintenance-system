import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Linkedin, Twitter, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' }
  ];

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <span className="text-lg font-bold text-secondary-foreground">
              AeroPredict <span className="text-primary">AI</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row items-start md:items-center md:justify-center space-y-2 md:space-y-0 md:space-x-6">
            <Link to="/privacy" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors duration-200">
              Terms of Service
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4 md:justify-end">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-lg bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-sm text-secondary-foreground/60">
            © {currentYear} AeroPredict AI. Preventing engine failures through intelligent prediction.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;