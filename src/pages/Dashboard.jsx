import React from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Code, Link } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import CompetencyRadar from '../components/CompetencyRadar';
import ProjectModal from '../components/ProjectModal';



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
    hero: { 
      title: 'Architecting Business Value', 
      subtitle: 'Strategy through Data', 
      intro: 'Bridging the gap between data strategy and enterprise-scale execution.',
      cv_url: 'CV of Md. Abir Ul Islam.pdf'
    },
    sections: { 
      skills: [], 
      experience: [], 
      projects: [
        {
          title: "Supply Chain Waste Optimization",
          impact_badge: "ROI: $2M+",
          problem: "Unidentified friction points in inventory lifecycle causing 15% annual waste across multi-region distribution centers.",
          approach: "Architected a predictive analytics framework using Python (Pandas) and SQL to correlate demand spikes with localized logistics bottlenecks.",
          impact: ["20% Reduction in Inventory Waste", "Achieved $2M in annual operational savings", "98% Forecast accuracy for Q4 2025"],
          desc: "Enterprise-level supply chain optimization project reducing operational overhead.",
          tags: ["SQL", "Python", "Predictive Modeling", "Supply Chain"],
          link: "#"
        },
        {
          title: "Predictive Customer Retention Engine",
          impact_badge: "+12% Retention",
          problem: "Accelerating churn rates in the SME segment without a clear data-driven understanding of customer pain points.",
          approach: "Developed a stakeholder-facing Tableau dashboard integrated with a Logistic Regression model to identify 'At-Risk' accounts 30 days prior to renewal.",
          impact: ["12% Relative increase in retention", "Identified $500k in potential upsell opportunities", "Adopted as standard BI tool for Sales Team"],
          desc: "Data-driven churn analysis and retention strategy for subscription services.",
          tags: ["Tableau", "Statistics", "Strategy", "Customer Success"],
          link: "#"
        },
        {
          title: "Automated Financial Reporting Pipeline",
          impact_badge: "95% Efficiency",
          problem: "Manual monthly reporting cycle requiring 40+ man-hours per department, leading to frequent human error and delayed insights.",
          approach: "Engineered an automated ETL pipeline using Python and Advanced Excel VBA to consolidate data from 5 disparate sources into a unified real-time dashboard.",
          impact: ["Reduced reporting time from 40 hours to 2 hours", "100% Data accuracy across all audited reports", "Saved 160+ departmental hours per month"],
          desc: "Process re-engineering and automation of critical financial workflows.",
          tags: ["Automation", "Python", "VBA", "Process Mapping"],
          link: "#"
        }
      ] 
    }
  });
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
            {siteData?.hero?.title || 'Architecting Business Value'}
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
            {siteData?.hero?.subtitle || siteData?.hero?.intro || 'Bridging the gap between data strategy and enterprise-scale execution.'}
          </motion.p>
          
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ padding: '0.8rem 2rem', fontSize: '1rem', borderRadius: '50px' }}
            >
              View Work <ArrowRight size={18} />
            </button>
            <a 
              href={`/${siteData?.hero?.cv_url || '#'}`} 
              download 
              className="btn"
              style={{ padding: '0.8rem 2rem', fontSize: '1rem', borderRadius: '50px', backdropFilter: 'blur(10px)' }}
            >
              <Download size={18} /> Resume
            </a>
            <a 
              href="https://bd.linkedin.com/in/md-abir-ul-islam" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn"
              style={{ padding: '0.8rem 2rem', fontSize: '1rem', borderRadius: '50px', backdropFilter: 'blur(10px)' }}
            >
              <Link size={18} /> LinkedIn
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
          {(Array.isArray(siteData?.sections?.skills) ? siteData.sections.skills : []).map((cat, idx) => (
            <motion.div key={idx} variants={fadeUp} className="glass-panel" style={{ padding: '2.5rem', borderRadius: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                <div style={{ padding: '10px', background: 'var(--accent-glow)', borderRadius: '12px' }}>
                  <Code size={24} className="text-accent" />
                </div>
                <h3 style={{ fontSize: '1.3rem' }}>{cat?.category}</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(Array.isArray(cat?.items) ? cat.items : []).map(skill => (
                  <span key={skill} style={{ fontSize: '0.75rem', padding: '4px 10px', background: 'rgba(0,0,0,0.1)', border: '1px solid var(--border-color)', borderRadius: '20px' }}>{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Competency Visualization */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={fadeUp}
          className="glass-panel" 
          style={{ marginTop: '4rem', padding: '3rem', borderRadius: '32px', textAlign: 'center' }}
        >
          <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Strategic <span className="text-accent">Competency Matrix</span></h3>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <CompetencyRadar theme={theme} />
          </div>
          <p style={{ marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            A balanced profile across technical execution, business strategy, and stakeholder communication.
          </p>
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
            {(Array.isArray(siteData?.sections?.experience) ? siteData.sections.experience : []).map((exp, index) => (
              <motion.div key={index} variants={fadeUp} style={{ position: 'relative' }}>
                {/* Timeline Dot */}
                <div style={{ 
                  position: 'absolute', left: '-2rem', top: '6px', width: '14px', height: '14px', 
                  borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent-glow)' 
                }} />
                
                <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '0.3rem' }}>{exp?.role}</h3>
                <h4 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>{exp?.company} <span style={{ marginLeft: '1rem', opacity: 0.5 }}>{exp?.year}</span></h4>
                
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '700px' }}>
                  {exp?.desc}
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
          { (Array.isArray(siteData?.sections?.projects) ? siteData.sections.projects : []).map((project, index) => (
            <motion.div 
              key={index}
              variants={fadeUp}
              className="glass-panel"
              style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', borderRadius: '24px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                 <h3 style={{ fontSize: '1.4rem', fontWeight: 600 }}>{project?.title}</h3>
                 <span style={{ 
                   fontSize: '0.7rem', 
                   padding: '4px 10px', 
                   background: 'var(--accent-glow)', 
                   color: 'var(--accent)', 
                   borderRadius: '12px', 
                   fontWeight: 700,
                   border: '1px solid var(--accent)'
                 }}>
                   {project?.impact_badge || 'High ROI'}
                 </span>
              </div>
              
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1, marginBottom: '2rem' }}>
                {project?.desc || project?.snippet}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '2rem' }}>
                {(Array.isArray(project?.tags) ? project.tags : []).map((tag, tIndex) => (
                  <span key={tIndex} style={{ fontSize: '0.75rem', padding: '6px 12px', borderRadius: '20px', background: 'rgba(0,0,0,0.1)' }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                <button 
                  onClick={() => {
                    setSelectedProject(project);
                    setIsModalOpen(true);
                  }} 
                  className="btn btn-primary" 
                  style={{ flex: 1, justifyContent: 'center', borderRadius: '50px' }}
                >
                  View Case Study
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Project Detail Modal */}
      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        project={selectedProject} 
        theme={theme} 
      />



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
