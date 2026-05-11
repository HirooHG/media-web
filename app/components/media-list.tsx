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
import {SelectPerPage} from './select-per-page';
import {useState} from 'react';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@/components/ui/collapsible';
import {Button} from '@/components/ui/button';
import {Filter} from 'lucide-react';

export function MediaList() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
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
    <div className="h-full relative bg-white dark:bg-(--background2) w-7/12">
      {medias.length === 0 ? (
        <div className="h-10/12 flex items-center justify-center">
          <div className="w-fit">
            <EmptyList title="No media" description="No media found" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full h-full items-center pt-8">
          <h1 className="text-2xl font-bold mb-4">Medias</h1>
          <Collapsible
            open={isFiltersOpen}
            onOpenChange={(v) => setIsFiltersOpen(v)}
            className="w-full flex flex-col px-10"
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <Filter />
                <span className="sr-only">Toggle details</span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex gap-4 items-center py-2">
                <SelectPerPage />
                <SelectMediaStatus />
              </div>
            </CollapsibleContent>
          </Collapsible>
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
        </div>
      )}
      <div className="absolute bottom-5 right-5">
        <RefreshList />
      </div>
    </div>
  );
}
