'use client';

import {Badge} from '@/components/ui/badge';
import {useSocket} from '@/hooks/use-ws';
import {useSession} from 'next-auth/react';

export const WebsocketsStatus = () => {
  const {status} = useSession();
  const {isConnected, triggerAction} = useSocket();

  if (status !== 'authenticated') return null;

  return (
    <Badge
      onClick={() => triggerAction('hello', 'hello', 'world')}
      variant={isConnected ? 'default' : 'destructive'}
      className={'z-10 cursor-pointer'}
    >
      <pre className="pointer-events-none text-sm text-background">Ws</pre>
    </Badge>
  );
};
