'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/todo', label: 'Tasks' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-brand">
        <span className="brand-dot" />
        LearnHub
      </Link>
      <ul className="navbar-links">
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={pathname === href ? 'active' : ''}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
