'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SKILLS = [
  { name: 'HTML & Semantics', pct: 95 },
  { name: 'CSS & Flexbox/Grid', pct: 90 },
  { name: 'JavaScript (ES6+)', pct: 85 },
  { name: 'React & Hooks', pct: 80 },
  { name: 'Next.js App Router', pct: 75 },
];

const TECH = [
  'React 18', 'Next.js 14', 'JavaScript', 'HTML5', 'CSS3',
  'App Router', 'useState', 'useEffect', 'Props', 'Conditional Rendering',
  'Event Handling', 'Component Composition',
];

const TEAM = [
  { emoji: '🎓', name: 'Student Developer', role: 'Front-End Engineer' },
  { emoji: '📚', name: 'Course Instructor', role: 'Mentor & Reviewer' },
  { emoji: '🛠️', name: 'React & Next.js', role: 'Core Frameworks' },
];

function SkillBar({ name, pct }) {
  return (
    <div className="skill-bar">
      <div className="skill-bar-header">
        <span>{name}</span>
        <span className="pct">{pct}%</span>
      </div>
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${pct}%`, background: 'var(--ink)' }}
        />
      </div>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'A valid email is required.';
    if (!form.message.trim() || form.message.length < 10) e.message = 'Message must be at least 10 characters.';
    return e;
  }

  // EVENT HANDLER: form submission
  function handleSubmit() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSubmitted(true);
    }
  }

  function handleChange(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  }

  // CONDITIONAL RENDERING: success state vs form
  if (submitted) {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center', padding: '28px 0' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>✉️</div>
        <h3 style={{ marginBottom: 8 }}>Message Sent!</h3>
        <p style={{ color: 'var(--muted)', marginBottom: 20 }}>
          Thanks, <strong>{form.name}</strong>. We'll be in touch at {form.email}.
        </p>
        <button className="btn btn-outline btn-sm" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}>
          Send Another
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="form-group">
        <label className="form-label">Your Name</label>
        <input
          type="text"
          className="form-input"
          placeholder="Jane Smith"
          value={form.name}
          onChange={e => handleChange('name', e.target.value)}
        />
        {/* CONDITIONAL RENDERING: error messages */}
        {errors.name && <p style={{ color: 'var(--accent)', fontSize: '0.8rem', marginTop: 4 }}>{errors.name}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">Email Address</label>
        <input
          type="email"
          className="form-input"
          placeholder="jane@example.com"
          value={form.email}
          onChange={e => handleChange('email', e.target.value)}
        />
        {errors.email && <p style={{ color: 'var(--accent)', fontSize: '0.8rem', marginTop: 4 }}>{errors.email}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">Message</label>
        <textarea
          className="form-textarea"
          placeholder="Write your message here..."
          value={form.message}
          onChange={e => handleChange('message', e.target.value)}
        />
        {errors.message && <p style={{ color: 'var(--accent)', fontSize: '0.8rem', marginTop: 4 }}>{errors.message}</p>}
      </div>
      <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleSubmit}>
        Send Message →
      </button>
    </div>
  );
}

export default function AboutPage() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="main-content">
        <div className="page-header animate-fade-in-up">
          <p className="overline">About</p>
          <h1>Behind the App</h1>
          <p>This application was built for a Weeks 1–4 front-end development assignment, demonstrating core React and Next.js concepts.</p>
        </div>

        <div className="about-grid">
          {/* Skills */}
          <div className="about-card animate-fade-in-up stagger-1">
            <h3>🎯 Skills Demonstrated</h3>
            {SKILLS.map(s => <SkillBar key={s.name} {...s} />)}
          </div>

          {/* Tech Stack */}
          <div className="about-card animate-fade-in-up stagger-2">
            <h3>🛠️ Technology Stack</h3>
            <div className="tech-tags">
              {TECH.map(t => <span key={t} className="tech-tag">{t}</span>)}
            </div>

            <div className="divider" />

            {/* Team */}
            <h3 style={{ marginBottom: 14 }}>👥 Team</h3>
            {TEAM.map(m => (
              <div key={m.name} className="team-member">
                <div className="avatar">{m.emoji}</div>
                <div className="member-info">
                  <h4>{m.name}</h4>
                  <p>{m.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Assignment info with toggle — conditional rendering */}
          <div className="about-card animate-fade-in-up stagger-3">
            <h3>📋 Assignment Details</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: 14, lineHeight: 1.7 }}>
              This project fulfils all five objectives: React setup, component state, event handling, conditional rendering, and CSS styling.
            </p>
            <button className="btn btn-ghost btn-sm" style={{ padding: '6px 0' }} onClick={() => setShowMore(v => !v)}>
              {showMore ? '▲ Show less' : '▼ Show objectives'}
            </button>

            {/* CONDITIONAL RENDERING: toggle content */}
            {showMore && (
              <ul className="animate-fade-in" style={{ marginTop: 12, paddingLeft: 18, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 2 }}>
                <li>✅ Set up using React &amp; Next.js</li>
                <li>✅ Home page with welcome message</li>
                <li>✅ Navigation menu across all pages</li>
                <li>✅ Three+ components with own state</li>
                <li>✅ Props passed between components</li>
                <li>✅ Two+ event handlers (click, submit, keydown)</li>
                <li>✅ Conditional rendering throughout</li>
                <li>✅ CSS styling with custom variables</li>
              </ul>
            )}
          </div>

          {/* Contact form */}
          <div className="about-card animate-fade-in-up stagger-4">
            <h3 style={{ marginBottom: 20 }}>✉️ Get In Touch</h3>
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
