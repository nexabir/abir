import React, { useState, useEffect } from 'react';

const Loader = ({ theme }) => {
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);
  const fullText = "INITIALIZING ANALYST_OS_V2.0...";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 200);

    return () => {
      clearInterval(typingInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'var(--bg-color)', color: 'var(--accent)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'monospace', zIndex: 9999
    }}>
      <div style={{ width: '300px' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '2rem', minHeight: '1.5rem', letterSpacing: '2px' }}>
          {text}<span style={{ animation: 'blink 1s infinite' }}>_</span>
        </h2>
        
        <div style={{ 
          width: '100%', height: '4px', backgroundColor: 'var(--border-color)', 
          borderRadius: '4px', overflow: 'hidden', position: 'relative'
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            width: `${progress}%`, backgroundColor: 'var(--accent)',
            transition: 'width 0.2s ease-out', boxShadow: '0 0 10px var(--accent-glow)'
          }} />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>LOADING MODULES</span>
          <span>{progress > 100 ? 100 : progress}%</span>
        </div>
      </div>
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
