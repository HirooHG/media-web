'use client';

import {signIn, signOut, useSession} from 'next-auth/react';
import {MediaList} from './components/media-list';
import {BookOpen} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {appToast} from '@/components/shared/app-toast';
import {useEffect, useRef} from 'react';
import {AppSidebarProvider} from '@/components/shared/app-sidebar-provider';
import {SearchDialog} from '@/components/shared/search-dialog';

export default function Home() {
  const {status, data} = useSession();

  const expired = useRef(false);
  const tokensExpired = data?.tokensExpired ?? false;

  useEffect(() => {
    if (tokensExpired && status !== 'loading' && !expired.current) {
      expired.current = true;
      // signout keycloak
      signOut({redirect: false})
        .then(() => {
          appToast('Session expired', 'Consider to log in again');
        })
        .catch((e) => {
          appToast('Error occured', 'An error occured signing out: ' + e);
        });
    }
  }, [tokensExpired, status]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center space-y-2">
      {status === 'authenticated' && !data.tokensExpired ? (
        <AppSidebarProvider className="flex items-center justify-center">
          <SearchDialog />
          <MediaList />
        </AppSidebarProvider>
      ) : (
        <div className="flex flex-col items-center justify-center h-8/12 gap-2 max-w-3xl">
          <span className="text-5xl font-bold w-fit flex gap-2 items-center">Welcome</span>
          <span className="flex gap-2">
            Here&apos;s presented my list of media <BookOpen />
          </span>
          <Button onClick={() => signIn('keycloak', {redirect: false})}>Sign in</Button>
          {tokensExpired && <span className="text-red-500 text-sm">Session expired</span>}
        </div>
      )}
    </div>
  );
}
