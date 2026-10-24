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
        if (!supabase) throw new Error('Supabase not initialized');

        const { data, error } = await supabase
          .from('site_content')
          .select('*')
          .eq('id', 'sections')
          .single();

        if (error) throw error;

        const projects = data?.content?.projects || [];
        setAllProjects(projects);
        const idx = parseInt(index, 10);
        if (projects[idx]) {
          setProject(projects[idx]);
        }
      } catch (err) {
        console.error('Failed to fetch project:', err.message);
        // Fallback defaults
        const defaults = [
          {
            title: "Supply Chain Waste Optimization",
            impact_badge: "ROI: $2M+",
            problem: "Unidentified friction points in inventory lifecycle causing 15% annual waste across multi-region distribution centers.",
            approach: "Architected a predictive analytics framework using Python (Pandas) and SQL to correlate demand spikes with localized logistics bottlenecks.",
            impact: ["20% Reduction in Inventory Waste", "Achieved $2M in annual operational savings", "98% Forecast accuracy for Q4 2025"],
            desc: "Enterprise-level supply chain optimization project reducing operational overhead.",
            tags: ["SQL", "Python", "Predictive Modeling", "Supply Chain"],
            link: "#"
          }
        ];
        const idx = parseInt(index, 10);
        if (defaults[idx]) setProject(defaults[idx]);
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
                <motion.div 
                  key={i} 
                  className="project-detail__metric"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="project-detail__metric-icon">
                    <CheckCircle size={16} />
                  </div>
                  <span>{metric}</span>
                </motion.div>
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
