'use client';

import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks';
import {fetchMedias, clearListError, setComicImage} from '@/lib/redux/slices/mediaList.slice';
import {clearState} from '@/lib/redux/slices/mediaImage.slice';
import {Separator} from '@/components/ui/separator';
import {Error} from './Error';
import {Pending} from './Pending';
import {EmptyList} from './EmptyList';
import {MediaItem} from './MediaItem';
import {Paginator} from './Paginator';

export function MediaList() {
  const dispatch = useAppDispatch();
  const {comics, error, status, page, per_page} = useAppSelector((state) => state.mediaList);
  const {comic_id, imageStatus, newImageName} = useAppSelector((state) => state.mediaImage);

  useEffect(() => {
    if (status === 'idle') {
      console.log(page);
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
    return <Error error={error} callback={() => dispatch(clearListError())} />;
  }

  return (
    <div className="px-32 w-full h-full flex flex-col space-y-2">
      <h1 className="text-2xl font-bold mb-4">Medias</h1>
      {comics.length === 0 ? (
        <EmptyList />
      ) : (
        <>
          {status === 'pending' ? (
            <Pending />
          ) : (
            <ul className="flex-1 overflow-scroll">
              {comics.map((comic, index) => (
                <li key={comic.id} className="h-fit flex flex-col items-center">
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
        </>
      )}
    </div>
  );
}
