'use client';

import {Button} from '@/components/ui/button';
import {federatedLogout} from '@/lib/logout';
import {LogOut} from 'lucide-react';
import {useSession} from 'next-auth/react';

export const Logout = () => {
  const {status} = useSession();

  if (status !== 'authenticated') return null;

  return (
    <Button className="z-10" variant="link" onClick={federatedLogout}>
      <LogOut className="text-red-500" />
    </Button>
  );
};
