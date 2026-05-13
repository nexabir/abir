import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings as SettingsIcon, Save, RefreshCw, Key, 
  FileText, Plus, Edit, Trash2, LogOut, Layout, 
  Image as ImageIcon, Check, X, AlertCircle
} from 'lucide-react';
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

  useEffect(() => {
    fetchBlogs();
  }, []);

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

        {activeTab === 'settings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
             {/* Existing Settings logic can go here */}
             <div className="glass-panel" style={{ padding: '2rem' }}>
               <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Key size={18} /> API_KEY_MANAGEMENT</h3>
               <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Supabase Connection: ACTIVE</p>
               <button className="btn" disabled><RefreshCw size={16} /> RE_SYNC_DATA</button>
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
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>CONTENT (HTML)</label>
                  <textarea value={content} onChange={e => setContent(e.target.value)} required className="admin-input" style={{ height: '250px', fontFamily: 'monospace' }} />
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
        `}
      </style>
    </div>
  );
};

export default Admin;
