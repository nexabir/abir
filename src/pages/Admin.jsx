import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Save, RefreshCw, Key } from 'lucide-react';

const Settings = ({ theme }) => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '3rem' }}>
        <SettingsIcon size={28} className="text-accent" />
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700 }}>System_Config</h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel"
        style={{ padding: '2rem', marginBottom: '2rem' }}
      >
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Key size={18} className="text-accent" />
          Authentication Protocols
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>GITHUB_ACCESS_TOKEN</label>
            <input 
              type="password" 
              placeholder="ghp_***************************"
              style={{ 
                width: '100%', padding: '10px 15px', borderRadius: '8px', 
                backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)',
                color: 'var(--text-main)', fontFamily: 'monospace'
              }} 
            />
          </div>
          <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
            <Save size={16} /> SAVE_TOKEN
          </button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel"
        style={{ padding: '2rem' }}
      >
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <RefreshCw size={18} className="text-accent" />
          Data Synchronization
        </h3>
        
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Sync the latest content structure from the remote repository. Ensure your token is validated before executing synchronization protocols.
        </p>

        <button className="btn">
          <RefreshCw size={16} /> SYNC_NOW
        </button>
      </motion.div>
    </div>
  );
};

export default Settings;
