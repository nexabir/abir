import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Login from './pages/Login';
import BlogPost from './pages/BlogPost';
import Loader from './components/Loader';
import { supabase } from './lib/supabaseClient';
import { Navigate } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [systemConfig, setSystemConfig] = useState({
    particles: { count: 100, speed: 0.5, color: '#eab308' },
    branding: { font: 'Inter', favicon: '/favicon.svg' }
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const fetchConfig = async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('id', 'system_config')
        .single();
      
      if (!error && data) {
        setSystemConfig(data.content);
        // Apply dynamic font
        if (data.content.branding?.font) {
          document.documentElement.style.setProperty('--main-font', data.content.branding.font);
        }
      }
    };
    fetchConfig();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };



  const ProtectedRoute = ({ children }) => {
    const [session, setSession] = useState(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
      if (!supabase) {
        setChecking(false);
        return;
      }

      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setChecking(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => subscription?.unsubscribe();
    }, []);

    if (checking) return <Loader theme={theme} />;
    
    if (!supabase) return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
        Supabase Connection Error. Please check your Environment Variables.
      </div>
    );

    if (!session) return <Navigate to="/login" replace />;

    return children;
  };


  useEffect(() => {
    console.log('App initialized at path:', window.location.pathname);
  }, []);

  if (loading) {
    return <Loader theme={theme} />;
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout theme={theme} toggleTheme={toggleTheme} config={systemConfig}>
              <Dashboard theme={theme} config={systemConfig} />
            </Layout>
          } 
        />

        <Route 
          path="/login" 
          element={<Login theme={theme} />} 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <div style={{ padding: '2rem' }}>
                <Admin theme={theme} />
              </div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/blog/:id" 
          element={
            <Layout theme={theme} toggleTheme={toggleTheme} config={systemConfig}>
              <BlogPost theme={theme} />
            </Layout>
          } 
        />

        {/* Catch-all for debugging - shows a message instead of jumping home */}
        <Route path="*" element={
          <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
            404 - This route was not found in the application logic. (Current Path: {window.location.pathname})
          </div>
        } />
      </Routes>
    </Router>
  );


}

export default App;
