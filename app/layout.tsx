import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {ReduxProvider} from '@/app/providers/redux-provider';
import {AuthProvider} from '@/app/providers/auth-provider';
import {Toaster} from 'sonner';

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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          <main className="flex h-full w-full max-w-3xl flex-col items-center justify-between pt-16 bg-white dark:bg-black sm:items-start">
            <AuthProvider>
              <ReduxProvider>{children}</ReduxProvider>
            </AuthProvider>
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
