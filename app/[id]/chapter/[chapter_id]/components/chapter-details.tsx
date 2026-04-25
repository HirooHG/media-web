'use client';

import {Pending} from '@/app/components/pending';
import {EmptyList} from '@/components/shared/empty-list';
import {ErrorComponent} from '@/components/shared/error';
import {Button} from '@/components/ui/button';
import {useChapterQuery} from '@/lib/redux/api';
import {ChevronLeft, ChevronRight, ChevronUp} from 'lucide-react';
import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';
import {ChapterImage} from './chapter-image';
import {useRouter} from 'next/navigation';
import {ButtonGroup} from '@/components/ui/button-group';
import {SelectMediaChapters} from './select-media-chapters';
import {paramsChapterSchema} from '@/types/schemas/params-schema';

export const ChapterDetails = (props: {id: string; chapter_id: string}) => {
  const {status: session, data: sessionData} = useSession();
  const {push} = useRouter();

  if (session === 'unauthenticated' || sessionData?.tokensExpired) {
    redirect('/');
  }

  const parsedProps = paramsChapterSchema.safeParse(props);

  const {
    data: chapter,
    isLoading,
    isError,
    error,
  } = useChapterQuery(
    {media_id: parsedProps.data?.id ?? 0, chapter_id: parsedProps.data?.chapter_id ?? 0},
    {refetchOnMountOrArgChange: true, skip: !parsedProps.success},
  );

  if (isError || parsedProps.error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <ErrorComponent error={parsedProps.error?.message ?? (error as string) ?? ''} />
      </div>
    );
  }

  const {id, chapter_id} = parsedProps.data;

  const navigate = (action: 'prev' | 'next') => {
    const prop = action === 'prev' ? 'prev_chap' : 'next_chap';
    if (chapter) push('/' + parsedProps.data.id + '/chapter/' + chapter[prop]);
  };

  return (
    <>
      {isLoading || !chapter ? (
        <div className=" w-full h-screen flex items-center justify-center">
          <Pending />
        </div>
      ) : (
        <div className="flex gap-2 w-full h-full overflow-y-scroll relative">
          <div className="fixed right-10 top-4 w-5/12 flex flex-col gap-2">
            <div className="h-15 flex items-center gap-4">
              <Button className="h-full" onClick={() => push('/' + id)}>
                <ChevronLeft />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Chapter - {chapter.chap}</h1>
                <span>
                  {chapter.translator}{' '}
                  {chapter.title ?? <span className="italic">No title in there</span>}
                </span>
              </div>
            </div>
            <ButtonGroup className="w-full">
              {chapter.prev_chap && (
                <Button className="w-30" variant="outline" onClick={() => navigate('prev')}>
                  <ChevronLeft />
                </Button>
              )}
              <SelectMediaChapters media_id={id} chapter_id={chapter_id} />
              {chapter.next_chap && (
                <Button className="w-30" variant="outline" onClick={() => navigate('next')}>
                  <ChevronRight />
                </Button>
              )}
            </ButtonGroup>
          </div>
          {chapter.images && chapter.images.length !== 0 ? (
            <div className="flex flex-col items-center w-3xl">
              <div className="fixed left-5 bottom-20">
                <Button
                  className="w-15"
                  variant="outline"
                  onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                >
                  <ChevronUp />
                </Button>
              </div>
              <ul className="w-full">
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
            <div className="h-screen w-3xl flex items-center justify-center">
              <div className="w-6/12">
                <EmptyList
                  title="No images"
                  description="There's no image for this chapter, maybe that's a problem"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
