'use client';

import {Pending} from '@/app/components/pending';
import {EmptyList} from '@/components/shared/empty-list';
import {ErrorComponent} from '@/components/shared/error';
import {Button} from '@/components/ui/button';
import {useChapterQuery} from '@/lib/redux/api';
import {useAppSelector} from '@/lib/redux/hooks';
import {ChevronLeft, ChevronRight, Home} from 'lucide-react';
import {useSession} from 'next-auth/react';
import {redirect, useRouter} from 'next/navigation';

export const ChapterDetails = ({comic_id, chapter_id}: {comic_id: number; chapter_id: number}) => {
  const {status: session, data} = useSession();

  if (session === 'unauthenticated' || data?.tokensExpired) {
    redirect('/');
  }

  const {status, error, chapter} = useAppSelector((state) => state.chapter);
  const router = useRouter();
  useChapterQuery({media_id: comic_id, chapter_id}, {refetchOnMountOrArgChange: true});

  const home = () => {
    router.push('/' + comic_id);
  };

  if (status === 'error' && error !== null) {
    return (
      <div className="w-full h-6/12 flex items-center justify-center">
        <ErrorComponent error={error} />
      </div>
    );
  }

  return (
    <>
      {status === 'pending' || chapter === null ? (
        <div className="w-full h-6/12 flex items-center justify-center">
          <Pending />
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-full h-full">
          <div className="flex flex-col gap-2 px-5">
            <h1 className="text-2xl font-bold">Chapter - {chapter.chap}</h1>
            <span>{chapter.title ?? <span className="italic">No title in there</span>}</span>
          </div>
          <div className="flex-1 overflow-y-scroll">
            <ul>
              {chapter.images && chapter.images.length !== 0 ? (
                chapter.images.map((ch, i) => {
                  const url =
                    process.env.NEXT_PUBLIC_API_URL +
                    '/medias/' +
                    comic_id +
                    '/' +
                    chapter_id +
                    '/' +
                    ch.url;
                  return (
                    <li key={i}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="max-w-full" src={url} loading="lazy" alt={ch.id}></img>
                    </li>
                  );
                })
              ) : (
                <div className="w-full flex items-center justify-center">
                  <div className="w-6/12">
                    <EmptyList
                      title="No images"
                      description="There's no image for this chapter, maybe that's a problem"
                    />
                  </div>
                </div>
              )}
            </ul>
            <div className="w-full h-30 flex items-center text-zinc-600 bg-zinc-50">
              <Button className="bg-transparent text-inherit relative flex-1 h-full rounded-none hover:bg-zinc-200 flex items-center justiy-center">
                <ChevronLeft className="absolute left-5" />
                <span>Prev</span>
              </Button>
              <div className="h-10/12 bg-zinc-200" style={{width: '1px'}}></div>
              <Button
                onClick={home}
                className="bg-transparent text-inherit flex-1 h-full rounded-none hover:bg-zinc-200 flex items-center justiy-center"
              >
                <Home />
                <span>Home</span>
              </Button>
              <div className="h-10/12 bg-zinc-200" style={{width: '1px'}}></div>
              {!chapter.is_last_chapter && (
                <Button className="bg-transparent text-inherit relative flex-1 h-full rounded-none hover:bg-zinc-200 flex items-center justiy-center">
                  <span>Next</span>
                  <ChevronRight className="absolute right-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
