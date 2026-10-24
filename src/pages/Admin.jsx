import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings as SettingsIcon, Save, RefreshCw, Key, 
  FileText, Plus, Edit, Trash2, LogOut, Layout, 
  Image as ImageIcon, Check, X, AlertCircle, Type, 
  Activity, Sliders, Globe, Briefcase, Code,
  ChevronUp, ChevronDown, Target, Award, ExternalLink, FolderGit2,
  Calendar, Mail, Clock, Sparkles, Layers
} from 'lucide-react';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { supabase } from '../lib/supabaseClient';

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

const defaultClients = [
  {
    name: "Akij Resource",
    logo: "/assets/clients/akij-resource.png",
    industry: "Conglomerate & Industrial Manufacturing",
    website: "https://akijresource.com/",
    scope: "Business intelligence architecture, sales reporting consolidation, and executive operational KPIs.",
    tag: "Enterprise BI"
  },
  {
    name: "Anwar Group of Industries",
    logo: "/assets/clients/Anwar-Group.jpg",
    industry: "Infrastructure & Industrial Conglomerate",
    website: "https://anwargroup.com/",
    scope: "Multi-entity financial consolidation, cash runway visibility, and financial variance dashboards.",
    tag: "Financial Analytics"
  },
  {
    name: "Daffodil Family",
    logo: "/assets/clients/Daffodil Family.png",
    industry: "Education, Technology & Venture Ecosystem",
    website: "https://daffodil.family/",
    scope: "Strategic analytics, operational monitoring dashboards, and academic performance tracking systems.",
    tag: "Data Strategy"
  },
  {
    name: "Global Entrepreneurship Network (GEN)",
    logo: "/assets/clients/GEN.png",
    industry: "Global Venture Ecosystem & Programs",
    website: "https://www.genglobal.org/",
    scope: "Venture ecosystem telemetry, startup program metrics, and stakeholder impact analytics.",
    tag: "Program Analytics"
  },
  {
    name: "Biggani.org",
    logo: "/assets/clients/biggani.org.png",
    industry: "Science & Tech Knowledge Platform",
    website: "https://biggani.org/",
    scope: "Audience telemetry, digital engagement tracking, and multi-channel content performance analytics.",
    tag: "Digital Analytics"
  },
  {
    name: "DRILLAB",
    logo: "/assets/clients/DRILLAB.png",
    industry: "Innovation, Research & Lab Technology",
    website: "https://drillab.com/",
    scope: "Operational workflow telemetry, research data pipeline automation, and tracking dashboards.",
    tag: "Operational BI"
  },
  {
    name: "LearnTime",
    logo: "/assets/clients/learntime.png",
    industry: "EdTech & Online Learning Platform",
    website: "https://learntime.com.bd/",
    scope: "Student cohort retention analysis, course revenue velocity, and customer acquisition unit economics.",
    tag: "Cohort Analytics"
  },
  {
    name: "DPI Entrepreneurship Club",
    logo: "/assets/clients/DPI-Entrepreneurship-Club.png",
    industry: "Institutional Incubator & Community",
    website: "https://www.facebook.com/dpientrepreneurshipclub/",
    scope: "Venture incubation telemetry, student startup progress tracking, and workshop metrics.",
    tag: "Venture Analytics"
  }
];

const Admin = ({ theme }) => {
  const [activeTab, setActiveTab] = useState('blogs');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  // Form States
  const [title, setTitle] = useState('');
  const [snippet, setSnippet] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  // Site Content State (with Safety Defaults)
  const [siteContent, setSiteContent] = useState({
    hero: { 
      badge: 'Data & Analytics Consultant',
      title: 'Turning Fragmented Data into Clear Growth Decisions', 
      subtitle: 'I help growing businesses and performance marketing agencies turn scattered ad spend, sales, and operational data into automated Power BI dashboards, actionable insights, and reliable monthly reports.' 
    },
    sections: { 
      skills: [], 
      experience: [], 
      services: defaultServices,
      clients: defaultClients,
      projects: [] 
    },
    contact: {
      email: 'nexabir@gmail.com',
      calendly: 'https://calendly.com',
      linkedin: 'https://bd.linkedin.com/in/md-abir-ul-islam'
    }
  });
  const [systemConfig, setSystemConfig] = useState({
    particles: { count: 100, speed: 0.5, color: '#eab308' },
    branding: { font: 'Inter', favicon: '/favicon.svg' },
    defaultTheme: 'dark'
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchBlogs(),
      fetchSiteContent()
    ]);
    setLoading(false);
  };

  const fetchSiteContent = async () => {
    const { data, error } = await supabase
      .from('site_content')
      .select('*');
    
    if (!error && data) {
      const contentMap = {};
      data.forEach(item => {
        contentMap[item.id] = item.content;
      });
      // Use functional update to merge with safety defaults
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

      const loadedProjects = contentMap.sections?.projects;
      const loadedServices = contentMap.sections?.services;
      const loadedClients = contentMap.sections?.clients;
      const projectsToUse = (Array.isArray(loadedProjects) && loadedProjects.length > 0)
        ? loadedProjects
        : defaultProjects;
      const servicesToUse = (Array.isArray(loadedServices) && loadedServices.length > 0)
        ? loadedServices
        : defaultServices;
      const clientsToUse = (Array.isArray(loadedClients) && loadedClients.length > 0)
        ? loadedClients
        : defaultClients;

      setSiteContent(prev => ({
        ...prev,
        ...contentMap,
        hero: { ...prev.hero, ...(contentMap.hero || {}) },
        contact: { ...prev.contact, ...(contentMap.contact || {}) },
        sections: {
          ...prev.sections,
          ...(contentMap.sections || {}),
          services: servicesToUse,
          clients: clientsToUse,
          projects: projectsToUse
        }
      }));
      if (contentMap.system_config) {
        setSystemConfig(contentMap.system_config);
      }
    }
  };



  const fetchBlogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('timestamp', { ascending: false });
    
    if (error) console.error('Error fetching blogs:', error);
    else setBlogs(data || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const blogData = {
      title,
      snippet,
      content,
      image,
      timestamp: editingBlog ? editingBlog.timestamp : Date.now(),
      id: editingBlog ? editingBlog.id : Date.now()
    };

    const { error } = await supabase
      .from('blogs')
      .upsert(blogData);

    if (error) {
      alert('Error saving blog: ' + error.message);
    } else {
      setShowEditor(false);
      setEditingBlog(null);
      fetchBlogs();
    }
    setLoading(false);
  };

  const openEditor = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setTitle(blog.title);
      setSnippet(blog.snippet);
      setContent(blog.content);
      setImage(blog.image);
    } else {
      setEditingBlog(null);
      setTitle('');
      setSnippet('');
      setContent('');
      setImage('');
    }
    setShowEditor(true);
  };

  const deleteBlog = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (error) alert('Error deleting: ' + error.message);
      else fetchBlogs();
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '250px 1fr', gap: '3rem' }}>
      
      {/* Sidebar */}
      <aside style={{ 
        position: 'sticky', top: '2rem', height: 'fit-content', 
        display: 'flex', flexDirection: 'column', gap: '1rem' 
      }}>
        <div style={{ marginBottom: '2rem', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Admin_<span className="text-accent">OS</span></h2>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>V 2.0.4 - SUPABASE_CONNECTED</p>
        </div>

        {[
          { id: 'blogs', label: 'Blog Posts', icon: FileText },
          { id: 'content', label: 'Site Content', icon: Layout },
          { id: 'settings', label: 'System Config', icon: SettingsIcon },
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px',
              borderRadius: '12px', border: 'none', cursor: 'pointer', textAlign: 'left',
              backgroundColor: activeTab === item.id ? 'var(--accent-glow)' : 'transparent',
              color: activeTab === item.id ? 'var(--accent)' : 'var(--text-main)',
              fontWeight: activeTab === item.id ? 600 : 400,
              transition: 'all 0.2s ease'
            }}
          >
            <item.icon size={18} /> {item.label}
          </button>
        ))}

        <button 
          onClick={handleLogout}
          style={{
            marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px',
            borderRadius: '12px', border: 'none', cursor: 'pointer', textAlign: 'left',
            backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171'
          }}
        >
          <LogOut size={18} /> TERMINATE_SESSION
        </button>
      </aside>

      {/* Main Content */}
      <main>
        {activeTab === 'blogs' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 700 }}>Blog_Management</h3>
              <button onClick={() => openEditor()} className="btn btn-primary" style={{ borderRadius: '12px' }}>
                <Plus size={18} /> ADD_NEW_POST
              </button>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {blogs.map(blog => (
                <div key={blog.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                    {blog.image && <img src={blog.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.3rem' }}>{blog.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{new Date(blog.timestamp).toLocaleDateString()}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.8rem' }}>
                    <button onClick={() => openEditor(blog)} className="btn" style={{ padding: '8px', borderRadius: '8px' }} title="Edit"><Edit size={16} /></button>
                    <button onClick={() => deleteBlog(blog.id)} className="btn" style={{ padding: '8px', borderRadius: '8px', color: '#f87171' }} title="Delete"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'content' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Site_Content_Editor</h3>
            
            <div style={{ display: 'grid', gap: '2rem' }}>
              {/* Hero Section */}
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h4 style={{ marginBottom: '1.5rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '10px' }}><Type size={18} /> HERO_SECTION</h4>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>BADGE_TAG</label>
                  <input 
                    className="admin-input" 
                    value={siteContent.hero?.badge || ''} 
                    placeholder="e.g. Data & Analytics Consultant"
                    onChange={e => setSiteContent({...siteContent, hero: {...siteContent.hero, badge: e.target.value}})}
                  />
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>MAIN_HEADLINE</label>
                  <input 
                    className="admin-input" 
                    value={siteContent.hero?.title || ''} 
                    onChange={e => setSiteContent({...siteContent, hero: {...siteContent.hero, title: e.target.value}})}
                  />
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>SUBTITLE</label>
                  <textarea 
                    className="admin-input" 
                    style={{ height: '80px' }}
                    value={siteContent.hero?.subtitle || ''} 
                    onChange={e => setSiteContent({...siteContent, hero: {...siteContent.hero, subtitle: e.target.value}})}
                  />
                </div>
              </div>

              {/* Services & Engagement Models Manager */}
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h4 style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', fontWeight: 700 }}>
                      <Briefcase size={20} /> SERVICES_&_ENGAGEMENT_MODELS_MANAGER
                    </h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>
                      Configure service tiers (Offer A, B, C), pricing, turnaround time, deliverables, and CTA buttons on the live site.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      const sections = siteContent?.sections || { skills: [], experience: [], projects: [], services: [] };
                      const current = sections?.services || [];
                      const updated = [
                        ...current,
                        {
                          title: "New Engagement Model",
                          tier: `Offer ${String.fromCharCode(65 + current.length)}`,
                          badge: "Custom",
                          price: "$500 – $1,000",
                          period: "fixed fee",
                          desc: "High-level summary of the offering and target clientele.",
                          timeframe: "Delivered in 1 to 2 weeks",
                          deliverables: ["Deliverable item 1", "Deliverable item 2"],
                          ctaText: "Get Started",
                          featured: false
                        }
                      ];
                      setSiteContent({ ...siteContent, sections: { ...sections, services: updated } });
                    }}
                    className="btn btn-primary" style={{ fontSize: '0.75rem', padding: '6px 14px' }}
                  >
                    <Plus size={14} /> ADD_SERVICE_TIER
                  </button>
                </div>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {(Array.isArray(siteContent?.sections?.services) ? siteContent.sections.services : defaultServices).map((srv, sIdx) => (
                    <div key={sIdx} className="admin-project-card" style={{ padding: '1.5rem' }}>
                      <div className="admin-project-card__header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span className="admin-project-card__number">TIER #{sIdx + 1}</span>
                          <span style={{ fontWeight: 700 }}>{srv.title || 'Untitled Service'}</span>
                          {srv.featured && (
                            <span style={{ fontSize: '0.7rem', padding: '2px 8px', background: 'var(--accent)', color: 'var(--bg-color)', borderRadius: '6px', fontWeight: 700 }}>
                              FEATURED
                            </span>
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...(Array.isArray(siteContent?.sections?.services) ? siteContent.sections.services : defaultServices)];
                              updated[sIdx].featured = !updated[sIdx].featured;
                              setSiteContent({ ...siteContent, sections: { ...siteContent.sections, services: updated } });
                            }}
                            className="btn"
                            style={{ fontSize: '0.7rem', padding: '4px 10px' }}
                          >
                            <Sparkles size={12} /> {srv.featured ? 'Unfeature' : 'Feature'}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (Array.isArray(siteContent?.sections?.services) ? siteContent.sections.services : defaultServices).filter((_, i) => i !== sIdx);
                              setSiteContent({ ...siteContent, sections: { ...siteContent.sections, services: updated } });
                            }}
                            style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="admin-project-card__grid">
                        <div className="admin-project-card__row">
                          <div className="admin-field">
                            <label>Service Title</label>
                            <input 
                              className="admin-input" 
                              value={srv.title || ''} 
                              onChange={e => {
                                const updated = [...(Array.isArray(siteContent?.sections?.services) ? siteContent.sections.services : defaultServices)];
                                updated[sIdx].title = e.target.value;
                                setSiteContent({ ...siteContent, sections: { ...siteContent.sections, services: updated } });
                              }} 
                            />
                          </div>
                          <div className="admin-field">
                            <label>Tier Label (e.g. Offer A • Quick Win)</label>
                            <input 
                              className="admin-input" 
                              value={srv.tier || ''} 
                              onChange={e => {
                                const updated = [...(Array.isArray(siteContent?.sections?.services) ? siteContent.sections.services : defaultServices)];
                                updated[sIdx].tier = e.target.value;
                                setSiteContent({ ...siteContent, sections: { ...siteContent.sections, services: updated } });
                              }} 
                            />
                          </div>
                        </div>

                        <div className="admin-project-card__row">
                          <div className="admin-field">
                            <label>Price Display (e.g. $450 – $750)</label>
                            <input 
                              className="admin-input" 
                              value={srv.price || ''} 
                              onChange={e => {
                                const updated = [...(Array.isArray(siteContent?.sections?.services) ? siteContent.sections.services : defaultServices)];
                                updated[sIdx].price = e.target.value;
                                setSiteContent({ ...siteContent, sections: { ...siteContent.sections, services: updated } });
                              }} 
                            />
                          </div>
                          <div className="admin-field">
                            <label>Billing Period (e.g. fixed fee, project-based, per month)</label>
                            <input 
                              className="admin-input" 
                              value={srv.period || ''} 
                              onChange={e => {
                                const updated = [...(Array.isArray(siteContent?.sections?.services) ? siteContent.sections.services : defaultServices)];
                                updated[sIdx].period = e.target.value;
                                setSiteContent({ ...siteContent, sections: { ...siteContent.sections, services: updated } });
                              }} 
                            />
                          </div>
                        </div>

                        <div className="admin-project-card__row">
                          <div className="admin-field">
                            <label>Timeframe (e.g. Delivered in 3-5 days)</label>
                            <input 
                              className="admin-input" 
                              value={srv.timeframe || ''} 
                              onChange={e => {
                                const updated = [...(Array.isArray(siteContent?.sections?.services) ? siteContent.sections.services : defaultServices)];
                                updated[sIdx].timeframe = e.target.value;
                                setSiteContent({ ...siteContent, sections: { ...siteContent.sections, services: updated } });
                              }} 
                            />
                          </div>
                          <div className="admin-field">
                            <label>Badge Tag (e.g. Most Popular)</label>
                            <input 
                              className="admin-input" 
                              value={srv.badge || ''} 
                              onChange={e => {
                                const updated = [...(Array.isArray(siteContent?.sections?.services) ? siteContent.sections.services : defaultServices)];
                                updated[sIdx].badge = e.target.value;
                                setSiteContent({ ...siteContent, sections: { ...siteContent.sections, services: updated } });
                              }} 
                            />
                          </div>
                        </div>

                        <div className="admin-field">
                          <label>Description / Pitch</label>
                          <textarea 
                            className="admin-input" 
                            style={{ height: '65px', fontSize: '0.85rem' }} 
                            value={srv.desc || ''} 
                            onChange={e => {
                              const updated = [...(Array.isArray(siteContent?.sections?.services) ? siteContent.sections.services : defaultServices)];
                              updated[sIdx].desc = e.target.value;
                              setSiteContent({ ...siteContent, sections: { ...siteContent.sections, services: updated } });
                            }} 
                          />
                        </div>

                        <div className="admin-field">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <label>Deliverables Included</label>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...(Array.isArray(siteContent?.sections?.services) ? siteContent.sections.services : defaultServices)];
                                const currentDelivs = Array.isArray(updated[sIdx].deliverables) ? updated[sIdx].deliverables : [];
                                updated[sIdx].deliverables = [...currentDelivs, "New deliverable item"];
                                setSiteContent({ ...siteContent, sections: { ...siteContent.sections, services: updated } });
                              }}
                              className="btn"
                              style={{ fontSize: '0.65rem', padding: '2px 8px' }}
                            >
                              <Plus size={10} /> Add Item
                            </button>
                          </div>
                          <div className="admin-impact-list">
                            {(Array.isArray(srv.deliverables) ? srv.deliverables : []).map((deliv, dIdx) => (
                              <div key={dIdx} className="admin-impact-item">
                                <input 
                                  className="admin-input" 
                                  style={{ fontSize: '0.85rem', padding: '8px 12px' }}
                                  value={deliv} 
                                  onChange={e => {
                                    const updated = [...(Array.isArray(siteContent?.sections?.services) ? siteContent.sections.services : defaultServices)];
                                    updated[sIdx].deliverables[dIdx] = e.target.value;
                                    setSiteContent({ ...siteContent, sections: { ...siteContent.sections, services: updated } });
                                  }} 
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = [...(Array.isArray(siteContent?.sections?.services) ? siteContent.sections.services : defaultServices)];
                                    updated[sIdx].deliverables = updated[sIdx].deliverables.filter((_, i) => i !== dIdx);
                                    setSiteContent({ ...siteContent, sections: { ...siteContent.sections, services: updated } });
                                  }}
                                  style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* The Ecosystem Manager */}
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h4 style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '10px' }}><Sliders size={18} /> THE_ECOSYSTEM (SKILLS)</h4>
                  <button 
                    onClick={() => {
                      const sections = siteContent?.sections || { skills: [], experience: [], projects: [] };
                      const current = sections?.skills || [];
                      const updated = [...current, { category: "New Category", items: ["Skill 1", "Skill 2"] }];
                      setSiteContent({...siteContent, sections: {...sections, skills: updated}});
                    }}
                    className="btn" style={{ fontSize: '0.7rem', padding: '5px 12px' }}
                  >
                    <Plus size={14} /> ADD_CATEGORY
                  </button>
                </div>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {(Array.isArray(siteContent?.sections?.skills) ? siteContent.sections.skills : []).map((cat, idx) => (
                    <div key={idx} style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                        <input 
                          className="admin-input" 
                          style={{ flex: 1 }}
                          value={cat?.category || ''} 
                          onChange={e => {
                            const updated = [...(Array.isArray(siteContent?.sections?.skills) ? siteContent.sections.skills : [])];
                            updated[idx].category = e.target.value;
                            setSiteContent({...siteContent, sections: {...siteContent.sections, skills: updated}});
                          }}
                        />
                        <button onClick={() => {
                          const updated = (Array.isArray(siteContent?.sections?.skills) ? siteContent.sections.skills : []).filter((_, i) => i !== idx);
                          setSiteContent({...siteContent, sections: {...siteContent.sections, skills: updated}});
                        }} style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                      </div>
                      <input 
                        className="admin-input" 
                        style={{ fontSize: '0.8rem' }}
                        value={Array.isArray(cat?.items) ? cat.items.join(', ') : ''} 
                        onChange={e => {
                          const updated = [...(Array.isArray(siteContent?.sections?.skills) ? siteContent.sections.skills : [])];
                          updated[idx].items = e.target.value.split(',').map(s => s.trim());
                          setSiteContent({...siteContent, sections: {...siteContent.sections, skills: updated}});
                        }}
                      />
                    </div>
                  ))}
                </div>

              </div>


              {/* Clients & Growth Partners Manager */}
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h4 style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', fontWeight: 700 }}>
                      <Globe size={20} /> CLIENTS_&_PARTNERS_MANAGER
                    </h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>
                      Showcase enterprise clients and partner logos, website links, industries, and engagement scopes on the live site.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      const sections = siteContent?.sections || { skills: [], experience: [], projects: [], services: [], clients: [] };
                      const current = sections?.clients || [];
                      const updated = [
                        ...current,
                        {
                          name: "New Client Partner",
                          logo: "/assets/clients/akij-resource.png",
                          industry: "Technology / Industry",
                          website: "https://example.com",
                          scope: "Description of the data consulting, reporting automation, or analytics work delivered.",
                          tag: "Enterprise BI"
                        }
                      ];
                      setSiteContent({ ...siteContent, sections: { ...sections, clients: updated } });
                    }}
                    className="btn btn-primary" style={{ fontSize: '0.75rem', padding: '6px 14px' }}
                  >
                    <Plus size={14} /> ADD_CLIENT_PARTNER
                  </button>
                </div>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {(Array.isArray(siteContent?.sections?.clients) ? siteContent.sections.clients : defaultClients).map((client, cIdx) => (
                    <div key={cIdx} className="admin-project-card" style={{ padding: '1.5rem' }}>
                      <div className="admin-project-card__header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span className="admin-project-card__number">CLIENT #{cIdx + 1}</span>
                          <span style={{ fontWeight: 700 }}>{client.name || 'Untitled Client'}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (Array.isArray(siteContent?.sections?.clients) ? siteContent.sections.clients : defaultClients).filter((_, i) => i !== cIdx);
                            setSiteContent({ ...siteContent, sections: { ...siteContent.sections, clients: updated } });
                          }}
                          style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                          title="Delete Partner"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="admin-project-card__grid">
                        <div className="admin-project-card__row">
                          <div className="admin-field">
                            <label>Client / Partner Name</label>
                            <input 
                              className="admin-input" 
                              value={client.name || ''} 
                              onChange={e => {
                                const updated = [...(Array.isArray(siteContent?.sections?.clients) ? siteContent.sections.clients : defaultClients)];
                                updated[cIdx].name = e.target.value;
                                setSiteContent({ ...siteContent, sections: { ...siteContent.sections, clients: updated } });
                              }} 
                            />
                          </div>
                          <div className="admin-field">
                            <label>Industry / Vertical</label>
                            <input 
                              className="admin-input" 
                              value={client.industry || ''} 
                              onChange={e => {
                                const updated = [...(Array.isArray(siteContent?.sections?.clients) ? siteContent.sections.clients : defaultClients)];
                                updated[cIdx].industry = e.target.value;
                                setSiteContent({ ...siteContent, sections: { ...siteContent.sections, clients: updated } });
                              }} 
                            />
                          </div>
                        </div>

                        <div className="admin-project-card__row">
                          <div className="admin-field">
                            <label>Website URL</label>
                            <input 
                              className="admin-input" 
                              value={client.website || ''} 
                              placeholder="https://clientwebsite.com"
                              onChange={e => {
                                const updated = [...(Array.isArray(siteContent?.sections?.clients) ? siteContent.sections.clients : defaultClients)];
                                updated[cIdx].website = e.target.value;
                                setSiteContent({ ...siteContent, sections: { ...siteContent.sections, clients: updated } });
                              }} 
                            />
                          </div>
                          <div className="admin-field">
                            <label>Scope Tag (e.g. Enterprise BI, Data Strategy)</label>
                            <input 
                              className="admin-input" 
                              value={client.tag || ''} 
                              onChange={e => {
                                const updated = [...(Array.isArray(siteContent?.sections?.clients) ? siteContent.sections.clients : defaultClients)];
                                updated[cIdx].tag = e.target.value;
                                setSiteContent({ ...siteContent, sections: { ...siteContent.sections, clients: updated } });
                              }} 
                            />
                          </div>
                        </div>

                        <div className="admin-field">
                          <label>Logo Asset URL or Path</label>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <input 
                              className="admin-input" 
                              style={{ flex: 1 }}
                              value={client.logo || ''} 
                              placeholder="/assets/clients/filename.png"
                              onChange={e => {
                                const updated = [...(Array.isArray(siteContent?.sections?.clients) ? siteContent.sections.clients : defaultClients)];
                                updated[cIdx].logo = e.target.value;
                                setSiteContent({ ...siteContent, sections: { ...siteContent.sections, clients: updated } });
                              }} 
                            />
                            {client.logo && (
                              <div style={{ 
                                width: '75px', height: '48px', background: '#fff', borderRadius: '8px', 
                                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px', flexShrink: 0,
                                border: '1px solid var(--border-color)'
                              }}>
                                <img src={client.logo} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} onError={(e) => e.target.style.display = 'none'} />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="admin-field">
                          <label>Work Delivered / Scope Description</label>
                          <textarea 
                            className="admin-input" 
                            style={{ height: '65px', fontSize: '0.85rem' }} 
                            value={client.scope || ''} 
                            placeholder="Briefly describe what was implemented or achieved for this client..."
                            onChange={e => {
                              const updated = [...(Array.isArray(siteContent?.sections?.clients) ? siteContent.sections.clients : defaultClients)];
                              updated[cIdx].scope = e.target.value;
                              setSiteContent({ ...siteContent, sections: { ...siteContent.sections, clients: updated } });
                            }} 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>



              {/* Featured Projects Manager */}
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h4 style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', fontWeight: 700 }}>
                      <Code size={20} /> FEATURED_CASE_STUDIES_MANAGER
                    </h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>
                      Controls spotlight projects, full case studies, metrics, problem/approach, and images on the live site.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      const sections = siteContent?.sections || { skills: [], experience: [], projects: [] };
                      const current = sections?.projects || [];
                      const updated = [
                        ...current, 
                        { 
                          title: "New Strategic Project", 
                          impact_badge: "ROI: High",
                          desc: "Executive summary of the initiative and its core business rationale.",
                          problem: "Friction points or challenges identified within business operations.",
                          approach: "Methodology, architecture, and technology stack implemented.",
                          impact: ["25% Efficiency Increase", "Quantifiable financial outcome"],
                          tags: ["Strategy", "Analytics", "Automation"],
                          image: "",
                          link: "#",
                          github_link: "#"
                        }
                      ];
                      setSiteContent({...siteContent, sections: {...sections, projects: updated}});
                    }}
                    className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '8px 16px', borderRadius: '10px' }}
                  >
                    <Plus size={16} /> ADD_NEW_CASE_STUDY
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {(Array.isArray(siteContent?.sections?.projects) ? siteContent.sections.projects : []).map((proj, idx) => {
                    const projects = Array.isArray(siteContent?.sections?.projects) ? siteContent.sections.projects : [];
                    
                    const updateProject = (field, value) => {
                      const updated = [...projects];
                      updated[idx] = { ...updated[idx], [field]: value };
                      setSiteContent({
                        ...siteContent, 
                        sections: { ...siteContent.sections, projects: updated }
                      });
                    };

                    const moveProject = (direction) => {
                      const targetIdx = idx + direction;
                      if (targetIdx < 0 || targetIdx >= projects.length) return;
                      const updated = [...projects];
                      const [moved] = updated.splice(idx, 1);
                      updated.splice(targetIdx, 0, moved);
                      setSiteContent({
                        ...siteContent,
                        sections: { ...siteContent.sections, projects: updated }
                      });
                    };

                    const impactText = Array.isArray(proj?.impact) 
                      ? proj.impact.join('\n') 
                      : (Array.isArray(proj?.metrics) ? proj.metrics.join('\n') : '');

                    return (
                      <div key={idx} className="admin-project-card">
                        {/* Header & Controls */}
                        <div className="admin-project-card__header">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span className="admin-project-card__number">
                              CASE STUDY {String(idx + 1).padStart(2, '0')}
                            </span>
                            <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
                              {proj?.title || 'Untitled Case Study'}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              title="Move Up"
                              disabled={idx === 0}
                              onClick={() => moveProject(-1)}
                              style={{ 
                                background: 'var(--bg-panel)', border: '1px solid var(--border-color)', 
                                color: idx === 0 ? 'var(--text-muted)' : 'var(--text-main)', 
                                borderRadius: '8px', padding: '6px 10px', cursor: idx === 0 ? 'not-allowed' : 'pointer' 
                              }}
                            >
                              <ChevronUp size={16} />
                            </button>
                            <button
                              title="Move Down"
                              disabled={idx === projects.length - 1}
                              onClick={() => moveProject(1)}
                              style={{ 
                                background: 'var(--bg-panel)', border: '1px solid var(--border-color)', 
                                color: idx === projects.length - 1 ? 'var(--text-muted)' : 'var(--text-main)', 
                                borderRadius: '8px', padding: '6px 10px', cursor: idx === projects.length - 1 ? 'not-allowed' : 'pointer' 
                              }}
                            >
                              <ChevronDown size={16} />
                            </button>
                            <button 
                              title="Delete Case Study"
                              onClick={() => {
                                if (window.confirm(`Delete "${proj?.title || 'this project'}"?`)) {
                                  const updated = projects.filter((_, i) => i !== idx);
                                  setSiteContent({...siteContent, sections: {...siteContent.sections, projects: updated}});
                                }
                              }} 
                              style={{ 
                                color: '#f87171', background: 'rgba(239, 68, 68, 0.1)', 
                                border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', 
                                padding: '6px 10px', cursor: 'pointer', marginLeft: '6px' 
                              }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Fields Grid */}
                        <div className="admin-project-card__grid">
                          <div className="admin-project-card__row">
                            <div className="admin-field">
                              <label>Project Title</label>
                              <input 
                                className="admin-input" 
                                value={proj?.title || ''} 
                                placeholder="e.g., Supply Chain Waste Optimization" 
                                onChange={e => updateProject('title', e.target.value)} 
                              />
                            </div>
                            <div className="admin-field">
                              <label>Impact Badge (Headline Metric)</label>
                              <input 
                                className="admin-input" 
                                value={proj?.impact_badge || ''} 
                                placeholder="e.g., ROI: $2M+ or +12% Retention" 
                                onChange={e => updateProject('impact_badge', e.target.value)} 
                              />
                            </div>
                          </div>

                          <div className="admin-field">
                            <label>Executive Summary / Snippet</label>
                            <textarea 
                              className="admin-input" 
                              style={{ height: '70px', fontSize: '0.85rem' }} 
                              value={proj?.desc || ''} 
                              placeholder="Concise overview displayed on the homepage cards..." 
                              onChange={e => updateProject('desc', e.target.value)} 
                            />
                          </div>

                          <div className="admin-project-card__row">
                            <div className="admin-field">
                              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Target size={14} /> The Business Problem
                              </label>
                              <textarea 
                                className="admin-input" 
                                style={{ height: '90px', fontSize: '0.85rem' }} 
                                value={proj?.problem || ''} 
                                placeholder="Describe friction points, financial leaks, or operational barriers..." 
                                onChange={e => updateProject('problem', e.target.value)} 
                              />
                            </div>
                            <div className="admin-field">
                              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Code size={14} /> The Approach & Architecture
                              </label>
                              <textarea 
                                className="admin-input" 
                                style={{ height: '90px', fontSize: '0.85rem' }} 
                                value={proj?.approach || ''} 
                                placeholder="Describe the methodologies, frameworks, ETL, and strategy..." 
                                onChange={e => updateProject('approach', e.target.value)} 
                              />
                            </div>
                          </div>

                          <div className="admin-field">
                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Award size={14} /> Measurable Impact / Metrics (One per line)
                            </label>
                            <textarea 
                              className="admin-input" 
                              style={{ height: '80px', fontSize: '0.85rem', fontFamily: 'monospace' }} 
                              value={impactText} 
                              placeholder={"20% Reduction in Inventory Waste\nAchieved $2M in annual operational savings\n98% Forecast accuracy"} 
                              onChange={e => {
                                const lines = e.target.value.split('\n').filter(l => l.trim().length > 0);
                                updateProject('impact', lines);
                              }} 
                            />
                          </div>

                          <div className="admin-project-card__row">
                            <div className="admin-field">
                              <label>Project Thumbnail / Hero Image URL</label>
                              <input 
                                className="admin-input" 
                                value={proj?.image || ''} 
                                placeholder="https://images.unsplash.com/... or /project-preview.png" 
                                onChange={e => updateProject('image', e.target.value)} 
                              />
                              {proj?.image && (
                                <div style={{ marginTop: '6px', maxHeight: '100px', overflow: 'hidden', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                                  <img src={proj.image} alt="Preview" style={{ width: '100%', height: '100px', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
                                </div>
                              )}
                            </div>
                            <div className="admin-field">
                              <label>Tech Stack & Competency Tags (Comma Separated)</label>
                              <input 
                                className="admin-input" 
                                value={Array.isArray(proj?.tags) ? proj.tags.join(', ') : ''} 
                                placeholder="Python, SQL, Tableau, Predictive Modeling" 
                                onChange={e => {
                                  const tags = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                                  updateProject('tags', tags);
                                }} 
                              />
                            </div>
                          </div>

                          <div className="admin-project-card__row">
                            <div className="admin-field">
                              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <ExternalLink size={14} /> Live Solution URL (or #)
                              </label>
                              <input 
                                className="admin-input" 
                                value={proj?.link || ''} 
                                placeholder="https://your-dashboard-or-app.com" 
                                onChange={e => updateProject('link', e.target.value)} 
                              />
                            </div>
                            <div className="admin-field">
                              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <FolderGit2 size={14} /> Source Code / Repo URL (Optional)
                              </label>
                              <input 
                                className="admin-input" 
                                value={proj?.github_link || ''} 
                                placeholder="https://github.com/nexabir/..." 
                                onChange={e => updateProject('github_link', e.target.value)} 
                              />
                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Contact & Booking Settings */}
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h4 style={{ marginBottom: '1.5rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Calendar size={18} /> CONTACT_&_DISCOVERY_CHANNELS
                </h4>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div className="admin-project-card__row">
                    <div className="admin-field">
                      <label>Inquiry Email Address</label>
                      <input 
                        className="admin-input" 
                        value={siteContent.contact?.email || 'nexabir@gmail.com'} 
                        onChange={e => setSiteContent({...siteContent, contact: {...siteContent.contact, email: e.target.value}})}
                      />
                    </div>
                    <div className="admin-field">
                      <label>Calendly / Meeting Link</label>
                      <input 
                        className="admin-input" 
                        value={siteContent.contact?.calendly || ''} 
                        placeholder="https://calendly.com/your-meeting-link"
                        onChange={e => setSiteContent({...siteContent, contact: {...siteContent.contact, calendly: e.target.value}})}
                      />
                    </div>
                  </div>
                  <div className="admin-field">
                    <label>LinkedIn Profile URL</label>
                    <input 
                      className="admin-input" 
                      value={siteContent.contact?.linkedin || 'https://bd.linkedin.com/in/md-abir-ul-islam'} 
                      onChange={e => setSiteContent({...siteContent, contact: {...siteContent.contact, linkedin: e.target.value}})}
                    />
                  </div>
                </div>
              </div>

              <button 
                onClick={async () => {
                  setLoading(true);
                  for (const [id, content] of Object.entries(siteContent)) {
                    await supabase.from('site_content').upsert({ id, content });
                  }
                  alert('Site content updated successfully!');
                  setLoading(false);
                }} 
                className="btn btn-primary" 
                style={{ width: 'fit-content' }}
              >
                <Save size={18} /> PUSH_CHANGES_TO_PROD
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>System_Config</h3>
            
            <div style={{ display: 'grid', gap: '2rem' }}>
              {/* Particle Engine */}
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Activity size={18} /> PARTICLE_ENGINE_V2</h4>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <label style={{ fontSize: '0.8rem' }}>PARTICLE_COUNT</label>
                      <span>{systemConfig.particles.count}</span>
                    </div>
                    <input 
                      type="range" min="10" max="500" step="10" 
                      style={{ width: '100%', accentColor: 'var(--accent)' }}
                      value={systemConfig.particles.count}
                      onChange={e => setSystemConfig({...systemConfig, particles: {...systemConfig.particles, count: parseInt(e.target.value)}})}
                    />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <label style={{ fontSize: '0.8rem' }}>FLOW_SPEED</label>
                      <span>{systemConfig.particles.speed}x</span>
                    </div>
                    <input 
                      type="range" min="0.1" max="5.0" step="0.1" 
                      style={{ width: '100%', accentColor: 'var(--accent)' }}
                      value={systemConfig.particles.speed}
                      onChange={e => setSystemConfig({...systemConfig, particles: {...systemConfig.particles, speed: parseFloat(e.target.value)}})}
                    />
                  </div>
                </div>
              </div>

              {/* Branding */}
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Globe size={18} /> BRANDING_ASSETS</h4>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PRIMARY_FONT_FAMILY</label>
                  <input 
                    className="admin-input" 
                    value={systemConfig.branding.font}
                    onChange={e => setSystemConfig({...systemConfig, branding: {...systemConfig.branding, font: e.target.value}})}
                  />
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>FAVICON_SOURCE_URL</label>
                  <input 
                    className="admin-input" 
                    value={systemConfig.branding.favicon}
                    onChange={e => setSystemConfig({...systemConfig, branding: {...systemConfig.branding, favicon: e.target.value}})}
                  />
                </div>
              </div>

              <button 
                onClick={async () => {
                  setLoading(true);
                  await supabase.from('site_content').upsert({ id: 'system_config', content: systemConfig });
                  alert('System configuration saved!');
                  setLoading(false);
                }} 
                className="btn btn-primary" 
                style={{ width: 'fit-content' }}
              >
                <Save size={18} /> APPLY_SYSTEM_CONFIG
              </button>
            </div>
          </motion.div>
        )}

      </main>

      {/* Blog Editor Modal */}
      <AnimatePresence>
        {showEditor && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ 
              position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', 
              backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', 
              alignItems: 'center', justifyContent: 'center', padding: '2rem' 
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="glass-panel"
              style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', padding: '3rem', borderRadius: '24px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{editingBlog ? 'EDIT_POST' : 'NEW_INSIGHT'}</h3>
                <button onClick={() => setShowEditor(false)} style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }}><X /></button>
              </div>

              <form onSubmit={handleSaveBlog} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>TITLE</label>
                  <input value={title} onChange={e => setTitle(e.target.value)} required className="admin-input" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>SNIPPET</label>
                  <textarea value={snippet} onChange={e => setSnippet(e.target.value)} required className="admin-input" style={{ height: '80px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>CONTENT (RICH_TEXT_EDITOR)</label>
                  <div className="quill-container">
                    <ReactQuill 
                      theme="snow" 
                      value={content} 
                      onChange={setContent} 
                      modules={{
                        toolbar: [
                          [{ 'header': [1, 2, 3, false] }],
                          ['bold', 'italic', 'underline', 'strike'],
                          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                          ['link', 'image', 'code-block'],
                          ['clean']
                        ],
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>IMAGE_URL / BASE64</label>
                  <input value={image} onChange={e => setImage(e.target.value)} className="admin-input" />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button type="submit" disabled={loading} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                    {loading ? 'SAVING...' : <><Save size={18} /> COMMIT_CHANGES</>}
                  </button>
                  <button type="button" onClick={() => setShowEditor(false)} className="btn" style={{ flex: 1, justifyContent: 'center' }}>
                    CANCEL
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>
        {`
          .admin-input {
            width: 100%;
            padding: 12px 15px;
            border-radius: 10px;
            background-color: rgba(0,0,0,0.3);
            border: 1px solid var(--border-color);
            color: var(--text-main);
            font-size: 1rem;
            transition: all 0.2s ease;
          }
          .admin-input:focus {
            outline: none;
            border-color: var(--accent);
            box-shadow: 0 0 10px var(--accent-glow);
          }
          .quill-container {
            background: rgba(0,0,0,0.3);
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid var(--border-color);
          }
          .ql-toolbar {
            background: rgba(255,255,255,0.05) !important;
            border: none !important;
            border-bottom: 1px solid var(--border-color) !important;
          }
          .ql-container {
            border: none !important;
            min-height: 300px;
            font-family: 'Inter', sans-serif !important;
            font-size: 1rem !important;
            color: var(--text-main) !important;
          }
          .ql-editor {
            min-height: 300px;
          }
          .ql-stroke {
            stroke: var(--text-main) !important;
          }
          .ql-fill {
            fill: var(--text-main) !important;
          }
          .ql-picker {
            color: var(--text-main) !important;
          }

        `}
      </style>
    </div>
  );
};

export default Admin;
