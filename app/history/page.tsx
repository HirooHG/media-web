'use client';

import {useSession} from 'next-auth/react';
import {HistoryList} from './components/history-list';
import {redirect} from 'next/navigation';

export default function HistoryPage() {
  const {status: session, data: sessionData} = useSession();

  if (session === 'unauthenticated' || sessionData?.tokensExpired) {
    redirect('/');
  }

  return (
    <div className="w-full flex justify-center min-h-screen">
      <div className="w-full fixed h-16 flex justify-center">
        <div className="w-10/12 h-full relative flex items-center justify-center bg-white dark:bg-zinc-950">
          <span className="font-bold text-2xl">History</span>
        </div>
      </div>
      <div className="w-8/12 bg-white dark:bg-zinc-950">
        <div className="w-full pt-16">
          <HistoryList />
        </div>
      </div>
    </div>
  );
}
