'use client';

import {Pending} from '@/app/components/pending';
import {EmptyList} from '@/components/shared/empty-list';
import {ErrorComponent} from '@/components/shared/error';
import {Button} from '@/components/ui/button';
import {Item, ItemActions, ItemContent, ItemDescription, ItemTitle} from '@/components/ui/item';
import {useChaptersQuery} from '@/lib/redux/api';
import {useAppSelector} from '@/lib/redux/hooks';
import {ArrowRight} from 'lucide-react';
import {useRouter} from 'next/navigation';

export const Chapters = ({comic_id}: {comic_id: number}) => {
  const {chaptersStatus, chapters, chaptersError} = useAppSelector((state) => state.chapters);
  const router = useRouter();

  useChaptersQuery(comic_id, {refetchOnMountOrArgChange: true});

  if (chaptersStatus === 'pending') {
    return <Pending />;
  }

  if (chaptersStatus === 'error' && chaptersError !== null) {
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
              description="Refresh the chapters to get the latest chapters"
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
