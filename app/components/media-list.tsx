'use client';

import {useAppSelector} from '@/lib/redux/hooks';
import {Separator} from '@/components/ui/separator';
import {Pending} from './pending';
import {EmptyList} from '../../components/shared/empty-list';
import {MediaItem} from './media-item';
import {Paginator} from './paginator';
import {ErrorComponent} from '@/components/shared/error';
import {RefreshList} from './refresh-list';
import {SelectMediaStatus} from './select-media-status';
import {MediaStatus} from '@/lib/shared/models/media-status';
import {useMediasQuery} from '@/lib/redux/api';

export function MediaList() {
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
        <ErrorComponent error={error} />
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
    <>
      <>
        {medias.length === 0 ? (
          <div className="h-8/12 flex items-center justify-center">
            <div className="w-fit">
              <EmptyList title="No media" description="No media found" />
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-scroll">
              {medias.map((media, index) => (
                <li key={media.comic_id} className="h-fit flex flex-col items-center">
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
            <div className="px-15 flex justify-between items-center pb-8">
              <SelectMediaStatus />
              <Paginator />
            </div>
          </>
        )}
      </>
      <div className="absolute bottom-9 right-5">
        <RefreshList />
      </div>
    </>
  );
}
