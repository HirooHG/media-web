'use client';

import {useSocket} from '@/hooks/use-ws';
import {useSession} from 'next-auth/react';
import {Button} from '../ui/button';

export const WebsocketsStatus = () => {
  const {status} = useSession();
  const {isConnected, triggerAction} = useSocket();

  if (status !== 'authenticated') return null;

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={() => triggerAction('hello', 'hello', 'world')}
        className={
          'px-0 py-0 size-8 ' + (isConnected ? 'bg-green-500 hover:bg-green-300' : 'bg-red-600')
        }
      >
        <pre className="pointer-events-none text-sm text-background">Ws</pre>
      </Button>
      <span className="text-nowrap">Websocket status</span>
    </div>
  );
};
