import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Loader from './components/Loader';

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
          path="/admin" 
          element={
            <div style={{ padding: '2rem' }}>
              <Admin theme={theme} />
            </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
