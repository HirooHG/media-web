'use client';

import {initWebsocket} from '@/hooks/use-ws';
import {WebSocketContext} from '@/hooks/websocket-context';
import {useTicketQuery} from '@/lib/redux/api';
import {useSession} from 'next-auth/react';
import {ReactNode, useEffect, useRef, useState} from 'react';

export const WebsocketProvider = ({children}: {children: ReactNode}): ReactNode => {
  const socketRef = useRef<WebSocket | null>(null);
  const {data, status} = useSession();
  const {data: ticket} = useTicketQuery(undefined, {
    skip: data?.tokensExpired || status !== 'authenticated',
  });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!socketRef.current && ticket && !data?.tokensExpired && status === 'authenticated') {
      const socket = initWebsocket(ticket);
      socket.onopen = () => setIsConnected(true);
      socket.onclose = () => setIsConnected(false);
      socket.onerror = () => setIsConnected(false);
      socketRef.current = socket;
    }
  }, [data, status, ticket]);

  return (
    <WebSocketContext.Provider value={{socketRef, isConnected}}>
      {children}
    </WebSocketContext.Provider>
  );
};
