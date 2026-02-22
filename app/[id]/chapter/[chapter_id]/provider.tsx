'use client';

import {ChapterStore, chapterStore} from '@/lib/redux/chapter/chapter-store';
import {ReactNode, useRef} from 'react';
import {Provider} from 'react-redux';

export default function ReduxChapterProvider({children}: Readonly<{children: ReactNode}>) {
  const storeRef = useRef<ChapterStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = chapterStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
