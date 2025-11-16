'use client';

import {comicStore} from '@/lib/redux/comic/comic-store';
import {ReactNode} from 'react';
import {Provider} from 'react-redux';

export function ReduxComicProvider({children}: {children: ReactNode}) {
  return <Provider store={comicStore}>{children}</Provider>;
}
