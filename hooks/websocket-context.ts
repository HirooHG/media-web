'use client';

import {createContext, RefObject, useContext} from 'react';

export const WebSocketContext = createContext<{
  socketRef: RefObject<WebSocket | null>;
  isConnected: boolean;
} | null>(null);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within WebSocketProvider');
  }
  return context;
};
