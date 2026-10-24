import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, ArrowRight, Code, Link, ExternalLink, 
  LayoutGrid, ListFilter, Sparkles, Eye, ArrowUpRight, CheckCircle,
  Mail, Calendar, Send, ShieldCheck, Clock, Zap, TrendingUp, Check
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

const defaultServices = [
  {
    title: "Rapid BI & Analytics Audit",
    tier: "Offer A • Quick Win",
    badge: "3-5 Days Turnaround",
    price: "$450 – $750",
    period: "fixed fee",
    desc: "Uncover hidden reporting bottlenecks, eliminate tracking discrepancies, and receive an actionable architecture blueprint.",
    timeframe: "Delivered in 3 to 5 business days",
    deliverables: [
      "Full audit of ad platforms (Meta, Google), GA4, CRM, and Excel reporting models",
      "Root cause diagnosis of attribution, ROAS, and CAC calculation discrepancies",
      "Fixed-scope technical recommendation report & recommended BI dashboard schema"
    ],
    ctaText: "Request Audit",
    featured: false
  },
  {
    title: "Custom Dashboard & Data Pipeline",
    tier: "Offer B • Core Engagement",
    badge: "Most Popular",
    price: "$1,200 – $2,800",
    period: "project-based",
    desc: "Consolidate scattered data sources into automated, client-ready Power BI dashboards that refresh without manual intervention.",
    timeframe: "Delivered in 2 to 3 weeks",
    deliverables: [
      "Automated multi-channel data ingestion & normalization pipeline (SQL / Python / Power Query)",
      "Executive KPI dashboard + deep-dive operational and cohort analysis views",
      "Interactive Loom video documentation, staff training, and 30-day post-delivery hypercare"
    ],
    ctaText: "Discuss Your Dashboard",
    featured: true
  },
  {
    title: "Fractional Analytics Partner",
    tier: "Offer C • Advisory Retainer",
    badge: "Dedicated Partner",
    price: "$800 – $1,500",
    period: "per month",
    desc: "Ongoing decision support, reporting automation, and custom deep-dive analysis without full-time employee overhead.",
    timeframe: "Month-to-month flexibility • 10-20 hrs/mo",
    deliverables: [
      "Bi-weekly executive KPI reviews & proactive growth bottleneck identification",
      "Continuous data model maintenance, new platform connectors, and metric updates",
      "Priority response on ad-hoc analytical queries and board/investor presentation decks"
    ],
    ctaText: "Explore Partnership",
    featured: false
  }
];

const Dashboard = ({ theme }) => {
  const navigate = useNavigate();
  const [siteData, setSiteData] = React.useState({
    hero: { 
      badge: 'Data & Analytics Consultant',
      title: 'Turning Fragmented Data into Clear Growth Decisions', 
      subtitle: 'I help growing businesses and performance marketing agencies turn scattered ad spend, sales, and operational data into automated Power BI dashboards, actionable insights, and reliable monthly reports.', 
      intro: 'Bridging the gap between raw data, executive visibility, and measurable revenue growth.',
      cv_url: 'CV of Md. Abir Ul Islam.pdf'
    },
    sections: { 
      skills: [], 
      experience: [], 
      services: defaultServices,
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
    },
    contact: {
      email: 'nexabir@gmail.com',
      calendly: 'https://calendly.com',
      linkedin: 'https://bd.linkedin.com/in/md-abir-ul-islam'
    }
  });
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [projectView, setProjectView] = useState('spotlight');

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', company: '', message: '' });
  const [sendingContact, setSendingContact] = useState(false);
  const [contactStatus, setContactStatus] = useState(null);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSendingContact(true);
    setContactStatus(null);
    try {
      if (supabase) {
        await supabase.from('contact_inquiries').insert([
          { 
            name: contactForm.name, 
            email: contactForm.email, 
            company: contactForm.company, 
            message: contactForm.message,
            created_at: new Date().toISOString() 
          }
        ]).select().catch(() => {});
      }
      const mailtoUrl = `mailto:nexabir@gmail.com?subject=Consulting Inquiry from ${encodeURIComponent(contactForm.name)} (${encodeURIComponent(contactForm.company || 'Business')})&body=${encodeURIComponent(contactForm.message + '\n\nFrom: ' + contactForm.name + '\nEmail: ' + contactForm.email + '\nCompany: ' + contactForm.company)}`;
      window.open(mailtoUrl, '_blank');
      setContactStatus({ type: 'success', message: 'Thank you! Your email draft has been prepared, and your message has been logged.' });
      setContactForm({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      setContactStatus({ type: 'error', message: 'Could not log automatically. Please email nexabir@gmail.com directly.' });
    } finally {
      setSendingContact(false);
    }
  };

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
        const loadedServices = contentMap.sections?.services;
        setSiteData(prev => ({
          ...prev,
          ...contentMap,
          hero: { ...prev.hero, ...(contentMap.hero || {}) },
          contact: { ...prev.contact, ...(contentMap.contact || {}) },
          sections: { 
            ...prev.sections, 
            ...(contentMap.sections || {}),
            services: (Array.isArray(loadedServices) && loadedServices.length > 0)
              ? loadedServices
              : prev.sections.services,
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
              padding: '6px 18px', 
              borderRadius: '30px', 
              border: '1px solid var(--border-color)', 
              color: 'var(--accent)', 
              fontSize: '0.85rem', 
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              backdropFilter: 'blur(10px)'
            }}>
              {siteData?.hero?.badge || 'Data & Analytics Consultant'}
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeUp}
            style={{ 
              fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', 
              fontWeight: 800, 
              lineHeight: 1.15, 
              marginBottom: '1.5rem', 
              color: 'var(--text-main)',
              letterSpacing: '-0.03em'
            }}
          >
            {siteData?.hero?.title || 'Turning Fragmented Data into Clear Growth Decisions'}
          </motion.h1>
          
          <motion.p 
            variants={fadeUp}
            style={{ 
              fontSize: '1.15rem', 
              color: 'var(--text-muted)', 
              maxWidth: '680px', 
              margin: '0 auto 3rem auto',
              lineHeight: 1.6 
            }}
          >
            {siteData?.hero?.subtitle || siteData?.hero?.intro || 'I help growing businesses and performance marketing agencies turn scattered ad spend, sales, and operational data into automated Power BI dashboards, actionable insights, and reliable monthly reports.'}
          </motion.p>
          
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ padding: '0.8rem 1.8rem', fontSize: '0.95rem', borderRadius: '50px' }}
            >
              Explore Case Studies <ArrowRight size={16} />
            </button>
            <button 
              className="btn" 
              onClick={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ padding: '0.8rem 1.8rem', fontSize: '0.95rem', borderRadius: '50px', backdropFilter: 'blur(10px)' }}
            >
              Engagement Models
            </button>
            <button 
              className="btn" 
              onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ padding: '0.8rem 1.8rem', fontSize: '0.95rem', borderRadius: '50px', backdropFilter: 'blur(10px)' }}
            >
              <Calendar size={16} /> Book 15-Min Intro
            </button>
            <a 
              href={`/${siteData?.hero?.cv_url || 'CV of Md. Abir Ul Islam.pdf'}`} 
              download 
              className="btn"
              style={{ padding: '0.8rem 1.8rem', fontSize: '0.95rem', borderRadius: '50px', backdropFilter: 'blur(10px)' }}
            >
              <Download size={16} /> Resume
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

      {/* 2.5 SERVICES & ENGAGEMENT MODELS */}
      <section id="services-section" style={{ paddingTop: '8rem' }}>
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ 
              padding: '6px 18px', 
              borderRadius: '30px', 
              border: '1px solid var(--border-color)', 
              color: 'var(--accent)', 
              fontSize: '0.85rem', 
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              backdropFilter: 'blur(10px)'
            }}>
              Transparent Scopes & Pricing
            </span>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Strategic <span className="text-accent">Engagement Models</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Productized consulting packages tailored for marketing agencies, e-commerce brands, and scaling B2B teams looking for automated clarity.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="services-grid"
        >
          {(Array.isArray(siteData?.sections?.services) ? siteData.sections.services : defaultServices).map((service, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeUp} 
              className={`service-card ${service.featured ? 'service-card--featured' : ''}`}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <span className="service-card__tier">{service.tier || `Tier ${idx + 1}`}</span>
                {service.badge && (
                  <span style={{ 
                    fontSize: '0.7rem', 
                    padding: '3px 10px', 
                    borderRadius: '12px', 
                    background: service.featured ? 'var(--accent)' : 'var(--accent-glow)', 
                    color: service.featured ? 'var(--bg-color)' : 'var(--accent)', 
                    fontWeight: 700 
                  }}>
                    {service.badge}
                  </span>
                )}
              </div>

              <h3 className="service-card__title">{service.title}</h3>

              <div className="service-card__pricing">
                <span className="service-card__price">{service.price}</span>
                {service.period && <span className="service-card__period">/ {service.period}</span>}
              </div>

              <p className="service-card__desc">{service.desc}</p>

              {service.timeframe && (
                <div className="service-card__timeframe">
                  <Clock size={15} style={{ color: 'var(--accent)' }} />
                  <span>{service.timeframe}</span>
                </div>
              )}

              <ul className="service-card__deliverables">
                {(Array.isArray(service.deliverables) ? service.deliverables : []).map((item, dIdx) => (
                  <li key={dIdx} className="service-card__deliverable-item">
                    <CheckCircle size={16} className="service-card__deliverable-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => {
                  const contactEl = document.getElementById('contact-section');
                  if (contactEl) {
                    contactEl.scrollIntoView({ behavior: 'smooth' });
                    setContactForm(prev => ({
                      ...prev,
                      message: `Hi Abir, I'm interested in discussing the "${service.title}" (${service.price}). Here are our requirements: `
                    }));
                  }
                }}
                className={`btn ${service.featured ? 'btn-primary' : ''}`}
                style={{ width: '100%', justifyContent: 'center', borderRadius: '50px', padding: '0.9rem' }}
              >
                {service.ctaText || 'Get Started'} <ArrowRight size={16} />
              </button>
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

      {/* 6. CONTACT & CONSULTATION */}
      <section id="contact-section" style={{ paddingTop: '8rem' }}>
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ 
              padding: '6px 18px', 
              borderRadius: '30px', 
              border: '1px solid var(--border-color)', 
              color: 'var(--accent)', 
              fontSize: '0.85rem', 
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              backdropFilter: 'blur(10px)'
            }}>
              Direct Discovery & Booking
            </span>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Let's Solve Your <span className="text-accent">Data Challenges</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Ready to turn manual spreadsheets into automated Power BI intelligence? Book a 15-minute intro or send your project specifications below.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="contact-grid"
        >
          {/* Left Column: Direct Booking & Fast Channels */}
          <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="contact-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1rem' }}>
                <div style={{ padding: '12px', background: 'var(--accent-glow)', borderRadius: '14px', color: 'var(--accent)' }}>
                  <Calendar size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>15-Min Strategy Call</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Quick, zero-pressure fit assessment</p>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Discuss your existing reporting bottlenecks, data stack, and determine the optimal engagement model for your team.
              </p>
              <a 
                href={siteData?.contact?.calendly || "https://calendly.com"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', borderRadius: '50px' }}
              >
                Schedule via Calendly <ArrowRight size={16} />
              </a>
            </div>

            <div className="contact-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1rem' }}>
                <div style={{ padding: '12px', background: 'var(--accent-glow)', borderRadius: '14px', color: 'var(--accent)' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Direct Email</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Typical response time: &lt; 4 hours</p>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Send raw data samples, RFP documents, or dashboard wishlists directly to my desk.
              </p>
              <a 
                href={`mailto:${siteData?.contact?.email || 'nexabir@gmail.com'}`}
                className="btn"
                style={{ width: '100%', justifyContent: 'center', borderRadius: '50px' }}
              >
                {siteData?.contact?.email || 'nexabir@gmail.com'}
              </a>
            </div>

            <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.15)', borderRadius: '20px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                <ShieldCheck size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <span><strong>Mutual NDA Protected</strong> upon request prior to data sharing</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                <Zap size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <span><strong>Fast Delivery:</strong> Audits delivered in 3-5 days</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                <TrendingUp size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <span><strong>Global Remote:</strong> Serving US, UK, and worldwide clients</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Direct Consultation Form */}
          <motion.div variants={fadeUp} className="contact-card">
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Send Project Specification
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Share your current analytics setup and what questions you need answered.
            </p>

            <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Your Name *
                </label>
                <input 
                  type="text" 
                  required 
                  className="contact-input" 
                  placeholder="e.g. Sarah Jenkins"
                  value={contactForm.name}
                  onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Work Email *
                </label>
                <input 
                  type="email" 
                  required 
                  className="contact-input" 
                  placeholder="e.g. sarah@agency.com"
                  value={contactForm.email}
                  onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Company / Website
                </label>
                <input 
                  type="text" 
                  className="contact-input" 
                  placeholder="e.g. Acme Marketing / acme.com"
                  value={contactForm.company}
                  onChange={e => setContactForm({ ...contactForm, company: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Your Data Challenge / Project Scope *
                </label>
                <textarea 
                  required 
                  rows={4} 
                  className="contact-input" 
                  style={{ resize: 'vertical' }}
                  placeholder="Tell me about your current tools (Meta, Google, Shopify, Excel) and what dashboards or metrics you need..."
                  value={contactForm.message}
                  onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                />
              </div>

              {contactStatus && (
                <div style={{ 
                  padding: '12px 16px', 
                  borderRadius: '12px', 
                  fontSize: '0.85rem', 
                  background: contactStatus.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  border: `1px solid ${contactStatus.type === 'success' ? '#22c55e' : '#ef4444'}`,
                  color: contactStatus.type === 'success' ? '#86efac' : '#fca5a5'
                }}>
                  {contactStatus.message}
                </div>
              )}

              <button 
                type="submit" 
                disabled={sendingContact}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', borderRadius: '50px', padding: '1rem', marginTop: '0.5rem', fontWeight: 700 }}
              >
                {sendingContact ? 'Preparing Draft...' : (
                  <>Submit Inquiry <Send size={16} /></>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
};

export default Dashboard;
