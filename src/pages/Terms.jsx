import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Scale, Calculator, ShieldCheck, FileCheck, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Terms = () => {
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
            <Scale size={20} />
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', color: 'var(--accent)', textTransform: 'uppercase' }}>
            Legal Framework
          </span>
        </div>

        <h1 style={{ 
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', 
          fontWeight: 800, 
          letterSpacing: '-0.02em', 
          marginBottom: '1rem',
          color: 'var(--text-main)'
        }}>
          Terms of Service & Consulting Disclaimers
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '3rem' }}>
          Effective Date: October 2026 • Governing website access, consulting retainers, and analytical advisory
        </p>

        <div className="legal-content" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', color: 'var(--text-main)', lineHeight: 1.8, fontSize: '1rem' }}>
          
          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileCheck size={20} /> 1. Nature of Engagement
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              All advisory engagements, Power BI dashboard builds, and monthly retainers conducted by <strong>Md. Abir Ul Islam</strong> are independent consulting engagements. Specific deliverables, delivery milestones, pricing terms, and service-level agreements (SLAs) are formalized through distinct Statements of Work (SOW) executed between the client and consultant prior to engagement commencement.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calculator size={20} /> 2. Financial & ROI Calculator Disclaimer
            </h2>
            <div style={{
              background: 'rgba(234, 179, 8, 0.08)',
              border: '1px solid rgba(234, 179, 8, 0.25)',
              borderRadius: '16px',
              padding: '1.5rem',
              marginBottom: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#eab308', fontWeight: 700, marginBottom: '0.5rem' }}>
                <AlertTriangle size={18} /> Important Performance Disclaimer
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
                The interactive ROI and Time-Saved Calculator provided on this website is for <strong>educational and illustrative estimation purposes only</strong>. Calculations are mathematical projections based upon user-adjusted inputs (billable rate, agency accounts, manual reporting hours). They do not represent financial guarantees, binding warranties, or guaranteed profit generation. Actual commercial outcomes vary based upon client data maturity, organizational execution, and market conditions.
              </p>
            </div>
          </section>

          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={20} /> 3. Intellectual Property & Deliverables
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Upon receipt of full payment for contracted services:
            </p>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Client Deliverables:</strong> The client retains full ownership of bespoke Power BI reports (.pbix), customized DAX measures, SQL queries, data extraction scripts, and documentation developed specifically for their engagement.</li>
              <li><strong>Client Data:</strong> All client sales, advertising, customer, and internal financial data remain the exclusive property and trade secrets of the client, protected under strict Non-Disclosure Agreements (NDAs).</li>
              <li><strong>Pre-Existing IP:</strong> Generic framework architectures, foundational utility scripts, and generalized portfolio case study narratives remain the intellectual property of the consultant.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.8rem' }}>
              4. Enterprise Logos & Trademark Fair Use Notice
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              All brand names, client logos, registered marks, and trademarks featured on this website (including but not limited to <em>Akij Resource, Anwar Group of Industries, Daffodil Family, and Global Entrepreneurship Network</em>) are the intellectual property of their respective trademark proprietors. They are displayed strictly under nominative fair use for historical identification of advisory engagements, project collaborations, and professional portfolio demonstration. No formal endorsement or sponsorship is implied beyond the scope of past engagements.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.8rem' }}>
              5. Limitation of Liability
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              Business intelligence models, predictive forecasts, and data visualizations are advisory tools designed to support informed executive decision-making. In no event shall Md. Abir Ul Islam be held liable for indirect, incidental, or consequential business losses, lost profits, or operational disruptions arising from commercial business decisions made using analytical dashboards or reporting models.
            </p>
          </section>

          <section style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.8rem' }}>
              6. Contact for Contractual Inquiries
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              For contract reviews, formal Master Service Agreements (MSAs), or bespoke NDA requests, reach out directly at: <a href="mailto:nexabir@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>nexabir@gmail.com</a>.
            </p>
          </section>

        </div>
      </motion.div>
    </div>
  );
};

export default Terms;
