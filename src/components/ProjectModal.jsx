import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Target, Tool, Award } from 'lucide-react';

const ProjectModal = ({ isOpen, onClose, project, theme }) => {
  if (!project) return null;

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
            padding: '2rem',
            backgroundColor: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '800px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'var(--bg-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: '3rem',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'var(--bg-panel)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>

            <header style={{ marginBottom: '3rem' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Case Study</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem', lineHeight: 1.1 }}>{project.title}</h2>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              
              {/* Problem */}
              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem', color: 'var(--accent)' }}>
                  <Target size={20} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>The Business Problem</h3>
                </div>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1.05rem' }}>{project.problem || "This project addressed complex operational inefficiencies that were impacting bottom-line performance."}</p>
              </section>

              {/* Approach */}
              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem', color: 'var(--accent)' }}>
                  <Tool size={20} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>The Approach</h3>
                </div>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1.05rem' }}>{project.approach || "Utilized Agile methodologies and data-driven stakeholder mapping to identify key friction points and architect a scalable solution."}</p>
              </section>

              {/* Results */}
              <section style={{ padding: '2rem', background: 'var(--bg-panel)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', color: 'var(--accent)' }}>
                  <Award size={20} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Measurable Impact</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
                  {(project.metrics || ['25% Efficiency Increase', 'ROI achieved in 6 months', '98% Stakeholder Satisfaction']).map((metric, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle size={16} style={{ marginTop: '4px', color: 'var(--accent)' }} />
                      <span style={{ fontWeight: 600, fontSize: '1rem' }}>{metric}</span>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '1rem' }}>
               <a href={project.link || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', borderRadius: '50px' }}>
                  View Live Solution
               </a>
            </footer>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
