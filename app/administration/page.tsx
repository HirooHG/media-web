'use client';

import {useSession} from 'next-auth/react';
import {ReadingStatusAdministration} from './components/reading-statuses';
import {redirect} from 'next/navigation';
import {Separator} from '@/components/ui/separator';

export default function AdministrationPage() {
  const {status: session, data: sessionData} = useSession();

  if (session === 'unauthenticated' || sessionData?.tokensExpired) {
    redirect('/');
  }

  return (
    <div className="h-screen flex justify-center overflow-y-auto">
      <div className="pt-10 w-7/12 flex flex-col gap-6">
        <span className="text-3xl font-bold">Administration</span>
        <div className="flex flex-col gap-10">
          <Separator />
          <ReadingStatusAdministration />
          <Separator />
        </div>
      </div>
    </div>
  );
}
