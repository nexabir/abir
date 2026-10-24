import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Eye, Database, Globe, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', paddingTop: '8rem', paddingBottom: '8rem' }}>
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="btn"
        style={{ marginBottom: '2.5rem', borderRadius: '50px', padding: '0.6rem 1.5rem', gap: '10px' }}
      >
        <ArrowLeft size={18} /> Back to Home
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'var(--accent-glow)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent)'
          }}>
            <Shield size={20} />
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', color: 'var(--accent)', textTransform: 'uppercase' }}>
            Legal & Compliance
          </span>
        </div>

        <h1 style={{ 
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', 
          fontWeight: 800, 
          letterSpacing: '-0.02em', 
          marginBottom: '1rem',
          color: 'var(--text-main)'
        }}>
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '3rem' }}>
          Last Updated: October 2026 • Compliant with GDPR (EU/UK), CCPA/CPRA, and International Privacy Frameworks
        </p>

        <div className="legal-content" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', color: 'var(--text-main)', lineHeight: 1.8, fontSize: '1rem' }}>
          
          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Eye size={20} /> 1. Data Controller Overview
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              This Privacy Policy explains how <strong>Md. Abir Ul Islam</strong> ("I", "me", or "nexabir.com") collects, uses, and safeguards information when you visit this website, submit inquiries, or schedule business intelligence consultations. I am committed to respecting your digital privacy and handling personal information with strict confidentiality.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Database size={20} /> 2. Information Collected
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              We collect information only when provided directly by you with your informed consent:
            </p>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Contact & Consultation Inquiries:</strong> Name, work email address, company or agency name, and project scope submitted through our contact form.</li>
              <li><strong>Meeting Scheduling:</strong> Information submitted through our Calendly integration (name, email, selected meeting time slot, timezone).</li>
              <li><strong>Device & Technical Telemetry:</strong> Anonymized connection data provided automatically by Cloudflare edge caching, such as approximate geographic region, browser type, and operating system.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lock size={20} /> 3. How Your Information Is Used
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Your personal information is used exclusively to:
            </p>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Review your business analytics requirements and respond directly to your consulting inquiries.</li>
              <li>Coordinate and host video consultations scheduled via Calendly.</li>
              <li>Ensure the technical reliability, security, and spam prevention of this web application.</li>
            </ul>
            <p style={{ color: 'var(--accent)', fontWeight: 600, marginTop: '1rem' }}>
              I will never sell, rent, monetize, or trade your contact information to third-party data brokers or marketing platforms.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Globe size={20} /> 4. Subprocessors & Third-Party Service Providers
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              To operate a high-performance web experience, this site interfaces with carefully vetted third-party infrastructure providers:
            </p>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><strong>Cloudflare Inc.:</strong> Global CDN edge hosting, DDoS mitigation, and SSL/TLS termination.</li>
              <li><strong>Calendly LLC:</strong> Interactive scheduling widget enabling calendar appointment booking.</li>
              <li><strong>FormSubmit:</strong> Secure email routing relay delivering your direct contact submissions.</li>
              <li><strong>Supabase Inc.:</strong> Cloud database infrastructure for dynamic portfolio and insights management.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.8rem' }}>
              5. Local Storage & Cookie Notice
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              This website does not use tracking cookies or advertising pixels. We utilize standard browser <code>localStorage</code> solely to remember your aesthetic preference (Light or Dark mode). When opening the Calendly booking popup, Calendly may set necessary functional cookies to facilitate booking time selection.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.8rem' }}>
              6. Your Rights Under GDPR & CCPA
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Regardless of your global location, you possess comprehensive rights over your personal data:
            </p>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Right of Access:</strong> Request a copy of any personal details stored in connection with past inquiries.</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate contact records.</li>
              <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request immediate permanent deletion of your inquiry messages and contact records.</li>
              <li><strong>Right to Restrict Processing:</strong> Withdraw permission for future direct communication at any time.</li>
            </ul>
          </section>

          <section style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={20} /> 7. Privacy Inquiries & Data Requests
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
              If you have questions regarding this Privacy Policy or wish to exercise your data protection rights, please contact me directly:
            </p>
            <div style={{ 
              background: 'var(--bg-panel)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '16px', 
              padding: '1.5rem',
              display: 'inline-block' 
            }}>
              <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>Md. Abir Ul Islam</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>Business Analyst & Analytics Consultant</div>
              <a href="mailto:nexabir@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
                nexabir@gmail.com
              </a>
            </div>
          </section>

        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
