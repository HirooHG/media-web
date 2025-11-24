import {ReactNode} from 'react';
import ReduxChapterProvider from './provider';

export default function ChapterLayout({children}: Readonly<{children: ReactNode}>) {
  return <ReduxChapterProvider>{children}</ReduxChapterProvider>;
}
