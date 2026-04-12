import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { AppProviders } from '@/components/providers/app-providers';
import { SiteChrome } from '@/components/site-chrome';

export const metadata: Metadata = {
  title: 'Vedteix Technology',
  description: 'Official Website for Vedteix Technology',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themePreference = cookieStore.get('theme')?.value;
  const isDarkTheme = themePreference !== 'light';

  return (
    <html
      lang="en"
      className={cn(isDarkTheme && 'dark', 'scroll-smooth')}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased flex flex-col transition-colors duration-300'
        )}
      >
        <AppProviders initialThemeDark={isDarkTheme}>
          <SiteChrome initialTheme={isDarkTheme ? 'dark' : 'light'}>{children}</SiteChrome>
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}
