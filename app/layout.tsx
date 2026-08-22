import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Delhi NCR Lab & Diagnostic Centre | Diagnostic Tests & Health Checkups',
  description:
    'Explore diagnostic tests, health checkup packages and home sample collection options with Delhi NCR Lab & Diagnostic Centre.',
  openGraph: {
    title:
      'Delhi NCR Lab & Diagnostic Centre | Diagnostic Tests & Health Checkups',
    description:
      'Explore diagnostic tests, health checkup packages and home sample collection options with Delhi NCR Lab & Diagnostic Centre.',
    images: ['/lab-hero.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
