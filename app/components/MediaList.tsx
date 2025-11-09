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

export function MediaList() {
  const dispatch = useAppDispatch();
  const {comics, error, status} = useAppSelector((state) => state.mediaList);
  const {comic_id, imageStatus, newImageName} = useAppSelector((state) => state.mediaImage);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMedias());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (imageStatus === 'succeeded') {
      dispatch(setComicImage({comic_id, image: newImageName}));
      dispatch(clearState());
    }
  }, [comic_id, dispatch, imageStatus, newImageName]);

  if (status === 'pending') {
    return <Pending />;
  }

  if (status === 'failed' && error) {
    return <Error error={error} callback={() => dispatch(clearListError())} />;
  }

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Medias</h1>
      {comics.length === 0 ? (
        <EmptyList />
      ) : (
        <ul>
          {comics.map((comic, index) => (
            <li key={comic.id} className="h-fit flex flex-col items-center">
              {index !== 0 && (
                <div className="w-11/12 my-4 dark:bg-gray-100">
                  <Separator />
                </div>
              )}
              <MediaItem comic={comic} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
