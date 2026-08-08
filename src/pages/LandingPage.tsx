import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection observer for reveal animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.glass-card').forEach((card) => {
      const el = card as HTMLElement;
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@400;500;600&family=Geist:wght@400;600&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        .lp-root {
          --color-primary: #a83900;
          --color-primary-container: #ff6b2c;
          --color-on-primary: #ffffff;
          --color-on-primary-container: #5c1c00;
          --color-secondary: #5f5e5e;
          --color-secondary-container: #e2dfde;
          --color-on-secondary-container: #636262;
          --color-tertiary: #4d44e3;
          --color-tertiary-container: #8f8cff;
          --color-on-tertiary: #ffffff;
          --color-background: #f8f9fa;
          --color-surface: #f8f9fa;
          --color-surface-container: #edeeef;
          --color-surface-container-low: #f3f4f5;
          --color-surface-container-lowest: #ffffff;
          --color-surface-container-high: #e7e8e9;
          --color-surface-container-highest: #e1e3e4;
          --color-on-surface: #191c1d;
          --color-on-surface-variant: #594139;
          --color-outline: #8d7167;
          --color-outline-variant: #e2bfb3;
          --color-error: #ba1a1a;
          --color-on-error: #ffffff;
          --color-on-error-container: #93000a;
          font-family: 'Inter', sans-serif;
          background: var(--color-background);
          color: var(--color-on-surface);
        }

        .lp-root .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          line-height: 1;
          display: inline-block;
        }

        .lp-root .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.05);
        }

        .lp-root .hero-gradient {
          background: radial-gradient(circle at 50% 50%, rgba(255, 107, 44, 0.08) 0%, rgba(248, 249, 250, 0) 70%);
        }

        /* Nav */
        .lp-nav {
          background: rgba(248,249,250,0.8);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(226,191,179,0.2);
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .lp-nav-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 16px 64px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .lp-logo {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 24px;
          font-weight: 800;
          color: var(--color-primary);
          letter-spacing: -0.04em;
          text-decoration: none;
        }
        .lp-nav-links {
          display: flex;
          gap: 32px;
        }
        .lp-nav-link {
          font-size: 16px;
          color: var(--color-on-surface-variant);
          text-decoration: none;
          transition: color 0.2s;
        }
        .lp-nav-link:hover { color: var(--color-primary); }
        .lp-nav-link-active {
          color: var(--color-primary);
          font-weight: 700;
          border-bottom: 2px solid var(--color-primary);
          padding-bottom: 4px;
        }
        .lp-nav-actions { display: flex; align-items: center; gap: 16px; }
        .lp-btn-ghost {
          font-family: 'Geist', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: var(--color-on-surface);
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
        }
        .lp-btn-ghost:hover { color: var(--color-primary); }
        .lp-btn-primary {
          font-family: 'Geist', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.05em;
          background: var(--color-primary-container);
          color: var(--color-on-primary);
          border: none;
          padding: 10px 24px;
          border-radius: 8px;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(255,107,44,0.2);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .lp-btn-primary:hover { transform: scale(1.05); }
        .lp-btn-primary:active { transform: scale(0.95); }

        /* Hero */
        .lp-hero {
          position: relative;
          min-height: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 96px 64px 120px;
          overflow: hidden;
          text-align: center;
        }
        .lp-hero-bg {
          position: absolute;
          inset: 0;
          z-index: -1;
        }
        .lp-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,107,44,0.1);
          border: 1px solid rgba(255,107,44,0.2);
          padding: 8px 16px;
          border-radius: 9999px;
          margin-bottom: 32px;
        }
        .lp-badge-text {
          font-family: 'Geist', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-primary);
        }
        .lp-headline {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: var(--color-on-surface);
          margin-bottom: 24px;
          max-width: 900px;
        }
        .lp-headline-accent { color: var(--color-primary-container); }
        .lp-subheadline {
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          line-height: 1.6;
          color: var(--color-on-surface-variant);
          max-width: 700px;
          margin: 0 auto 48px;
        }
        .lp-hero-ctas {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .lp-btn-hero-primary {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 18px;
          font-weight: 600;
          background: var(--color-primary-container);
          color: var(--color-on-primary);
          border: none;
          padding: 20px 40px;
          border-radius: 12px;
          cursor: pointer;
          box-shadow: 0 16px 40px rgba(255,107,44,0.3);
          transition: transform 0.2s;
        }
        .lp-btn-hero-primary:hover { transform: scale(1.05); }
        .lp-btn-hero-secondary {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 18px;
          font-weight: 600;
          background: transparent;
          color: var(--color-on-surface);
          border: 1px solid var(--color-outline);
          padding: 20px 40px;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .lp-btn-hero-secondary:hover { background: var(--color-surface-container); }

        /* Social proof */
        .lp-proof {
          margin-top: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
        }
        .lp-proof-label {
          font-family: 'Geist', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(89,65,57,0.6);
        }
        .lp-proof-logos {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 48px;
          opacity: 0.7;
          filter: grayscale(1);
          transition: all 0.5s;
        }
        .lp-proof-logos:hover { opacity: 1; filter: grayscale(0); }
        .lp-proof-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 20px;
          font-weight: 600;
          color: var(--color-on-surface);
        }

        /* Dashboard preview */
        .lp-dashboard-preview {
          margin-top: 96px;
          width: 100%;
          max-width: 1280px;
          position: relative;
        }
        .lp-dashboard-preview img {
          width: 100%;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.12);
          border: 1px solid rgba(226,191,179,0.1);
        }

        /* Features Section */
        .lp-section {
          padding: 120px 64px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .lp-section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 64px;
          gap: 24px;
        }
        .lp-section-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 48px;
          font-weight: 700;
          line-height: 1.2;
          color: var(--color-on-surface);
          max-width: 600px;
          margin-bottom: 16px;
        }
        .lp-section-subtitle {
          font-size: 18px;
          color: var(--color-on-surface-variant);
        }

        /* Bento grid */
        .lp-bento {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 24px;
        }
        .lp-bento-col-8 { grid-column: span 8; }
        .lp-bento-col-4 { grid-column: span 4; }

        .lp-feature-card {
          padding: 40px;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
        }
        .lp-feature-card-row {
          flex-direction: row;
          align-items: center;
          gap: 40px;
        }
        .lp-feature-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 32px;
          flex-shrink: 0;
        }
        .lp-feature-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 24px;
          font-weight: 600;
          color: var(--color-on-surface);
          margin-bottom: 16px;
        }
        .lp-feature-desc {
          font-size: 16px;
          line-height: 1.6;
          color: var(--color-on-surface-variant);
        }
        .lp-feature-link {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--color-primary);
          font-family: 'Geist', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.05em;
          margin-top: 24px;
          cursor: pointer;
          width: fit-content;
        }

        /* Code mock */
        .lp-code-mock {
          flex: 1;
          background: var(--color-surface-container);
          border-radius: 16px;
          padding: 24px;
          border: 1px solid rgba(226,191,179,0.3);
          min-width: 0;
        }
        .lp-code-dots {
          display: flex;
          gap: 6px;
          margin-bottom: 16px;
        }
        .lp-code-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        .lp-code-line {
          height: 12px;
          background: var(--color-surface-container-highest);
          border-radius: 9999px;
          margin-bottom: 16px;
        }
        .lp-code-spinner {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .lp-spin { animation: spin 1.5s linear infinite; }

        /* Analytics chart */
        .lp-chart {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          height: 80px;
          margin-top: auto;
          padding-top: 32px;
          border-top: 1px solid rgba(226,191,179,0.1);
        }
        .lp-bar {
          flex: 1;
          border-radius: 4px 4px 0 0;
        }

        /* Revenue mock */
        .lp-revenue-card {
          background: var(--color-surface-container-lowest);
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(226,191,179,0.3);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          transform: rotate(3deg);
        }
        .lp-revenue-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }
        .lp-revenue-row {
          display: flex;
          align-items: center;
          gap: 16px;
          background: var(--color-surface-container);
          padding: 12px;
          border-radius: 8px;
        }
        .lp-avatar {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: rgba(255,107,44,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* CTA Section */
        .lp-cta-section {
          padding: 0 64px 120px;
        }
        .lp-cta-box {
          max-width: 1280px;
          margin: 0 auto;
          background: var(--color-primary-container);
          border-radius: 40px;
          padding: 96px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .lp-cta-dots {
          position: absolute;
          inset: 0;
          opacity: 0.1;
          pointer-events: none;
          background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0);
          background-size: 40px 40px;
        }
        .lp-cta-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(40px, 5vw, 72px);
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--color-on-primary);
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
        }
        .lp-cta-desc {
          font-size: 18px;
          color: rgba(255,255,255,0.9);
          max-width: 600px;
          margin-bottom: 48px;
          position: relative;
          z-index: 1;
        }
        .lp-cta-btns {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          justify-content: center;
          position: relative;
          z-index: 1;
        }
        .lp-btn-cta-primary {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 20px;
          font-weight: 600;
          background: var(--color-on-primary-container);
          color: #fff;
          border: none;
          padding: 24px 48px;
          border-radius: 16px;
          cursor: pointer;
          box-shadow: 0 24px 48px rgba(0,0,0,0.2);
          transition: background 0.2s, transform 0.2s;
        }
        .lp-btn-cta-primary:hover { background: var(--color-on-surface); }
        .lp-btn-cta-secondary {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 20px;
          font-weight: 600;
          background: transparent;
          color: var(--color-on-primary);
          border: 2px solid var(--color-on-primary);
          padding: 24px 48px;
          border-radius: 16px;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .lp-btn-cta-secondary:hover { background: rgba(255,255,255,0.1); }

        /* Footer */
        .lp-footer {
          background: var(--color-surface-container-lowest);
          border-top: 1px solid rgba(226,191,179,0.1);
        }
        .lp-footer-inner {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 80px 64px;
          max-width: 1280px;
          margin: 0 auto;
          gap: 48px;
          flex-wrap: wrap;
        }
        .lp-footer-brand {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .lp-footer-tagline {
          font-size: 16px;
          color: var(--color-on-surface-variant);
          max-width: 300px;
        }
        .lp-footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 40px;
        }
        .lp-footer-link {
          font-size: 16px;
          color: var(--color-on-surface-variant);
          text-decoration: none;
          transition: color 0.2s;
        }
        .lp-footer-link:hover { color: var(--color-primary); }
        .lp-footer-link-accent {
          color: var(--color-primary);
          font-weight: 600;
        }
        .lp-footer-copy {
          font-size: 16px;
          color: var(--color-on-surface-variant);
        }

        @media (max-width: 900px) {
          .lp-nav-inner { padding: 16px 24px; }
          .lp-nav-links { display: none; }
          .lp-hero { padding: 80px 24px 80px; }
          .lp-section { padding: 80px 24px; }
          .lp-bento { grid-template-columns: 1fr; }
          .lp-bento-col-8, .lp-bento-col-4 { grid-column: span 1; }
          .lp-feature-card-row { flex-direction: column; }
          .lp-cta-section { padding: 0 24px 80px; }
          .lp-cta-box { padding: 48px 24px; border-radius: 24px; }
          .lp-footer-inner { padding: 48px 24px; flex-direction: column; align-items: flex-start; }
          .lp-section-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="lp-root">
        {/* Nav */}
        <header className="lp-nav">
          <nav className="lp-nav-inner">
            <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
              <img src="/practivo-logo.png" alt="Practivo" style={{ height: 36, objectFit: 'contain' }} />
              <div className="lp-nav-links">
                <a href="#" className="lp-nav-link">Browse</a>
                <a href="#" className="lp-nav-link">Dashboard</a>
                <a href="#" className="lp-nav-link lp-nav-link-active">Creator Hub</a>
                <a href="#" className="lp-nav-link">Community</a>
              </div>
            </div>
            <div className="lp-nav-actions">
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <button className="lp-btn-ghost">Log In</button>
              </Link>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <button className="lp-btn-primary">Get Started</button>
              </Link>
            </div>
          </nav>
        </header>

        <main>
          {/* Hero */}
          <section className="lp-hero">
            <div className="lp-hero-bg hero-gradient" />
            <div>
              <div className="lp-badge">
                <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: 18, fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <span className="lp-badge-text">Educator Platform</span>
              </div>
              <h1 className="lp-headline">
                Turn your <span className="lp-headline-accent">viewers</span><br />into learners.
              </h1>
              <p className="lp-subheadline">
                The easiest way for YouTube educators to create, distribute, and monetize interactive coding drills. Stop being a video host—start being a mentor.
              </p>
              <div className="lp-hero-ctas">
                <button className="lp-btn-hero-primary">Create your first exercise</button>
                <button className="lp-btn-hero-secondary">See how it works</button>
              </div>
            </div>

            {/* Social proof */}
            <div className="lp-proof">
              <p className="lp-proof-label">Join 850+ top educators already using Practivo</p>
              <div className="lp-proof-logos">
                <div className="lp-proof-logo">
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>code</span>
                  DevSchool
                </div>
                <div className="lp-proof-logo">
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>terminal</span>
                  TechFlow
                </div>
                <div className="lp-proof-logo">
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>rocket_launch</span>
                  ShipIt
                </div>
                <div className="lp-proof-logo">
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>database</span>
                  DataCamp
                </div>
              </div>
            </div>

            {/* Dashboard preview */}
            <div className="lp-dashboard-preview glass-card" style={{ padding: 24, borderRadius: 16, marginTop: 96 }} ref={cardsRef}>
              <div style={{ position: 'absolute', top: -40, left: -40, width: 160, height: 160, background: 'rgba(255,107,44,0.1)', filter: 'blur(80px)', borderRadius: '50%' }} />
              <div style={{ position: 'absolute', bottom: -40, right: -40, width: 160, height: 160, background: 'rgba(143,140,255,0.1)', filter: 'blur(80px)', borderRadius: '50%' }} />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0PAzi3F0oDoEpTDcOjDt_LKF0G2sIKk2EmYwjymEWgSsbtXD6LPR68mxPcLO-sWztuAnT8BNfasDmlyPGs3csFhZi7_0H8n0IwG9CbhS6ZpVHKt2JViiz_fqCWGgawpuk5epvzCidJL4ICgn3iGRjE55oWWoXbaqPcz3BfEHI0uHnXoHnTuIW8bItir-kKXMeOzS3mRfs6XGUchuLMjqmGB3wphsvjffIVa211_ESSsPEkP5y9eG1_Of80XbOkgSgp-j17DU5Izk"
                alt="Practivo Dashboard Preview"
                style={{ width: '100%', height: 'auto', borderRadius: 8, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', border: '1px solid rgba(226,191,179,0.1)' }}
              />
            </div>
          </section>

          {/* Features Bento Grid */}
          <section className="lp-section">
            <div className="lp-section-header">
              <div>
                <h2 className="lp-section-title">Built for the next generation of coding instructors.</h2>
                <p className="lp-section-subtitle">We removed the friction between your video content and your student's muscle memory.</p>
              </div>
            </div>

            <div className="lp-bento">
              {/* AI Feature — col 8 */}
              <div className="lp-bento-col-8 glass-card lp-feature-card lp-feature-card-row" style={{ flexDirection: 'row' }}>
                <div style={{ flex: 1 }}>
                  <div className="lp-feature-icon" style={{ background: 'rgba(255,107,44,0.1)' }}>
                    <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: 32 }}>bolt</span>
                  </div>
                  <h3 className="lp-feature-title">AI-Powered Creation</h3>
                  <p className="lp-feature-desc">Paste your video link and we'll generate interactive exercises in seconds. Our AI analyzes your code walkthroughs and builds test suites automatically.</p>
                  <div className="lp-feature-link">
                    <span>Explore AI Tools</span>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span>
                  </div>
                </div>
                <div className="lp-code-mock" style={{ flex: 1 }}>
                  <div className="lp-code-dots">
                    <div className="lp-code-dot" style={{ background: 'rgba(186,26,26,0.2)' }} />
                    <div className="lp-code-dot" style={{ background: 'rgba(168,57,0,0.2)' }} />
                    <div className="lp-code-dot" style={{ background: 'rgba(95,94,94,0.2)' }} />
                  </div>
                  <div className="lp-code-line" style={{ width: '75%' }} />
                  <div className="lp-code-line" style={{ width: '100%' }} />
                  <div className="lp-code-line" style={{ width: '50%', background: 'rgba(255,107,44,0.2)' }} />
                  <div className="lp-code-spinner">
                    <span className="material-symbols-outlined lp-spin" style={{ color: 'var(--color-primary-container)', fontSize: 18 }}>sync</span>
                    <span style={{ fontFamily: 'Geist, monospace', fontSize: 14, color: 'var(--color-primary)', fontWeight: 600 }}>Generating test cases...</span>
                  </div>
                </div>
              </div>

              {/* Analytics — col 4 */}
              <div className="lp-bento-col-4 glass-card lp-feature-card">
                <div className="lp-feature-icon" style={{ background: 'rgba(143,140,255,0.1)' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-tertiary)', fontSize: 32 }}>analytics</span>
                </div>
                <h3 className="lp-feature-title">Detailed Analytics</h3>
                <p className="lp-feature-desc">See exactly where your audience is struggling. Identify common syntax errors and drop-off points in your curricula.</p>
                <div className="lp-chart">
                  <div className="lp-bar" style={{ height: '40%', background: 'rgba(143,140,255,0.3)' }} />
                  <div className="lp-bar" style={{ height: '60%', background: 'rgba(143,140,255,0.5)' }} />
                  <div className="lp-bar" style={{ height: '90%', background: 'var(--color-tertiary-container)' }} />
                  <div className="lp-bar" style={{ height: '75%', background: 'rgba(143,140,255,0.7)' }} />
                  <div className="lp-bar" style={{ height: '45%', background: 'rgba(143,140,255,0.4)' }} />
                </div>
              </div>

              {/* Sandbox — col 4 */}
              <div className="lp-bento-col-4 glass-card lp-feature-card">
                <div className="lp-feature-icon" style={{ background: 'rgba(255,107,44,0.1)' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: 32 }}>terminal</span>
                </div>
                <h3 className="lp-feature-title">In-Browser Sandbox</h3>
                <p className="lp-feature-desc">No local setup for your students; they code directly on the page with a full VS Code-like experience.</p>
              </div>

              {/* Monetization — col 8 */}
              <div className="lp-bento-col-8 glass-card lp-feature-card" style={{ flexDirection: 'row', alignItems: 'center', gap: 40 }}>
                <div style={{ flex: 1 }}>
                  <div className="lp-feature-icon" style={{ background: 'rgba(226,223,222,0.3)' }}>
                    <span className="material-symbols-outlined" style={{ color: 'var(--color-on-secondary-container)', fontSize: 32 }}>payments</span>
                  </div>
                  <h3 className="lp-feature-title">Monetization</h3>
                  <p className="lp-feature-desc">Seamlessly sell access to premium practice sets. Integrate with Stripe and offer tiers that reward your most dedicated learners.</p>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="lp-revenue-card">
                    <div className="lp-revenue-header">
                      <span style={{ fontFamily: 'Geist, sans-serif', fontSize: 14, fontWeight: 600, color: 'var(--color-on-surface)' }}>Course Revenue</span>
                      <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 24, fontWeight: 600, color: 'var(--color-primary)' }}>+$4,280.00</span>
                    </div>
                    <div className="lp-revenue-row">
                      <div className="lp-avatar">
                        <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: 20 }}>person</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ height: 8, background: 'rgba(89,65,57,0.2)', borderRadius: 9999, width: 96 }} />
                      </div>
                      <span style={{ fontFamily: 'Geist, sans-serif', fontSize: 14, fontWeight: 600, color: 'var(--color-on-surface)' }}>$29.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="lp-cta-section">
            <div className="lp-cta-box">
              <div className="lp-cta-dots" />
              <h2 className="lp-cta-title">Scale your educational impact.</h2>
              <p className="lp-cta-desc">
                Join the elite circle of YouTube creators who are building the future of online education. Start for free, upgrade as you grow.
              </p>
              <div className="lp-cta-btns">
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <button className="lp-btn-cta-primary">Get Started for Free</button>
                </Link>
                <button className="lp-btn-cta-secondary">Book a Demo</button>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="lp-footer">
          <div className="lp-footer-inner">
            <div className="lp-footer-brand">
              <img src="/practivo-logo.png" alt="Practivo" style={{ height: 36, objectFit: 'contain' }} />
              <p className="lp-footer-tagline">Master through action. The professional platform for interactive learning.</p>
            </div>
            <div className="lp-footer-links">
              <a href="#" className="lp-footer-link">About Us</a>
              <a href="#" className="lp-footer-link">Privacy Policy</a>
              <a href="#" className="lp-footer-link">Terms of Service</a>
              <a href="#" className="lp-footer-link lp-footer-link-accent">Creator Program</a>
              <a href="#" className="lp-footer-link">Support</a>
            </div>
            <div className="lp-footer-copy">© 2024 Practivo. Master through action.</div>
          </div>
        </footer>
      </div>
    </>
  );
}
