'use client';
import {MediaList} from './components/MediaList';

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex h-full w-full max-w-3xl flex-col items-center justify-between pt-16 bg-white dark:bg-black sm:items-start">
        <MediaList />
      </main>
    </div>
  );
}
