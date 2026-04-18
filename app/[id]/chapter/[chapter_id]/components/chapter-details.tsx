'use client';

import {Pending} from '@/app/components/pending';
import {EmptyList} from '@/components/shared/empty-list';
import {ErrorComponent} from '@/components/shared/error';
import {Button} from '@/components/ui/button';
import {useChapterQuery} from '@/lib/redux/api';
import {ChevronLeft, ChevronRight, Home} from 'lucide-react';
import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';
import {ChapterImage} from './chapter-image';
import {useRouter} from 'next/navigation';

export const ChapterDetails = ({media_id, chapter_id}: {media_id: number; chapter_id: number}) => {
  const {status: session, data: sessionData} = useSession();

  if (session === 'unauthenticated' || sessionData?.tokensExpired) {
    redirect('/');
  }

  const {push} = useRouter();
  const {
    data: chapter,
    isLoading,
    isError,
    error,
  } = useChapterQuery({media_id, chapter_id}, {refetchOnMountOrArgChange: true});

  if (isError) {
    return (
      <div className="w-full h-6/12 flex items-center justify-center">
        <ErrorComponent error={error as string} />
      </div>
    );
  }

  return (
    <>
      {isLoading || !chapter ? (
        <div className="w-full h-6/12 flex items-center justify-center">
          <Pending />
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-full h-full">
          <div className="flex flex-col gap-2 px-5">
            <h1 className="text-2xl font-bold">Chapter - {chapter.chap}</h1>
            <span>{chapter.title ?? <span className="italic">No title in there</span>}</span>
          </div>
          {chapter.images && chapter.images.length !== 0 ? (
            <div className="flex-1 overflow-y-scroll">
              <ul>
                {chapter.images.map((ch, i) => {
                  return (
                    <li key={i}>
                      <ChapterImage im={ch} />
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <div className="flex-1 w-full flex items-center justify-center py-10">
              <div className="w-6/12">
                <EmptyList
                  title="No images"
                  description="There's no image for this chapter, maybe that's a problem"
                />
              </div>
            </div>
          )}
          <div className="w-full h-30 flex items-center text-zinc-600 bg-zinc-50">
            {chapter.prev_chap && (
              <Button
                onClick={() => push('/' + media_id + '/chapter/' + chapter.prev_chap)}
                className="bg-transparent text-inherit relative flex-1 h-full rounded-none hover:bg-zinc-200 flex items-center justiy-center"
              >
                <ChevronLeft className="absolute left-5" />
                <span>Prev</span>
              </Button>
            )}
            <div className="h-10/12 bg-zinc-200" style={{width: '1px'}}></div>
            <Button
              onClick={() => push('/' + media_id)}
              className="bg-transparent text-inherit flex-1 h-full rounded-none hover:bg-zinc-200 flex items-center justiy-center"
            >
              <Home />
              <span>Home</span>
            </Button>
            <div className="h-10/12 bg-zinc-200" style={{width: '1px'}}></div>
            {chapter.next_chap && (
              <Button
                onClick={() => push('/' + media_id + '/chapter/' + chapter.next_chap)}
                className="bg-transparent text-inherit relative flex-1 h-full rounded-none hover:bg-zinc-200 flex items-center justiy-center"
              >
                <span>Next</span>
                <ChevronRight className="absolute right-5" />
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
