import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {ReduxProvider} from '@/app/providers/redux-provider';
import {AuthProvider} from '@/app/providers/auth-provider';
import {Toaster} from 'sonner';
import ThemeToggle from '@/components/ui/theme-toggle';
import {DarkModeProvider} from './providers/dark-mode-provider';
import {WebsocketProvider} from './providers/ws-provider';

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
          <div className="bg-zinc-50 font-sans dark:bg-background">
            <AuthProvider>
              <WebsocketProvider>{children}</WebsocketProvider>
            </AuthProvider>
          </div>
          <Toaster />
        </body>
      </DarkModeProvider>
    </ReduxProvider>
  );
}
