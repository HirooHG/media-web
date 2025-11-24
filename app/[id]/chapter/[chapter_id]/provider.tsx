'use client';

import {chapterStore} from '@/lib/redux/chapter/chapter-store';
import {ReactNode} from 'react';
import {Provider} from 'react-redux';

export default function ReduxChapterProvider({children}: Readonly<{children: ReactNode}>) {
  return <Provider store={chapterStore}>{children}</Provider>;
}
