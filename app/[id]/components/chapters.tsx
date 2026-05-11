'use client';

import {Pending} from '@/app/components/pending';
import {EmptyList} from '@/components/shared/empty-list';
import {ErrorComponent} from '@/components/shared/error';
import {Button} from '@/components/ui/button';
import {Item, ItemActions, ItemContent, ItemDescription, ItemTitle} from '@/components/ui/item';
import {useChaptersQuery} from '@/lib/redux/api';
import {ArrowRight} from 'lucide-react';
import {useRouter} from 'next/navigation';

export const Chapters = ({media_id}: {media_id: number}) => {
  const router = useRouter();

  const {
    data: chapters,
    isError,
    isLoading,
    error,
  } = useChaptersQuery(media_id, {refetchOnMountOrArgChange: true});

  if (isLoading) {
    return <Pending />;
  }

  if (isError) {
    return (
      <div className="h-6/12 w-full flex items-center justify-center">
        <ErrorComponent error={error as string} />
      </div>
    );
  }

  return (
    <>
      {!chapters || chapters.length === 0 ? (
        <div className="flex items-center justify-center">
          <div className="w-6/12">
            <EmptyList
              title="No chapters found"
              description="Refresh the chapters to get the latest chapters"
            />
          </div>
        </div>
      ) : (
        <ul className="space-y-4 w-full flex-1 overflow-auto">
          {chapters.map((ch) => (
            <li id={ch.id.toString()} key={ch.id}>
              <Item variant="outline">
                <ItemContent>
                  <ItemTitle>
                    {ch.chap} {ch.title && '- ' + ch.title}{' '}
                  </ItemTitle>
                  <ItemDescription>{ch.translator}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button
                    variant="ghost"
                    className="hover:bg-tertiary dark:hover:bg-tertiary"
                    onClick={() => router.push('/' + media_id + '/chapter/' + ch.id)}
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
