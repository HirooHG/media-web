'use client';

import {ComicStore, comicStore} from '@/lib/redux/comic/comic-store';
import {ReactNode, useRef} from 'react';
import {Provider} from 'react-redux';

export function ReduxComicProvider({children}: {children: ReactNode}) {
  const storeRef = useRef<ComicStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = comicStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
