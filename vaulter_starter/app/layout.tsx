import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Vaulter',
  description: 'Automated local news, every 30 minutes.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="border-b border-neutral-200 dark:border-neutral-800">
          <div className="container py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold tracking-tight">Vaulter</a>
            <div className="text-sm opacity-70">Washington · Unbiased</div>
          </div>
        </nav>
        <main className="container py-6">{children}</main>
        <footer className="container py-10 text-sm opacity-70">
          © {new Date().getFullYear()} Vaulter · Built with Next.js
        </footer>
      </body>
    </html>
  )
}
