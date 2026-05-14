import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings as SettingsIcon, Save, RefreshCw, Key, 
  FileText, Plus, Edit, Trash2, LogOut, Layout, 
  Image as ImageIcon, Check, X, AlertCircle, Type, 
  Activity, Sliders, Globe
} from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { supabase } from '../lib/supabaseClient';


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
    hero: { title: '', subtitle: '' },
    sections: { skills: [], experience: [], projects: [] }
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
      setSiteContent(prev => ({
        ...prev,
        ...contentMap,
        sections: {
          ...prev.sections,
          ...(contentMap.sections || {})
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
                  {(siteContent?.sections?.skills || []).map((cat, idx) => (
                    <div key={idx} style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                        <input 
                          className="admin-input" 
                          style={{ flex: 1 }}
                          value={cat?.category || ''} 
                          onChange={e => {
                            const updated = [...(siteContent?.sections?.skills || [])];
                            updated[idx].category = e.target.value;
                            setSiteContent({...siteContent, sections: {...siteContent.sections, skills: updated}});
                          }}
                        />
                        <button onClick={() => {
                          const updated = (siteContent?.sections?.skills || []).filter((_, i) => i !== idx);
                          setSiteContent({...siteContent, sections: {...siteContent.sections, skills: updated}});
                        }} style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                      </div>
                      <input 
                        className="admin-input" 
                        style={{ fontSize: '0.8rem' }}
                        value={cat?.items?.join(', ') || ''} 
                        onChange={e => {
                          const updated = [...(siteContent?.sections?.skills || [])];
                          updated[idx].items = e.target.value.split(',').map(s => s.trim());
                          setSiteContent({...siteContent, sections: {...siteContent.sections, skills: updated}});
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>


              {/* Professional Background Manager */}
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h4 style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '10px' }}><Briefcase size={18} /> PROFESSIONAL_BACKGROUND</h4>
                  <button 
                    onClick={() => {
                      const sections = siteContent?.sections || { skills: [], experience: [], projects: [] };
                      const current = sections?.experience || [];
                      const updated = [...current, { year: "2024", role: "New Role", company: "Company Name", desc: "Job description here..." }];
                      setSiteContent({...siteContent, sections: {...sections, experience: updated}});
                    }}
                    className="btn" style={{ fontSize: '0.7rem', padding: '5px 12px' }}
                  >
                    <Plus size={14} /> ADD_EXPERIENCE
                  </button>
                </div>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {(siteContent?.sections?.experience || []).map((exp, idx) => (
                    <div key={idx} style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                        <input className="admin-input" value={exp?.year || ''} placeholder="Year" onChange={e => {
                          const updated = [...(siteContent?.sections?.experience || [])]; updated[idx].year = e.target.value;
                          setSiteContent({...siteContent, sections: {...siteContent.sections, experience: updated}});
                        }} />
                        <input className="admin-input" value={exp?.role || ''} placeholder="Role" onChange={e => {
                          const updated = [...(siteContent?.sections?.experience || [])]; updated[idx].role = e.target.value;
                          setSiteContent({...siteContent, sections: {...siteContent.sections, experience: updated}});
                        }} />
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <input className="admin-input" value={exp?.company || ''} placeholder="Company" onChange={e => {
                            const updated = [...(siteContent?.sections?.experience || [])]; updated[idx].company = e.target.value;
                            setSiteContent({...siteContent, sections: {...siteContent.sections, experience: updated}});
                          }} />
                          <button onClick={() => {
                            const updated = (siteContent?.sections?.experience || []).filter((_, i) => i !== idx);
                            setSiteContent({...siteContent, sections: {...siteContent.sections, experience: updated}});
                          }} style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                        </div>
                      </div>
                      <textarea className="admin-input" style={{ height: '60px', fontSize: '0.8rem' }} value={exp?.desc || ''} placeholder="Description" onChange={e => {
                        const updated = [...(siteContent?.sections?.experience || [])]; updated[idx].desc = e.target.value;
                        setSiteContent({...siteContent, sections: {...siteContent.sections, experience: updated}});
                      }} />
                    </div>
                  ))}
                </div>
              </div>


              {/* Featured Projects Manager */}
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h4 style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '10px' }}><Code size={18} /> FEATURED_PROJECTS</h4>
                  <button 
                    onClick={() => {
                      const sections = siteContent?.sections || { skills: [], experience: [], projects: [] };
                      const current = sections?.projects || [];
                      const updated = [...current, { title: "New Project", desc: "Project description", tags: ["React", "AI"], link: "#" }];
                      setSiteContent({...siteContent, sections: {...sections, projects: updated}});
                    }}
                    className="btn" style={{ fontSize: '0.7rem', padding: '5px 12px' }}
                  >
                    <Plus size={14} /> ADD_PROJECT
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  {(siteContent?.sections?.projects || []).map((proj, idx) => (
                    <div key={idx} style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <input className="admin-input" value={proj?.title || ''} placeholder="Title" onChange={e => {
                          const updated = [...(siteContent?.sections?.projects || [])]; updated[idx].title = e.target.value;
                          setSiteContent({...siteContent, sections: {...siteContent.sections, projects: updated}});
                        }} />
                        <button onClick={() => {
                          const updated = (siteContent?.sections?.projects || []).filter((_, i) => i !== idx);
                          setSiteContent({...siteContent, sections: {...siteContent.sections, projects: updated}});
                        }} style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', marginLeft: '10px' }}><Trash2 size={16} /></button>
                      </div>
                      <textarea className="admin-input" style={{ height: '60px', fontSize: '0.8rem', marginBottom: '10px' }} value={proj?.desc || ''} placeholder="Description" onChange={e => {
                        const updated = [...(siteContent?.sections?.projects || [])]; updated[idx].desc = e.target.value;
                        setSiteContent({...siteContent, sections: {...siteContent.sections, projects: updated}});
                      }} />
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <input className="admin-input" value={proj?.tags?.join(', ') || ''} placeholder="Tags (React, AI)" onChange={e => {
                          const updated = [...(siteContent?.sections?.projects || [])]; updated[idx].tags = e.target.value.split(',').map(s => s.trim());
                          setSiteContent({...siteContent, sections: {...siteContent.sections, projects: updated}});
                        }} />
                        <input className="admin-input" value={proj?.link || ''} placeholder="Link" onChange={e => {
                          const updated = [...(siteContent?.sections?.projects || [])]; updated[idx].link = e.target.value;
                          setSiteContent({...siteContent, sections: {...siteContent.sections, projects: updated}});
                        }} />
                      </div>
                    </div>
                  ))}
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
