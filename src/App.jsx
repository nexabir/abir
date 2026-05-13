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
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    // Simulate initial booting sequence
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const ProtectedRoute = ({ children }) => {
    const [session, setSession] = useState(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setChecking(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => subscription.unsubscribe();
    }, []);

    if (checking) return <Loader theme={theme} />;
    if (!session) return <Navigate to="/login" />;

    return children;
  };

  if (loading) {
    return <Loader theme={theme} />;
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <Dashboard theme={theme} />
            </Layout>
          } 
        />
        <Route 
          path="/login" 
          element={<Login theme={theme} />} 
        />
        <Route 
          path="/blog/:id" 
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <BlogPost theme={theme} />
            </Layout>
          } 
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
      </Routes>
    </Router>
  );
}

export default App;
