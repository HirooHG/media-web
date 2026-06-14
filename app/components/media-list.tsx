'use client';

import {useAppSelector} from '@/lib/redux/hooks';
import {Separator} from '@/components/ui/separator';
import {Pending} from './pending';
import {EmptyList} from '../../components/shared/empty-list';
import {MediaItem} from './media-item';
import {Paginator} from './Paginator';
import {ErrorComponent} from '@/components/shared/error';
import {RefreshList} from './refresh-list';
import {MediaStatus} from '@/lib/shared/models/media-status';
import {useMediasQuery} from '@/lib/redux/api';
import {MediaListFilters} from './media-list-filters';
import {Button} from '@/components/ui/button';
import {Search} from 'lucide-react';
import {useDispatch} from 'react-redux';
import {setSearchDialogOpen} from '@/lib/redux/slices/ui-slice';

export function MediaList() {
  const dispatch = useDispatch();
  const {medias, error, status, page, per_page, selectedStatus} = useAppSelector(
    (state) => state.mediaList,
  );

  // automatically re trigger when page, per_page or status updates
  useMediasQuery(
    {
      page,
      per_page,
      status: selectedStatus === null ? null : (MediaStatus[selectedStatus] ?? null),
    },
    {refetchOnMountOrArgChange: true},
  );

  if (status === 'error' || error) {
    return (
      <div className="h-6/12 w-full flex items-center justify-center">
        <ErrorComponent error={error} hasGoHomeAction={false} />
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className="h-6/12 w-full flex items-center justify-center">
        <Pending />
      </div>
    );
  }

  return (
    <div className="h-full relative bg-white dark:bg-(--background2) w-7/12">
      <div className="flex flex-col w-full h-full items-center pt-8">
        <h1 className="text-2xl font-bold mb-4">Medias</h1>
        <div className="w-full flex gap-4 justify-between pr-14">
          <div>
            <MediaListFilters />
          </div>
          <Button
            onClick={() => dispatch(setSearchDialogOpen(true))}
            className="bg-zinc-600 hover:bg-zinc-500 dark:hover:bg-zinc-700 dark:bg-zinc-900 border border-zinc-700 w-50 justify-between rounded-xs"
          >
            <div className="flex items-center gap-2">
              <Search />
              <span>Search</span>
            </div>
            <div className="space-x-2">
              <kbd>⌘</kbd>
              <kbd>K</kbd>
            </div>
          </Button>
        </div>
        {medias.length === 0 ? (
          <div className="h-8/12 flex items-center justify-center">
            <div className="w-fit">
              <EmptyList title="No media" description="No media found" />
            </div>
          </div>
        ) : (
          <>
            <ul className="w-full flex-1 overflow-y-auto">
              {medias.map((media, index) => (
                <li key={media.id} className="h-fit flex flex-col items-center">
                  {(index !== 0 || index !== medias.length - 1) && (
                    <div className="w-11/12 my-4 dark:bg-gray-100">
                      <Separator />
                    </div>
                  )}
                  <div className="w-full px-15">
                    <MediaItem media={media} />
                  </div>
                </li>
              ))}
            </ul>
            <div className="w-full h-20 px-4 flex items-center">
              <Paginator />
            </div>
          </>
        )}
        <div className="absolute bottom-5 right-5">
          <RefreshList />
        </div>
      </div>
    </div>
  );
}
