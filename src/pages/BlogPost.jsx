import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Calendar, User, Share2, ExternalLink, 
  FolderGit2, Sparkles, BookOpen, Clock, Tag 
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import Loader from '../components/Loader';
import DOMPurify from 'dompurify';
import { allBlogs as fallbackBlogs } from '../data/blogsData';

const BlogPost = ({ theme }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        let found = null;
        if (supabase) {
          const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('id', id)
            .single();

          if (!error && data) {
            found = data;
          }
        }

        if (!found) {
          found = fallbackBlogs.find(b => String(b.id) === String(id) || b.slug === id || b.project_id === id);
        }

        if (found) {
          setBlog(found);
          const others = fallbackBlogs.filter(b => String(b.id) !== String(found.id)).slice(0, 3);
          setRelatedBlogs(others);
        } else {
          navigate('/#blog-section');
        }
      } catch (err) {
        console.warn('BlogPost fetch failed, checking local data:', err.message);
        const found = fallbackBlogs.find(b => String(b.id) === String(id) || b.slug === id || b.project_id === id);
        if (found) {
          setBlog(found);
          const others = fallbackBlogs.filter(b => String(b.id) !== String(found.id)).slice(0, 3);
          setRelatedBlogs(others);
        } else {
          navigate('/#blog-section');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) return <Loader theme={theme} />;
  if (!blog) return null;

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', paddingTop: '8rem', paddingBottom: '10rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/#blog-section')}
        className="btn"
        style={{ marginBottom: '3rem', borderRadius: '50px', padding: '0.6rem 1.5rem', gap: '10px' }}
      >
        <ArrowLeft size={18} /> Back to Insights
      </motion.button>

      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {blog.image && (
          <div style={{ 
            width: '100%', 
            maxHeight: '420px', 
            borderRadius: '24px', 
            overflow: 'hidden', 
            marginBottom: '3rem',
            border: '1px solid var(--border-color)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            <img 
              src={blog.image} 
              alt={blog.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {blog.category && (
            <span style={{
              padding: '4px 12px',
              borderRadius: '20px',
              background: 'var(--accent-glow)',
              color: 'var(--accent)',
              fontWeight: 700,
              fontSize: '0.8rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Tag size={12} /> {blog.category}
            </span>
          )}
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={14} /> {new Date(blog.timestamp).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <User size={14} /> Md. Abir Ul Islam
          </span>
          {blog.readTime && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={14} /> {blog.readTime}
            </span>
          )}
        </div>

        <h1 style={{ 
          fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', 
          fontWeight: 800, 
          lineHeight: 1.15, 
          marginBottom: '2rem',
          color: 'var(--text-main)',
          letterSpacing: '-0.02em'
        }}>
          {blog.title}
        </h1>

        {/* Project Links Callout Box */}
        {(blog.github_link || blog.live_link || blog.project_id) && (
          <div style={{
            padding: '1.5rem',
            background: 'var(--bg-panel)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            marginBottom: '3rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--accent)', fontWeight: 700 }}>
                Interactive Artifacts
              </span>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>
                Explore the live working deployment & open-source repository
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {blog.live_link && (
                <a 
                  href={blog.live_link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                  style={{ borderRadius: '50px', padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
              {blog.github_link && (
                <a 
                  href={blog.github_link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn"
                  style={{ borderRadius: '50px', padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
                >
                  <FolderGit2 size={14} /> GitHub Code
                </a>
              )}
              {blog.project_id && (
                <button
                  onClick={() => navigate(`/project/${blog.project_id}`)}
                  className="btn"
                  style={{ borderRadius: '50px', padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
                >
                  <BookOpen size={14} /> Case Study
                </button>
              )}
            </div>
          </div>
        )}

        <div 
          className="blog-content"
          style={{ 
            fontSize: '1.12rem', 
            lineHeight: 1.85, 
            color: 'var(--text-main)',
            opacity: 0.95
          }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content || '') }}
        />

        {/* Share and Tags footer */}
        <div style={{ marginTop: '5rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <button 
            onClick={handleShare}
            className="btn" 
            style={{ borderRadius: '50px', padding: '0.6rem 1.5rem' }}
          >
            <Share2 size={16} /> {copied ? 'URL Copied to Clipboard!' : 'Share Insight'}
          </button>

          <button 
            onClick={() => navigate('/#projects-section')}
            className="btn btn-primary"
            style={{ borderRadius: '50px', padding: '0.6rem 1.5rem' }}
          >
            <Sparkles size={16} /> Explore All 23 Projects
          </button>
        </div>

        {/* More Related Project Deep Dives */}
        {relatedBlogs.length > 0 && (
          <div style={{ marginTop: '5rem' }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '2rem' }}>
              More Architectural <span className="text-accent">Deep-Dives</span>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {relatedBlogs.map((item, i) => (
                <div 
                  key={i}
                  className="glass-panel"
                  onClick={() => navigate(`/blog/${item.id}`)}
                  style={{ padding: '1.5rem', borderRadius: '18px', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                >
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    {item.category || 'Case Study'}
                  </span>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.4, marginBottom: '0.75rem', flex: 1 }}>
                    {item.title}
                  </h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Read Post →
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.article>

      <style>
        {`
          .blog-content p { margin-bottom: 1.5rem; }
          .blog-content h2 { margin: 3rem 0 1.25rem; color: var(--text-main); font-size: 1.8rem; font-weight: 700; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; }
          .blog-content h3 { margin: 2rem 0 1rem; color: var(--accent); font-size: 1.35rem; }
          .blog-content strong { color: var(--text-main); font-weight: 700; }
          .blog-content ul, .blog-content ol { margin-left: 1.75rem; margin-bottom: 1.5rem; }
          .blog-content li { margin-bottom: 0.6rem; }
          .blog-content a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; }
          .blog-content br { margin-bottom: 0.75rem; }
        `}
      </style>
    </div>
  );
};

export default BlogPost;
