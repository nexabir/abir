import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, ArrowRight, Code, Link, ExternalLink, 
  LayoutGrid, ListFilter, Sparkles, Eye, ArrowUpRight, CheckCircle 
} from 'lucide-react';
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
          title: "Multi-Channel Agency Performance & Client Reporting Hub",
          impact_badge: "75% Time Saved",
          problem: "Growing performance marketing agencies lose 15+ billable hours per account each month manually extracting ad spend, leads, and conversion metrics across fragmented platforms into spreadsheets, causing delayed reporting and human calculation errors.",
          approach: "Architected a normalized Power BI & Excel data model connecting multi-channel ad spend, Cost Per Lead (CPL), CAC, and ROAS into automated client-ready dashboards with executive summary commentary and budget pacing threshold alerts.",
          impact: [
            "75% reduction in recurring monthly client reporting turnaround time",
            "100% elimination of manual CSV copy-paste errors across 4 ad networks",
            "Empowered account managers to conduct proactive strategy reviews, improving client retention by 22%"
          ],
          desc: "End-to-end automated reporting architecture consolidating Meta, Google Ads, and GA4 into client-ready executive performance dashboards.",
          tags: ["Power BI", "Marketing Analytics", "Multi-Channel Attribution", "Executive Reporting", "ETL Automation"],
          image: "/assets/projects/agency_reporting.jpg",
          link: "#",
          github_link: "https://github.com/nexabir"
        },
        {
          title: "E-Commerce Revenue Velocity & SKU Profitability Command Center",
          impact_badge: "+$220K Net Margin",
          problem: "A scaling D2C e-commerce brand generated $1.8M in top-line GMV but experienced declining net cash flow due to hidden product return costs, heavy discounting, and escalating ad costs masked by blended revenue reports.",
          approach: "Engineered a cohort analysis and contribution margin framework (CM2/CM3) linking Shopify order data, returns, landed COGS, and shipping costs to evaluate true SKU profitability and customer lifetime value (LTV:CAC).",
          impact: [
            "Identified 14 unprofitable 'hero' SKUs draining $18,500/month in net ad spend",
            "Increased Average Order Value (AOV) by 18% through data-backed product bundling strategies",
            "Reduced dead stock by 34% by flagging slow-moving variants 45 days earlier"
          ],
          desc: "Comprehensive unit economics and contribution margin model revealing true SKU profitability, customer cohort retention, and inventory velocity.",
          tags: ["E-Commerce Analytics", "Unit Economics", "Power BI / Excel", "SKU Profitability", "Shopify BI"],
          image: "/assets/projects/ecom_profitability.jpg",
          link: "#",
          github_link: "https://github.com/nexabir"
        },
        {
          title: "B2B Sales Pipeline Velocity & Churn Early-Warning Engine",
          impact_badge: "92% Forecast Accuracy",
          problem: "Sales leadership struggled with inaccurate quarterly revenue forecasting (>35% deal slippage), while customer success teams were blindsided by enterprise client cancellations with no prior warning signals.",
          approach: "Developed a weighted pipeline forecasting and customer health score algorithm. Model evaluates stage duration bottlenecks, stakeholder touchpoints, and trailing 30-day engagement trends to flag at-risk renewals.",
          impact: [
            "Achieved 92% quarterly forecast accuracy for executive board presentations",
            "Early-warning indicators surfaced 85% of at-risk accounts 4 weeks prior to renewal deadlines",
            "Accelerated sales velocity by 19 days through stage bottleneck remediation"
          ],
          desc: "Executive sales pipeline and account health intelligence system tracking deal velocity, win probability, and proactive churn risk detection.",
          tags: ["Sales Intelligence", "Pipeline Forecasting", "Churn Prevention", "Executive BI", "SQL / Tableau"],
          image: "/assets/projects/b2b_sales_pipeline.jpg",
          link: "#",
          github_link: "https://github.com/nexabir"
        },
        {
          title: "Automated Financial Consolidation & 13-Week Cash Runway Suite",
          impact_badge: "Close Cycle: 5 Days → 4 Hrs",
          problem: "Monthly financial close across multiple operating units took 5 full days of manual ledger consolidation from disparate banking and accounting systems, delaying strategic capital allocation.",
          approach: "Built an automated ETL data pipeline in Python and Advanced Excel VBA to consolidate multi-entity trial balances, calculate rolling 13-week cash runway, analyze budget vs. actual variances, and generate executive PDF summaries.",
          impact: [
            "Compressed monthly consolidation and close from 5 business days to under 4 hours",
            "Saved 160+ departmental hours monthly across accounting and operations",
            "Provided executive leadership with real-time rolling 13-week liquidity visibility"
          ],
          desc: "Automated multi-entity financial consolidation ETL pipeline and rolling cash flow forecasting suite for corporate decision-makers.",
          tags: ["Financial Modeling", "ETL Automation", "Executive Dashboards", "Excel VBA / Python", "KPI Reporting"],
          image: "/assets/projects/financial_consolidation.jpg",
          link: "#",
          github_link: "https://github.com/nexabir"
        }
      ] 
    }
  });
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [projectView, setProjectView] = useState('spotlight');

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
        const loadedProjects = contentMap.sections?.projects;
        setSiteData(prev => ({
          ...prev,
          ...contentMap,
          hero: { ...prev.hero, ...(contentMap.hero || {}) },
          sections: { 
            ...prev.sections, 
            ...(contentMap.sections || {}),
            projects: (Array.isArray(loadedProjects) && loadedProjects.length > 0)
              ? loadedProjects
              : prev.sections.projects
          }
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
        <div className="section-header">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2 className="section-header__title">Strategic <span className="text-accent">Case Studies</span></h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '1rem', maxWidth: '600px' }}>
              Enterprise data initiatives architected to eliminate systemic friction, maximize operational efficiency, and deliver quantifiable ROI.
            </p>
          </motion.div>

          {/* View Mode Toggle: Spotlight vs Grid */}
          <div className="view-toggle">
            <button 
              className={`view-toggle__btn ${projectView === 'spotlight' ? 'active' : ''}`}
              onClick={() => setProjectView('spotlight')}
              title="One-by-One Storytelling View"
            >
              <ListFilter size={14} /> Spotlight
            </button>
            <button 
              className={`view-toggle__btn ${projectView === 'grid' ? 'active' : ''}`}
              onClick={() => setProjectView('grid')}
              title="Grid Overview"
            >
              <LayoutGrid size={14} /> Grid
            </button>
          </div>
        </div>

        {/* SPOTLIGHT VIEW (ONE-BY-ONE STORYTELLING) */}
        {projectView === 'spotlight' ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {(Array.isArray(siteData?.sections?.projects) ? siteData.sections.projects : []).map((project, index) => {
              const numStr = String(index + 1).padStart(2, '0');
              const impactItems = project.impact || project.metrics || [];

              return (
                <motion.article 
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeUp}
                  className="spotlight-project"
                >
                  {/* Number Watermark */}
                  <div className="spotlight-project__number">{numStr}</div>

                  {/* Left Column: Narrative & Meta */}
                  <div className="spotlight-project__meta">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                      <span className="spotlight-project__badge featured-badge">
                        {project?.impact_badge || 'Enterprise ROI'}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        PROJECT {numStr} OF {String(siteData?.sections?.projects?.length || 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="spotlight-project__title">
                      {project?.title}
                    </h3>

                    <p className="spotlight-project__desc">
                      {project?.desc || project?.snippet}
                    </p>

                    {/* Problem / Solution snapshot if available */}
                    {project?.problem && (
                      <div style={{ 
                        padding: '1rem 1.25rem', 
                        background: 'var(--bg-panel)', 
                        borderRadius: '12px', 
                        border: '1px solid var(--border-color)',
                        fontSize: '0.9rem',
                        lineHeight: 1.6
                      }}>
                        <strong style={{ color: 'var(--accent)', display: 'block', marginBottom: '4px', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                          Challenge Solved:
                        </strong>
                        <span style={{ color: 'var(--text-muted)' }}>
                          {project.problem.length > 160 ? project.problem.slice(0, 160) + '...' : project.problem}
                        </span>
                      </div>
                    )}

                    {/* Impact preview */}
                    {impactItems.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {impactItems.slice(0, 2).map((item, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                            <CheckCircle size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Tags */}
                    <div className="spotlight-project__tags">
                      {(Array.isArray(project?.tags) ? project.tags : []).map((tag, tIndex) => (
                        <span key={tIndex} className="spotlight-project__tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="spotlight-project__actions">
                      <button 
                        onClick={() => navigate(`/project/${index}`)} 
                        className="btn btn-primary" 
                        style={{ borderRadius: '50px', padding: '0.75rem 1.75rem' }}
                      >
                        Explore Case Study <ArrowUpRight size={16} />
                      </button>

                      <button 
                        onClick={() => {
                          setSelectedProject({ ...project, index });
                          setIsModalOpen(true);
                        }} 
                        className="btn" 
                        style={{ borderRadius: '50px', padding: '0.75rem 1.25rem' }}
                        title="Quick Preview"
                      >
                        <Eye size={16} /> Quick View
                      </button>

                      {project?.link && project.link !== '#' && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn" 
                          style={{ borderRadius: '50px', padding: '0.75rem 1.25rem' }}
                          title="Live Demo"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Visual / Graphic Card */}
                  <div 
                    className="spotlight-project__visual"
                    onClick={() => navigate(`/project/${index}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    {project?.image ? (
                      <img src={project.image} alt={project?.title} />
                    ) : (
                      <div className="spotlight-project__visual-placeholder">
                        <div className="placeholder-icon">
                          <Code size={30} />
                        </div>
                        <div className="placeholder-title">
                          {project?.title}
                        </div>
                        <div className="placeholder-tags">
                          {(Array.isArray(project?.tags) ? project.tags : []).slice(0, 3).map((tag, tIndex) => (
                            <span key={tIndex} style={{ 
                              fontSize: '0.7rem', 
                              padding: '3px 10px', 
                              borderRadius: '12px', 
                              background: 'var(--accent-glow)',
                              color: 'var(--accent)',
                              fontWeight: 600
                            }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="spotlight-project__visual-overlay">
                      <span style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '6px', 
                        color: '#fff', 
                        fontWeight: 600,
                        fontSize: '0.9rem' 
                      }}>
                        Read Full Story <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          /* GRID VIEW */
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="projects-grid"
          >
            {(Array.isArray(siteData?.sections?.projects) ? siteData.sections.projects : []).map((project, index) => (
              <motion.div 
                key={index}
                variants={fadeUp}
                className="glass-panel"
                style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', borderRadius: '24px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', gap: '10px' }}>
                   <h3 style={{ fontSize: '1.3rem', fontWeight: 600 }}>{project?.title}</h3>
                   <span style={{ 
                     fontSize: '0.7rem', 
                     padding: '4px 10px', 
                     background: 'var(--accent-glow)', 
                     color: 'var(--accent)', 
                     borderRadius: '12px', 
                     fontWeight: 700,
                     border: '1px solid var(--accent)',
                     flexShrink: 0
                   }}>
                     {project?.impact_badge || 'ROI: High'}
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

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                  <button 
                    onClick={() => navigate(`/project/${index}`)} 
                    className="btn btn-primary" 
                    style={{ flex: 1, justifyContent: 'center', borderRadius: '50px' }}
                  >
                    Case Study <ArrowUpRight size={14} />
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedProject({ ...project, index });
                      setIsModalOpen(true);
                    }} 
                    className="btn" 
                    style={{ borderRadius: '50px', padding: '0.6rem 1rem' }}
                    title="Quick Preview"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
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
