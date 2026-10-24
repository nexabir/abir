import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Target, Settings, Award, CheckCircle, 
  ExternalLink, FolderGit2, Code, Layers 
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import Loader from '../components/Loader';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const defaultProjects = [
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
];

const ProjectDetail = ({ theme }) => {
  const { index } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [allProjects, setAllProjects] = React.useState([]);

  React.useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        let projects = [];
        if (supabase) {
          const { data, error } = await supabase
            .from('site_content')
            .select('*')
            .eq('id', 'sections')
            .single();

          if (!error && Array.isArray(data?.content?.projects) && data.content.projects.length > 0) {
            projects = data.content.projects;
          }
        }

        if (projects.length === 0) {
          projects = defaultProjects;
        }

        setAllProjects(projects);
        const idx = parseInt(index, 10);
        if (projects[idx]) {
          setProject(projects[idx]);
        } else if (defaultProjects[idx]) {
          setProject(defaultProjects[idx]);
        }
      } catch (err) {
        console.error('Failed to fetch project:', err.message);
        const idx = parseInt(index, 10);
        setAllProjects(defaultProjects);
        if (defaultProjects[idx]) setProject(defaultProjects[idx]);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [index]);

  if (loading) return <Loader theme={theme} />;

  if (!project) {
    return (
      <div style={{ 
        minHeight: '80vh', display: 'flex', flexDirection: 'column', 
        alignItems: 'center', justifyContent: 'center', gap: '1.5rem' 
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Project Not Found</h2>
        <p style={{ color: 'var(--text-muted)' }}>The requested case study doesn't exist.</p>
        <button onClick={() => navigate('/')} className="btn btn-primary" style={{ borderRadius: '50px' }}>
          <ArrowLeft size={18} /> Back to Portfolio
        </button>
      </div>
    );
  }

  const projectIndex = parseInt(index, 10);
  const prevProject = projectIndex > 0 ? allProjects[projectIndex - 1] : null;
  const nextProject = projectIndex < allProjects.length - 1 ? allProjects[projectIndex + 1] : null;
  const impactItems = project.impact || project.metrics || [];

  return (
    <div className="project-detail">
      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={staggerContainer}
        className="project-detail__header"
      >
        {/* Back Navigation */}
        <motion.button 
          variants={fadeUp}
          className="project-detail__back"
          onClick={() => navigate('/#projects-section')}
        >
          <ArrowLeft size={16} /> Back to Projects
        </motion.button>

        {/* Hero Image */}
        {project.image && (
          <motion.div variants={fadeUp} className="project-detail__hero-image">
            <img src={project.image} alt={project.title} />
          </motion.div>
        )}

        {/* Badge */}
        <motion.div variants={fadeUp}>
          <span className="spotlight-project__badge featured-badge">
            {project.impact_badge || 'Case Study'}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          variants={fadeUp}
          style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            fontWeight: 800, 
            lineHeight: 1.1,
            marginTop: '1.5rem',
            marginBottom: '1rem',
            letterSpacing: '-0.03em'
          }}
        >
          {project.title}
        </motion.h1>

        {/* Subtitle / Description */}
        <motion.p 
          variants={fadeUp}
          style={{ 
            fontSize: '1.15rem', 
            color: 'var(--text-muted)', 
            lineHeight: 1.7,
            maxWidth: '700px',
            marginBottom: '2rem'
          }}
        >
          {project.desc || project.snippet}
        </motion.p>

        {/* Tags */}
        <motion.div variants={fadeUp} className="spotlight-project__tags">
          {(Array.isArray(project.tags) ? project.tags : []).map((tag, i) => (
            <span key={i} className="spotlight-project__tag">{tag}</span>
          ))}
        </motion.div>
      </motion.div>

      {/* Case Study Sections */}
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        variants={staggerContainer}
        style={{ display: 'flex', flexDirection: 'column', gap: '0' }}
      >
        {/* Problem Statement */}
        {project.problem && (
          <motion.div variants={fadeUp} className="project-detail__section">
            <div className="project-detail__section-icon">
              <Target size={22} />
              <h3>The Business Problem</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.05rem' }}>
              {project.problem}
            </p>
          </motion.div>
        )}

        {/* Approach */}
        {project.approach && (
          <motion.div variants={fadeUp} className="project-detail__section">
            <div className="project-detail__section-icon">
              <Settings size={22} />
              <h3>The Approach</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.05rem' }}>
              {project.approach}
            </p>
          </motion.div>
        )}

        {/* Impact Metrics */}
        {impactItems.length > 0 && (
          <motion.div variants={fadeUp} className="project-detail__section">
            <div className="project-detail__section-icon">
              <Award size={22} />
              <h3>Measurable Impact</h3>
            </div>
            <div className="project-detail__metrics">
              {impactItems.map((metric, i) => (
                <div 
                  key={i} 
                  className="project-detail__metric"
                >
                  <div className="project-detail__metric-icon">
                    <CheckCircle size={16} />
                  </div>
                  <span>{metric}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Footer: Links */}
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        variants={fadeUp}
        className="project-detail__footer"
      >
        {project.link && project.link !== '#' && (
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary" 
            style={{ borderRadius: '50px', padding: '0.8rem 2rem' }}
          >
            <ExternalLink size={18} /> View Live Solution
          </a>
        )}
        {project.github_link && project.github_link !== '#' && (
          <a 
            href={project.github_link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn" 
            style={{ borderRadius: '50px', padding: '0.8rem 2rem' }}
          >
            <FolderGit2 size={18} /> Source Code
          </a>
        )}
        <button 
          onClick={() => navigate('/#projects-section')} 
          className="btn" 
          style={{ borderRadius: '50px', padding: '0.8rem 2rem' }}
        >
          <ArrowLeft size={18} /> All Projects
        </button>
      </motion.div>

      {/* Previous / Next Navigation */}
      {(prevProject || nextProject) && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ 
            marginTop: '4rem', 
            display: 'grid', 
            gridTemplateColumns: prevProject && nextProject ? '1fr 1fr' : '1fr', 
            gap: '1.5rem' 
          }}
        >
          {prevProject && (
            <div 
              className="glass-panel"
              onClick={() => navigate(`/project/${projectIndex - 1}`)}
              style={{ 
                padding: '2rem', borderRadius: '20px', cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>
                ← Previous Project
              </span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{prevProject.title}</h4>
            </div>
          )}
          {nextProject && (
            <div 
              className="glass-panel"
              onClick={() => navigate(`/project/${projectIndex + 1}`)}
              style={{ 
                padding: '2rem', borderRadius: '20px', cursor: 'pointer',
                textAlign: prevProject ? 'right' : 'left',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>
                Next Project →
              </span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{nextProject.title}</h4>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ProjectDetail;
