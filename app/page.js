import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const features = [
  {
    icon: '🧠',
    title: 'Knowledge Quiz',
    description: 'Test yourself with our interactive multiple-choice quiz. Track your score and learn from detailed explanations after each answer.',
    href: '/quiz',
    label: 'Take the Quiz',
  },
  {
    icon: '✅',
    title: 'Task Manager',
    description: 'Stay organised with a full-featured to-do list. Add tasks with priority levels, filter by status, and track completion.',
    href: '/todo',
    label: 'Manage Tasks',
  },
  {
    icon: '👤',
    title: 'About This App',
    description: 'Learn about the tech stack, the skills demonstrated, and the team behind this assignment project.',
    href: '/about',
    label: 'Learn More',
  },
];

export default function Home() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="main-content">

        {/* HERO */}
        <section className="hero animate-fade-in-up">
          <div className="hero-eyebrow">
            ✦ Weeks 1–4 Assignment
          </div>
          <h1>
            Learn.<br />
            Build.<br />
            <em>Ship.</em>
          </h1>
          <div className="hero-rule" />
          <p>
            A fully interactive React &amp; Next.js web application demonstrating
            components, props, state management, event handling, and
            conditional rendering — all wrapped in a polished UI.
          </p>
          <div className="hero-actions">
            <Link href="/quiz" className="btn btn-accent btn-lg">
              Start the Quiz →
            </Link>
            <Link href="/todo" className="btn btn-outline btn-lg">
              Open Task Manager
            </Link>
          </div>
        </section>

        {/* FEATURE CARDS */}
        <section className="features-section animate-fade-in-up stagger-2">
          <p className="features-heading">Explore the App</p>
          <div className="card-grid">
            {features.map(({ icon, title, description, href, label }, i) => (
              <Link key={href} href={href} className={`feature-card animate-fade-in-up stagger-${i + 2}`}>
                <span className="icon">{icon}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="card-link">{label} →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* TECH STACK STRIP */}
        <section style={{ marginTop: 60, padding: '28px 0', borderTop: '1px solid var(--border)' }}>
          <p className="features-heading" style={{ marginBottom: 16 }}>Built With</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['React 18', 'Next.js 14', 'App Router', 'CSS Variables', 'useState', 'useEffect', 'Conditional Rendering', 'Props'].map(tag => (
              <span key={tag} className="badge badge-muted" style={{ fontSize: '0.8rem', padding: '5px 12px' }}>{tag}</span>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
