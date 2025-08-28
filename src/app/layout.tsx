import { Header } from '@/components/layout/Header';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { MinimizedAppsProvider } from '@/components/providers/MinimizedAppsProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Web App Store',
  description: 'Discover and download amazing web applications',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MinimizedAppsProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <Header />
              <LayoutWrapper>{children}</LayoutWrapper>
            </div>
          </MinimizedAppsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
