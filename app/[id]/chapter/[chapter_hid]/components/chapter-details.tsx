'use client';

import {Pending} from '@/app/components/pending';
import {EmptyList} from '@/components/shared/empty-list';
import {ErrorComponent} from '@/components/shared/error';
import {Button} from '@/components/ui/button';
import {useChapterQuery, useUpsertBookmarkByChapterHidQuery} from '@/lib/redux/api';
import {ChevronLeft, ChevronRight, ChevronUp} from 'lucide-react';
import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';
import {ChapterImage} from './chapter-image';
import {useRouter} from 'next/navigation';
import {ButtonGroup} from '@/components/ui/button-group';
import {SelectMediaChapters} from './select-media-chapters';
import {paramsChapterSchema} from '@/types/schemas/params-schema';
import {Slider} from '@/components/ui/slider';
import {useState} from 'react';

export const ChapterDetails = (props: {id: string; chapterHid: string}) => {
  const {status: session, data: sessionData} = useSession();

  if (session === 'unauthenticated' || sessionData?.tokensExpired) {
    redirect('/');
  }

  const {push} = useRouter();
  const [imageWidth, setImageWidth] = useState(800);
  const parsedProps = paramsChapterSchema.safeParse(props);
  const {
    data: chapter,
    isLoading,
    isError,
    error,
  } = useChapterQuery(
    {media_id: parsedProps.data?.id ?? 0, chapter_hid: parsedProps.data?.chapterHid ?? ''},
    {refetchOnMountOrArgChange: true, skip: !parsedProps.success},
  );
  const {isLoading: isLoadingBookmark, isError: isErrorBookmark} =
    useUpsertBookmarkByChapterHidQuery(
      {mediaId: parsedProps.data?.id ?? 0, chapterHid: parsedProps.data?.chapterHid ?? ''},
      {skip: !parsedProps.success},
    );

  if (isError || parsedProps.error || isErrorBookmark) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <ErrorComponent
          error={
            (parsedProps.error?.message ?? (error as string) ?? isErrorBookmark)
              ? 'Could not create bookmark'
              : ''
          }
        />
      </div>
    );
  }

  const {id, chapterHid} = parsedProps.data;

  if (isLoading || !chapter || isLoadingBookmark) {
    return (
      <div className=" w-full h-screen flex items-center justify-center">
        <Pending />
      </div>
    );
  }

  const version = chapter.versions.find((v) => v.hid === chapterHid);
  if (!version) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <ErrorComponent error="Translator chapter version not found" />
      </div>
    );
  }

  const navigate = (action: 'prev' | 'next') => {
    const prop = action === 'prev' ? 'prev_chap' : 'next_chap';
    if (chapter) push('/' + parsedProps.data.id + '/chapter/' + version[prop]);
  };

  console.log(chapter);

  return (
    <div className="flex flex-col gap-2 w-full h-full relative">
      <div className="xl:fixed xl:p-0 p-4 right-10 top-4 w-115 flex flex-col gap-2">
        <div className="h-15 flex items-center gap-4">
          <Button className="h-full" onClick={() => push('/' + id)}>
            <ChevronLeft className="dark:text-gray-100" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Chapter - {chapter.chap}</h1>
            <span>
              {version.translator}{' '}
              {version.title ?? <span className="italic">No title in there</span>}
            </span>
          </div>
        </div>
        <ButtonGroup className="w-full">
          {version.prev_chap && (
            <Button className="w-30" variant="outline" onClick={() => navigate('prev')}>
              <ChevronLeft />
            </Button>
          )}
          <SelectMediaChapters mediaId={id} version={version} chap={chapter} />
          {version.next_chap && (
            <Button className="w-30" variant="outline" onClick={() => navigate('next')}>
              <ChevronRight />
            </Button>
          )}
        </ButtonGroup>
        <div className="flex gap-2">
          <span className="flex gap-2 text-nowrap">Images width</span>
          <Slider
            defaultValue={[800]}
            min={400}
            max={800}
            onValueChange={(v) => setImageWidth(v[0])}
            step={50}
          />
        </div>
      </div>
      {version.images && version.images.length !== 0 ? (
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
          <div style={{width: imageWidth, height: '100%'}}>
            <ul>
              {version.images.map((ch, i) => {
                return (
                  <li key={i}>
                    <ChapterImage im={ch} />
                  </li>
                );
              })}
            </ul>
          </div>
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
  );
};
