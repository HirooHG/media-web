import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {ReduxProvider} from '@/app/providers/redux-provider';
import {AuthProvider} from '@/app/providers/auth-provider';
import {Toaster} from 'sonner';
import ThemeToggle from '@/components/ui/theme-toggle';
import {DarkModeProvider} from './providers/dark-mode-provider';
import {Logout} from './components/logout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Media List',
  description: 'My centralized platform of lecture of media',
  icons: './favicon.ico',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <DarkModeProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div className="bg-zinc-50 font-sans dark:bg-background relative">
            <AuthProvider>
              <div className="absolute top-5 right-7 flex items-center gap-2">
                <ThemeToggle />
                <Logout />
              </div>
              {children}
            </AuthProvider>
          </div>
          <Toaster />
        </body>
      </DarkModeProvider>
    </ReduxProvider>
  );
}
