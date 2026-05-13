import React from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, ArrowRight, Briefcase, Code, PenTool } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';



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
  const navigate = useNavigate();
  const [siteData, setSiteData] = React.useState({
    hero: { title: 'Business Analyst', subtitle: 'Strategy through Data', intro: 'Transforming complexity into clarity.' },
    sections: { skills: [], experience: [], projects: [] }
  });
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!supabase) throw new Error('Supabase client not initialized');

        // Fetch site content
        const { data: contentData, error: contentError } = await supabase
          .from('site_content')
          .select('*');
        
        if (contentError) throw contentError;

        const contentMap = {};
        contentData?.forEach(item => {
          contentMap[item.id] = item.content;
        });

        // Merge Supabase data with Safety Defaults
        setSiteData(prev => ({
          ...prev,
          ...contentMap,
          hero: { ...prev.hero, ...(contentMap.hero || {}) },
          sections: { ...prev.sections, ...(contentMap.sections || {}) }
        }));
        
        // Fetch blogs
        const { data: blogsData, error: blogError } = await supabase
          .from('blogs')
          .select('*')
          .order('timestamp', { ascending: false });
        
        if (blogError) throw blogError;
        setBlogs(blogsData || []);

      } catch (err) {
        console.error('Dashboard fetch failed, using defaults:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);




  if (loading) return <Loader theme={theme} />;
  
  if (!siteData) return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: 'var(--text-main)',
      background: 'var(--bg-main)'
    }}>
      <h2>System Initialization Failed</h2>
      <p style={{ color: 'var(--accent)' }}>Please check browser console for error logs.</p>
      <button onClick={() => window.location.reload()} className="btn" style={{ marginTop: '1rem' }}>Retry Sync</button>
    </div>
  );

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
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
              fontWeight: 800, 
              lineHeight: 1.1, 
              marginBottom: '1.5rem', 
              color: 'var(--text-main)',
              letterSpacing: '-0.03em'
            }}
          >
            {siteData.hero?.title || 'Data Chaos Into Strategy'}
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
            {siteData.hero?.subtitle || siteData.hero?.intro || 'Empowering decisions through advanced analytics.'}
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
          {(siteData.sections.skills || []).map((cat, idx) => (
            <motion.div key={idx} variants={fadeUp} className="glass-panel" style={{ padding: '2.5rem', borderRadius: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                <div style={{ padding: '10px', background: 'var(--accent-glow)', borderRadius: '12px' }}>
                  <Code size={24} className="text-accent" />
                </div>
                <h3 style={{ fontSize: '1.3rem' }}>{cat.category}</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cat.items.map(skill => (
                  <span key={skill} style={{ fontSize: '0.75rem', padding: '4px 10px', background: 'rgba(0,0,0,0.1)', border: '1px solid var(--border-color)', borderRadius: '20px' }}>{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
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
            {(siteData.sections.experience || []).map((exp, index) => (
              <motion.div key={index} variants={fadeUp} style={{ position: 'relative' }}>
                {/* Timeline Dot */}
                <div style={{ 
                  position: 'absolute', left: '-2rem', top: '6px', width: '14px', height: '14px', 
                  borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent-glow)' 
                }} />
                
                <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '0.3rem' }}>{exp.role}</h3>
                <h4 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>{exp.company} <span style={{ marginLeft: '1rem', opacity: 0.5 }}>{exp.year}</span></h4>
                
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '700px' }}>
                  {exp.desc}
                </p>
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
          { (siteData.sections.projects || []).map((project, index) => (
            <motion.div 
              key={index}
              variants={fadeUp}
              className="glass-panel"
              style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', borderRadius: '24px' }}
            >
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>{project.title}</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1, marginBottom: '2rem' }}>
                {project.desc}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '2rem' }}>
                {project.tags?.map((tag, tIndex) => (
                  <span key={tIndex} style={{ fontSize: '0.75rem', padding: '6px 12px', borderRadius: '20px', background: 'rgba(0,0,0,0.1)' }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn" style={{ flex: 1, justifyContent: 'center', borderRadius: '50px' }}>
                  View Project <ExternalLink size={16} />
                </a>
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
          {blogs && blogs.length > 0 ? blogs.map((blog, index) => (
            <motion.div 
              key={blog.id || index}
              variants={fadeUp}
              onClick={() => navigate(`/blog/${blog.id}`)}
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
