import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import ClientLayout from '../components/ClientLayout';
import Header from '../components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NewSiteCloner',
  description: 'AI-powered website tools',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          <Header />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}