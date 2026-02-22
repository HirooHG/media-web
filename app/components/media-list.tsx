'use client';

import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@/lib/redux/comics/hooks';
import {setComicImage} from '@/lib/redux/comics/slices/media-list.slice';
import {clearState} from '@/lib/redux/comics/slices/media-image.slice';
import {Separator} from '@/components/ui/separator';
import {Pending} from './pending';
import {EmptyList} from '../../components/shared/empty-list';
import {MediaItem} from './media-item';
import {Paginator} from './paginator';
import {ErrorComponent} from '@/components/shared/error';
import {RefreshList} from './refresh-list';
import {SelectComicStatus} from './select-comic-status';
import {ComicStatus} from '@/lib/shared/models/comic-status';
import {fetchMedias} from '@/lib/redux/comics/thunks/fetch-medias';

export function MediaList() {
  const dispatch = useAppDispatch();
  const {comics, error, status, page, per_page, selectedStatus} = useAppSelector(
    (state) => state.mediaList,
  );
  const {comic_id, imageStatus, newImageName} = useAppSelector((state) => state.mediaImage);

  useEffect(() => {
    // if any of page, per_page or selectedStatus changes
    // it re triggers
    const status = selectedStatus === null ? null : ComicStatus[selectedStatus];

    dispatch(fetchMedias({page, per_page, selectedStatus: status}));
  }, [dispatch, page, per_page, selectedStatus]);

  useEffect(() => {
    if (imageStatus === 'succeeded' && comic_id !== null && newImageName !== null) {
      dispatch(setComicImage({comic_id, url: newImageName}));
      dispatch(clearState());
    }
  }, [comic_id, dispatch, imageStatus, newImageName]);

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
    <div className="w-full h-full flex flex-col space-y-2 relative">
      <h1 className="px-15 text-2xl font-bold mb-4">Medias</h1>
      <>
        {comics.length === 0 ? (
          <div className="h-8/12 flex items-center justify-center">
            <div className="w-fit">
              <EmptyList title="No comic" description="No comic found" />
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-scroll">
              {comics.map((comic, index) => (
                <li key={comic.comic_id} className="h-fit flex flex-col items-center">
                  {(index !== 0 || index !== comics.length - 1) && (
                    <div className="w-11/12 my-4 dark:bg-gray-100">
                      <Separator />
                    </div>
                  )}
                  <div className="w-full px-15">
                    <MediaItem comic={comic} />
                  </div>
                </li>
              ))}
            </ul>
            <div className="px-15 flex justify-between items-center pb-8">
              <SelectComicStatus />
              <Paginator />
            </div>
          </>
        )}
      </>
      <div className="absolute bottom-9 right-5">
        <RefreshList />
      </div>
    </div>
  );
}
