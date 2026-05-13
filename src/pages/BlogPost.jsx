import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import Loader from '../components/Loader';

const BlogPost = ({ theme }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching blog:', error);
        navigate('/');
      } else {
        setBlog(data);
      }
      setLoading(false);
    };

    fetchBlog();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (loading) return <Loader theme={theme} />;
  if (!blog) return null;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '8rem', paddingBottom: '10rem' }}>
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="btn"
        style={{ marginBottom: '3rem', borderRadius: '50px', padding: '0.6rem 1.5rem', gap: '10px' }}
      >
        <ArrowLeft size={18} /> BACK_TO_SYSTEM
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {blog.image && (
          <div style={{ 
            width: '100%', 
            height: '400px', 
            borderRadius: '24px', 
            overflow: 'hidden', 
            marginBottom: '3rem',
            border: '1px solid var(--border-color)'
          }}>
            <img 
              src={blog.image} 
              alt={blog.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={14} /> {new Date(blog.timestamp).toLocaleDateString()}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <User size={14} /> Admin_Ul_Islam
          </span>
        </div>

        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
          fontWeight: 800, 
          lineHeight: 1.1, 
          marginBottom: '2rem',
          color: 'var(--text-main)',
          letterSpacing: '-0.02em'
        }}>
          {blog.title}
        </h1>

        <div 
          className="blog-content"
          style={{ 
            fontSize: '1.15rem', 
            lineHeight: 1.8, 
            color: 'var(--text-main)',
            opacity: 0.9
          }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn" style={{ borderRadius: '50px', padding: '0.6rem 1.2rem' }}>
              <Share2 size={16} /> SHARE_INSIGHT
            </button>
          </div>
        </div>
      </motion.div>

      <style>
        {`
          .blog-content p { margin-bottom: 1.5rem; }
          .blog-content h2, .blog-content h3 { margin: 2.5rem 0 1rem; color: var(--accent); }
          .blog-content strong { color: var(--text-main); font-weight: 700; }
          .blog-content br { margin-bottom: 1rem; }
        `}
      </style>
    </div>
  );
};

export default BlogPost;
