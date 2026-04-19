'use client';

import {signOut, useSession} from 'next-auth/react';
import {MediaList} from './components/media-list';
import {BookOpen} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';
import {appToast} from '@/components/shared/app-toast';
import {useEffect, useRef} from 'react';

export default function Home() {
  const {status, data} = useSession();
  const router = useRouter();

  const expired = useRef(false);
  const tokensExpired = data?.tokensExpired ?? false;

  useEffect(() => {
    if (tokensExpired && status !== 'loading' && !expired.current) {
      expired.current = true;
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
    <div className="h-screen w-full flex flex-col items-center justify-center space-y-2 relative pt-16">
      {status === 'authenticated' && !data.tokensExpired ? (
        <>
          <h1 className="px-15 text-2xl font-bold mb-4">Medias</h1>
          <MediaList />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-8/12 gap-2 max-w-3xl">
          <span className="text-5xl font-bold w-fit flex gap-2 items-center">Welcome</span>
          <span className="flex gap-2">
            Here&apos;s presented my list of media <BookOpen />
          </span>
          <Button onClick={() => router.push('/signin')}>Sign in</Button>
          {tokensExpired && <span className="text-red-500 text-sm">Session expired</span>}
        </div>
      )}
    </div>
  );
}
