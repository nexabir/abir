import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Mail, Globe, ArrowUpRight, FolderGit2 } from 'lucide-react';

const Layout = ({ children, theme, toggleTheme, config }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about-section', label: 'About' },
    { id: 'services-section', label: 'Services' },
    { id: 'projects-section', label: 'Case Studies' },
    { id: 'experience-section', label: 'Experience' },
    { id: 'blog-section', label: 'Insights' },
    { id: 'contact-section', label: 'Contact' },
  ];

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (window.location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', overflowX: 'hidden', display: 'flex', flexDirection: 'column' }}>
      
      {/* Interactive Live Wallpaper */}
      {/* Background canvas handles subtle floating particle ambience */}

      {/* Sticky Top Navbar */}
      <header style={{
        position: 'fixed',
        top: scrolled ? '1rem' : '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        padding: '0.75rem 1.75rem',
        backgroundColor: scrolled ? 'var(--bg-panel)' : 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--border-color)',
        borderRadius: '50px',
        boxShadow: scrolled ? '0 10px 30px 0 rgba(0,0,0,0.25)' : 'none',
        transition: 'all 0.3s ease',
        width: 'auto',
        maxWidth: '92vw'
      }}>
        {/* Brand */}
        <div 
          onClick={() => {
            if (window.location.pathname !== '/') window.location.href = '/';
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{ 
            fontSize: '1.15rem', 
            fontWeight: 800, 
            color: 'var(--text-main)',
            cursor: 'pointer',
            letterSpacing: '-0.5px',
            whiteSpace: 'nowrap'
          }}
        >
          Md. Abir <span className="text-accent">Ul Islam</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {navItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => scrollToSection(item.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-main)',
                fontSize: '0.88rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap'
              }}
              onMouseOver={(e) => e.target.style.color = 'var(--accent)'}
              onMouseOut={(e) => e.target.style.color = 'var(--text-main)'}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            style={{
              background: 'var(--accent-glow)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title="Toggle Dark/Light Mode"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* LinkedIn Profile */}
          <a 
            href="https://www.linkedin.com/in/md-abir-ul-islam" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            style={{
              background: 'var(--accent-glow)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textDecoration: 'none'
            }}
            title="LinkedIn Profile"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            style={{
              background: 'var(--accent-glow)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '5.5rem',
          left: '5%',
          right: '5%',
          zIndex: 99,
          background: 'var(--bg-panel)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--border-color)',
          borderRadius: '24px',
          padding: '1.5rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-main)',
                fontSize: '1.05rem',
                fontWeight: 600,
                textAlign: 'left',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
                fontFamily: 'inherit'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'var(--accent-glow)';
                e.target.style.color = 'var(--accent)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = 'var(--text-main)';
              }}
            >
              {item.label}
            </button>
          ))}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', gap: '0.75rem' }}>
            <a 
              href="https://www.linkedin.com/in/md-abir-ul-islam" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary" 
              style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem', borderRadius: '50px' }}
            >
              LinkedIn Profile
            </a>
            <a 
              href="mailto:nexabir@gmail.com" 
              className="btn" 
              style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem', borderRadius: '50px' }}
            >
              Email Me
            </a>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main style={{ position: 'relative', zIndex: 5, padding: '0 2rem', flex: 1 }}>
        {children}
      </main>

      {/* Global Modern Footer */}
      <footer style={{
        position: 'relative',
        zIndex: 5,
        marginTop: '6rem',
        borderTop: '1px solid var(--border-color)',
        background: 'var(--bg-panel)',
        backdropFilter: 'blur(16px)',
        padding: '4rem 2rem 2.5rem'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          {/* Column 1: Identity & Availability */}
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Md. Abir <span className="text-accent">Ul Islam</span>
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Business Analyst & Strategy Planner helping growing businesses and performance agencies turn scattered data into automated KPI dashboards, actionable insights, and reliable monthly reports.
            </p>
            
            {/* Status Indicator */}
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '6px 14px', 
              background: 'rgba(34, 197, 94, 0.1)', 
              border: '1px solid rgba(34, 197, 94, 0.25)', 
              borderRadius: '20px',
              fontSize: '0.75rem',
              color: '#4ade80',
              fontWeight: 600
            }}>
              <span style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                background: '#22c55e',
                boxShadow: '0 0 8px #22c55e'
              }} />
              Available for US, UK & Global Remote Engagements
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-main)', letterSpacing: '0.5px' }}>
              Quick Navigation
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    textAlign: 'left',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    padding: 0,
                    fontFamily: 'inherit',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = 'var(--accent)'}
                  onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
                >
                  {item.label}
                </button>
              ))}
              <a 
                href="/admin" 
                style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}
                onMouseOver={(e) => e.target.style.color = 'var(--accent)'}
                onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
              >
                Admin OS
              </a>
            </div>
          </div>

          {/* Column 3: Direct Connect */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-main)', letterSpacing: '0.5px' }}>
              Get In Touch
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Need help structuring recurring client reporting or building custom Power BI dashboards? Reach out directly.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a 
                href="mailto:nexabir@gmail.com" 
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '8px', 
                  color: 'var(--accent)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 
                }}
              >
                <Mail size={16} /> nexabir@gmail.com
              </a>
              <a 
                href="https://www.linkedin.com/in/md-abir-ul-islam" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '8px', 
                  color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' 
                }}
                onMouseOver={(e) => e.target.style.color = 'var(--accent)'}
                onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
              >
                <ArrowUpRight size={16} /> linkedin.com/in/md-abir-ul-islam
              </a>
              <a 
                href="https://github.com/nexabir" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '8px', 
                  color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' 
                }}
                onMouseOver={(e) => e.target.style.color = 'var(--accent)'}
                onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
              >
                <FolderGit2 size={16} /> github.com/nexabir
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ 
          maxWidth: '1000px', 
          margin: '0 auto', 
          paddingTop: '2rem', 
          borderTop: '1px solid var(--border-color)', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} Md. Abir Ul Islam. All rights reserved.
          </div>
          <div>
            Built with React, Vite & Supabase · Hosted on Cloudflare Pages
          </div>
        </div>
      </footer>

      {/* Responsive Styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .desktop-nav { display: none !important; }
            .mobile-menu-toggle { display: flex !important; }
          }
          @media (min-width: 769px) {
            .desktop-nav { display: flex !important; }
            .mobile-menu-toggle { display: none !important; }
          }
        `}
      </style>
    </div>
  );
};

export default Layout;
