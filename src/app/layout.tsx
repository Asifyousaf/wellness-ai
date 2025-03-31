import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { AIAssistant } from '@/components/AIAssistant';
import { Providers } from '@/components/providers/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'WellnessAI - Your Personal Health & Fitness Platform',
  description: 'AI-powered wellness platform for personalized health and fitness guidance',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <Providers>
          <Navigation />
          <main>{children}</main>
          <Footer />
          <AIAssistant />
        </Providers>
      </body>
    </html>
  );
}