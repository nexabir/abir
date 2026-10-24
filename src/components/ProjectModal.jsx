import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Target, Settings, Award, ExternalLink, FolderGit2, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectModal = ({ isOpen, onClose, project, theme }) => {
  const navigate = useNavigate();
  if (!project) return null;

  const impactItems = project.impact || project.metrics || [
    '25% Efficiency Increase',
    'ROI achieved in 6 months',
    '98% Stakeholder Satisfaction'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(10px)',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '820px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'var(--bg-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: '2.5rem',
              position: 'relative',
              boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.7)',
            }}
          >
            <button
              onClick={onClose}
              aria-label="Close Modal"
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'var(--bg-panel)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'all 0.2s ease'
              }}
            >
              <X size={18} />
            </button>

            {project.image && (
              <div style={{
                width: '100%',
                maxHeight: '260px',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '2rem',
                border: '1px solid var(--border-color)'
              }}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
            )}

            <header style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ 
                  color: 'var(--accent)', 
                  fontWeight: 700, 
                  fontSize: '0.8rem', 
                  textTransform: 'uppercase', 
                  letterSpacing: '2px',
                  background: 'var(--accent-glow)',
                  padding: '4px 10px',
                  borderRadius: '6px'
                }}>
                  Case Study
                </span>
                {project.impact_badge && (
                  <span className="spotlight-project__badge featured-badge" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                    {project.impact_badge}
                  </span>
                )}
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, lineHeight: 1.2 }}>{project.title}</h2>
              {project.desc && (
                <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', fontSize: '1rem', lineHeight: 1.6 }}>
                  {project.desc}
                </p>
              )}
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Problem */}
              {project.problem && (
                <section style={{ padding: '1.5rem', background: 'var(--bg-panel)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem', color: 'var(--accent)' }}>
                    <Target size={20} />
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>The Business Problem</h3>
                  </div>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.98rem' }}>{project.problem}</p>
                </section>
              )}

              {/* Approach */}
              {project.approach && (
                <section style={{ padding: '1.5rem', background: 'var(--bg-panel)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem', color: 'var(--accent)' }}>
                    <Settings size={20} />
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>The Approach</h3>
                  </div>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.98rem' }}>{project.approach}</p>
                </section>
              )}

              {/* Results */}
              <section style={{ padding: '1.75rem', background: 'var(--bg-panel)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem', color: 'var(--accent)' }}>
                  <Award size={20} />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Measurable Impact</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  {impactItems.map((metric, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle size={18} style={{ marginTop: '3px', color: 'var(--accent)', flexShrink: 0 }} />
                      <span style={{ fontWeight: 600, fontSize: '0.95rem', lineHeight: 1.5 }}>{metric}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Tags */}
              {Array.isArray(project.tags) && project.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {project.tags.map((tag, i) => (
                    <span key={i} style={{ 
                      fontSize: '0.75rem', 
                      padding: '5px 12px', 
                      borderRadius: '20px', 
                      background: 'rgba(0,0,0,0.1)', 
                      border: '1px solid var(--border-color)' 
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

            </div>

            <footer style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {project.index !== undefined && (
                <button 
                  onClick={() => {
                    onClose();
                    navigate(`/project/${project.index}`);
                  }}
                  className="btn btn-primary" 
                  style={{ borderRadius: '50px', padding: '0.75rem 1.75rem' }}
                >
                  <BookOpen size={16} /> Open Full Case Study Page
                </button>
              )}
              {project.link && project.link !== '#' && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn" style={{ borderRadius: '50px', padding: '0.75rem 1.5rem' }}>
                  <ExternalLink size={16} /> View Live Solution
                </a>
              )}
              {project.github_link && project.github_link !== '#' && (
                <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="btn" style={{ borderRadius: '50px', padding: '0.75rem 1.5rem' }}>
                  <FolderGit2 size={16} /> Source Code
                </a>
              )}
            </footer>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
