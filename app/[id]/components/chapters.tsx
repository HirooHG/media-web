'use client';

import {Pending} from '@/app/components/pending';
import {EmptyList} from '@/components/shared/empty-list';
import {ErrorComponent} from '@/components/shared/error';
import {Button} from '@/components/ui/button';
import {Item, ItemActions, ItemContent, ItemDescription, ItemTitle} from '@/components/ui/item';
import {useComicDispatch, useComicSelector} from '@/lib/redux/comic/comic-hooks';
import {fetchChapters, resetChaptersState} from '@/lib/redux/comic/slices/chapters.slice';
import {ArrowRight} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

export const Chapters = ({comic_id}: {comic_id: number}) => {
  const dispatch = useComicDispatch();
  const {chaptersStatus, chapters, chaptersError} = useComicSelector(
    (state) => state.chaptersReducer,
  );
  const router = useRouter();

  useEffect(() => {
    if (chaptersStatus === 'idle') {
      dispatch(fetchChapters({comic_id}));
    }
  }, [dispatch, comic_id, chaptersStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetChaptersState());
    };
  }, [dispatch]);

  if (chaptersStatus === 'pending') {
    return <Pending />;
  }

  if (chaptersError !== null) {
    return (
      <div className="h-6/12 w-full flex items-center justify-center">
        <ErrorComponent error={chaptersError} />
      </div>
    );
  }

  return (
    <>
      {chapters.length === 0 ? (
        <div className="flex items-center justify-center">
          <div className="w-6/12">
            <EmptyList
              title="No chapters found"
              description="No chapters yet to be found for this comic"
            />
          </div>
        </div>
      ) : (
        <ul className="space-y-4 w-full flex-1 overflow-scroll">
          {chapters.map((ch) => (
            <li id={ch.id} key={ch.id}>
              <Item variant="outline">
                <ItemContent>
                  <ItemTitle>
                    {ch.chap} {ch.title && '- ' + ch.title}
                  </ItemTitle>
                  <ItemDescription>{ch.hid}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button
                    variant="ghost"
                    onClick={() => router.push('/' + comic_id + '/chapter/' + ch.id)}
                  >
                    <ArrowRight />
                  </Button>
                </ItemActions>
              </Item>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
