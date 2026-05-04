import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import LiveWallpaper from './LiveWallpaper';

const Layout = ({ children, theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about-section', label: 'About' },
    { id: 'skills-section', label: 'Skills' },
    { id: 'experience-section', label: 'Experience' },
    { id: 'projects-section', label: 'Projects' },
    { id: 'blog-section', label: 'Insights' },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
      
      {/* Interactive Live Wallpaper */}
      <LiveWallpaper theme={theme} />

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
        gap: '2rem',
        padding: '0.8rem 2rem',
        backgroundColor: scrolled ? 'var(--bg-panel)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        border: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        borderRadius: '50px',
        boxShadow: scrolled ? '0 8px 32px 0 rgba(0,0,0,0.1)' : 'none',
        transition: 'all 0.3s ease',
        width: 'auto',
        maxWidth: '90vw'
      }}>
        {/* Brand */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ 
            fontSize: '1.2rem', 
            fontWeight: 800, 
            color: 'var(--text-main)',
            cursor: 'pointer',
            letterSpacing: '-0.5px'
          }}
        >
          Md. Abir <span className="text-accent">Ul Islam</span>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'none', '@media (min-width: 768px)': { display: 'flex' }, gap: '1.5rem' }} className="desktop-nav">
          {navItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => scrollToSection(item.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-main)',
                fontSize: '0.9rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.color = 'var(--accent)'}
              onMouseOut={(e) => e.target.style.color = 'var(--text-main)'}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          style={{
            background: 'var(--accent-glow)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-main)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.color = 'var(--accent)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.color = 'var(--text-main)';
          }}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </header>

      {/* Main Content */}
      <main style={{ position: 'relative', zIndex: 5, padding: '0 2rem' }}>
        {children}
      </main>

      <style>
        {`
          @media (max-width: 768px) {
            .desktop-nav { display: none !important; }
          }
          @media (min-width: 768px) {
            .desktop-nav { display: flex !important; }
          }
        `}
      </style>
    </div>
  );
};

export default Layout;
