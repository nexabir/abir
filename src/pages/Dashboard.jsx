import React from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, ArrowRight, Briefcase, Code, PenTool } from 'lucide-react';
import siteData from '../data/content.json';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const Dashboard = ({ theme }) => {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '10rem' }}>
      
      {/* 1. HERO SECTION */}
      <section 
        style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          textAlign: 'center',
          paddingTop: '4rem'
        }}
      >
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div variants={fadeUp} style={{ marginBottom: '1.5rem' }}>
            <span style={{ 
              padding: '6px 16px', 
              borderRadius: '30px', 
              border: '1px solid var(--border-color)', 
              color: 'var(--accent)', 
              fontSize: '0.8rem', 
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              backdropFilter: 'blur(10px)'
            }}>
              Business Analyst
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeUp}
            style={{ 
              fontSize: 'clamp(3rem, 8vw, 5.5rem)', 
              fontWeight: 800, 
              lineHeight: 1.05, 
              marginBottom: '1.5rem', 
              color: 'var(--text-main)',
              letterSpacing: '-0.03em'
            }}
          >
            Turning Data Chaos <br/>
            Into <span className="text-accent" style={{ fontStyle: 'italic' }}>Strategy.</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeUp}
            style={{ 
              fontSize: '1.2rem', 
              color: 'var(--text-muted)', 
              maxWidth: '600px', 
              margin: '0 auto 3rem auto',
              lineHeight: 1.6 
            }}
          >
            {siteData.hero.intro}
          </motion.p>
          
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => document.getElementById('projects-section').scrollIntoView({ behavior: 'smooth' })}
              style={{ padding: '0.8rem 2rem', fontSize: '1rem', borderRadius: '50px' }}
            >
              View Work <ArrowRight size={18} />
            </button>
            <a 
              href={`/${siteData.hero.cv_url}`} 
              download 
              className="btn"
              style={{ padding: '0.8rem 2rem', fontSize: '1rem', borderRadius: '50px', backdropFilter: 'blur(10px)' }}
            >
              <Download size={18} /> Resume
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. ABOUT & SKILLS */}
      <section id="about-section" style={{ paddingTop: '8rem' }}>
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>The <span className="text-accent">Ecosystem</span></h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Bridging the gap between raw data and actionable business insights.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}
        >
          <motion.div variants={fadeUp} className="glass-panel" style={{ padding: '2.5rem', borderRadius: '24px' }}>
            <Code size={32} className="text-accent" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Data Engineering</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Extracting and transforming complex datasets from disparate enterprise sources with precision.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {siteData.sections.strategy.toolkit.slice(0,4).map(skill => (
                <span key={skill} style={{ fontSize: '0.75rem', padding: '4px 10px', background: 'rgba(0,0,0,0.1)', border: '1px solid var(--border-color)', borderRadius: '20px' }}>{skill}</span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="glass-panel" style={{ padding: '2.5rem', borderRadius: '24px' }}>
            <PenTool size={32} className="text-accent" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Visual Logic</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Crafting intuitive dashboards and interfaces that turn numbers into actionable insights.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {siteData.sections.strategy.toolkit.slice(4,8).map(skill => (
                <span key={skill} style={{ fontSize: '0.75rem', padding: '4px 10px', background: 'rgba(0,0,0,0.1)', border: '1px solid var(--border-color)', borderRadius: '20px' }}>{skill}</span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="glass-panel" style={{ padding: '2.5rem', borderRadius: '24px' }}>
            <Briefcase size={32} className="text-accent" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Strategic Impact</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Driving operational efficiency and scaling solutions across organizations.
            </p>
            <div style={{ padding: '1rem', background: 'var(--accent-glow)', borderRadius: '12px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)', display: 'block' }}>+84%</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-main)' }}>Efficiency Increase</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. EXPERIENCE TIMELINE */}
      <section id="experience-section" style={{ paddingTop: '8rem' }}>
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          style={{ marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Professional <span className="text-accent">Background</span></h2>
        </motion.div>

        <div style={{ position: 'relative', paddingLeft: '2rem' }}>
          {/* Timeline Line */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '6px', width: '2px', background: 'var(--border-color)' }} />
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {siteData.sections.foundation.experience.map((exp, index) => (
              <motion.div key={index} variants={fadeUp} style={{ position: 'relative' }}>
                {/* Timeline Dot */}
                <div style={{ 
                  position: 'absolute', left: '-2rem', top: '6px', width: '14px', height: '14px', 
                  borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent-glow)' 
                }} />
                
                <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '0.3rem' }}>{exp.role}</h3>
                <h4 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>{exp.company}</h4>
                
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '700px' }}>
                  {exp.description}
                </p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {exp.tags && exp.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '0.75rem', padding: '4px 12px', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. PROJECTS */}
      <section id="projects-section" style={{ paddingTop: '8rem' }}>
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          style={{ marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Featured <span className="text-accent">Projects</span></h2>
        </motion.div>

        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}
        >
          {siteData.sections.projects.items.map((project, index) => (
            <motion.div 
              key={index}
              variants={fadeUp}
              className="glass-panel"
              style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', borderRadius: '24px' }}
            >
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>{project.title}</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1, marginBottom: '2rem' }}>
                {project.description}
              </p>

              {project.impact && (
                <div style={{ padding: '1.2rem', backgroundColor: 'var(--accent-glow)', borderRadius: '12px', marginBottom: '2rem', borderLeft: '3px solid var(--accent)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-main)', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Impact</span>
                  <span style={{ fontSize: '1rem', color: 'var(--accent)', fontWeight: 600 }}>{project.impact}</span>
                </div>
              )}

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '2rem' }}>
                {project.tools?.map((tool, tIndex) => (
                  <span key={tIndex} style={{ fontSize: '0.75rem', padding: '6px 12px', borderRadius: '20px', background: 'rgba(0,0,0,0.1)' }}>
                    {tool}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                {project.links?.map((link, lIndex) => (
                  <a key={lIndex} href={link.url} target="_blank" rel="noopener noreferrer" className="btn" style={{ flex: 1, justifyContent: 'center', borderRadius: '50px' }}>
                    {link.label} <ExternalLink size={16} />
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. INSIGHTS / BLOG */}
      <section id="blog-section" style={{ paddingTop: '8rem' }}>
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          style={{ marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Latest <span className="text-accent">Insights</span></h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {siteData.blogs && siteData.blogs.length > 0 ? siteData.blogs.map((blog, index) => (
            <motion.div 
              key={index}
              variants={fadeUp}
              style={{ 
                padding: '2rem', 
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                cursor: 'pointer',
                transition: 'background 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-panel)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 600 }}>{blog.title}</h4>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {new Date(blog.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{blog.snippet}</p>
              <span style={{ color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
                Read Article <ArrowRight size={14} />
              </span>
            </motion.div>
          )) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border-color)', borderRadius: '12px' }}>
              No articles published yet.
            </div>
          )}
        </motion.div>
      </section>

    </div>
  );
};

export default Dashboard;
