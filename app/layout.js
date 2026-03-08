import './globals.css';

export const metadata = {
  title: 'LearnHub — Student App',
  description: 'A React/Next.js web application demonstrating components, state, and event handling.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
