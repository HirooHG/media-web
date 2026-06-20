'use client';

import {Pending} from '@/app/components/pending';
import {EmptyList} from '@/components/shared/empty-list';
import {ErrorComponent} from '@/components/shared/error';
import {Button} from '@/components/ui/button';
import {Item, ItemActions, ItemContent, ItemDescription, ItemTitle} from '@/components/ui/item';
import {useChaptersQuery} from '@/lib/redux/api';
import {useAppSelector} from '@/lib/redux/hooks';
import {ArrowRight, Bookmark} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {VersionsDropdown} from './versions-dropdown';
import {useBookmarks} from '@/hooks/useBookmarks';

export const Chapters = ({media_id}: {media_id: number}) => {
  const router = useRouter();
  const {
    chapters,
    chaptersStatus: status,
    chaptersError: error,
  } = useAppSelector((state) => state.media);
  const isDark = useAppSelector((state) => state.settings.theme) === 'dark';

  useChaptersQuery(media_id, {refetchOnMountOrArgChange: true});
  const {bookmark, onBookmarkChapter} = useBookmarks(media_id);

  if (status === 'pending') {
    return <Pending />;
  }

  if (status === 'error' || error) {
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
          {chapters.map((ch) => {
            const isBookmarked = ch.id === bookmark?.chapterId;
            return (
              <li id={ch.id.toString()} key={ch.id}>
                <Item variant="outline">
                  <ItemContent>
                    <ItemTitle>{ch.chap}</ItemTitle>
                    <ItemDescription>
                      {ch.versions.map((c) => c.translator).join(' - ')}
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Bookmark
                      onClick={() => onBookmarkChapter(ch.id)}
                      fill={isBookmarked ? (isDark ? 'white' : 'black') : 'transparent'}
                      className={
                        'cursor-pointer ' +
                        (!isBookmarked
                          ? 'hover:text-black dark:hover:text-white text-transparent'
                          : '')
                      }
                    />
                    <VersionsDropdown
                      versions={ch.versions}
                      action={(version) => router.push('/' + media_id + '/chapter/' + version.hid)}
                    >
                      <Button variant="ghost" className="hover:bg-tertiary dark:hover:bg-tertiary">
                        <ArrowRight />
                      </Button>
                    </VersionsDropdown>
                  </ItemActions>
                </Item>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
