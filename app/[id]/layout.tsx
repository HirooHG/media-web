import {ReduxComicProvider} from './provider';

export default function ComicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ReduxComicProvider>{children}</ReduxComicProvider>;
}
