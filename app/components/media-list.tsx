'use client';

import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks';
import {fetchMedias, setComicImage} from '@/lib/redux/slices/media-list.slice';
import {clearState} from '@/lib/redux/slices/media-image.slice';
import {Separator} from '@/components/ui/separator';
import {Pending} from './pending';
import {EmptyList} from './empty-list';
import {MediaItem} from './media-item';
import {Paginator} from './paginator';
import {ErrorComponent} from '@/components/shared/error';
import {RefreshList} from './refresh-list';

export function MediaList() {
  const dispatch = useAppDispatch();
  const {comics, error, status, page, per_page} = useAppSelector((state) => state.mediaList);
  const {comic_id, imageStatus, newImageName} = useAppSelector((state) => state.mediaImage);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMedias({page, per_page}));
    }
  }, [dispatch, status, page, per_page]);

  useEffect(() => {
    if (imageStatus === 'succeeded') {
      dispatch(setComicImage({comic_id, image: newImageName}));
      dispatch(clearState());
    }
  }, [comic_id, dispatch, imageStatus, newImageName]);

  if (status === 'failed' && error) {
    return (
      <div className="h-6/12 w-full flex items-center justify-center">
        <ErrorComponent error={error} />
      </div>
    );
  }

  return (
    <div className="px-32 w-full h-full flex flex-col space-y-2 relative">
      <h1 className="text-2xl font-bold mb-4">Medias</h1>
      {comics.length === 0 ? (
        <EmptyList />
      ) : (
        <>
          {status === 'pending' ? (
            <div className="flex-1">
              <Pending />
            </div>
          ) : (
            <ul className="flex-1 overflow-scroll">
              {comics.map((comic, index) => (
                <li key={comic.comic_id} className="h-fit flex flex-col items-center">
                  {(index !== 0 || index !== comics.length - 1) && (
                    <div className="w-11/12 my-4 dark:bg-gray-100">
                      <Separator />
                    </div>
                  )}
                  <MediaItem comic={comic} />
                </li>
              ))}
            </ul>
          )}
          <Paginator />
          <div className="absolute bottom-5 right-5">
            <RefreshList />
          </div>
        </>
      )}
    </div>
  );
}
