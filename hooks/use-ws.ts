import {ActionsType} from '@/types/schemas/ws-schemas';
import {useWebSocket} from './websocket-context';
import {appToast} from '@/components/shared/app-toast';
import {resultSchema} from '@/types/schemas/ws-schemas';

export const initWebsocket = (ticket: string) => {
  const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL + '?ticket=' + ticket);

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    const {data, success} = resultSchema.safeParse(message);

    if (!success) return;

    switch (data.action) {
      case 'imagesLoaded':
        appToast('Images loaded', data.result);
        break;
      case 'chaptersLoaded':
        appToast('Chapters loaded', data.result);
        break;
      case 'world':
        appToast('World', data.result);
        break;
    }
  };

  return ws;
};

export const useSocket = () => {
  const {socketRef, isConnected} = useWebSocket();

  const triggerAction = (action: ActionsType, prop: string, value: string | number) => {
    if (!socketRef.current || !isConnected) {
      appToast('Websockets', 'WebSocket down !');
      return;
    }

    socketRef.current.send(
      JSON.stringify({
        action,
        [prop]: value,
      }),
    );
  };

  const loadMediaChaptersImages = (mediaId: number) => {
    triggerAction('images', 'mediaId', mediaId);
  };

  const hello = () => {
    triggerAction('images', 'hello', 'hello');
  };

  return {isConnected, hello, loadMediaChaptersImages};
};
