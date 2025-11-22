'use client';

import {useComicDispatch, useComicSelector} from '@/lib/redux/comic/comic-hooks';
import {useEffect} from 'react';
import {fetchComic, resetState} from '@/lib/redux/comic/slices/comic.slice';
import {ErrorComponent} from '@/components/shared/error';
import {setError} from '@/lib/redux/comic/slices/comic.slice';
import {ComicImage} from '@/app/components/comic-image';
import {ComicImagePlaceholder} from '@/app/components/comic-image-placeholder';
import {Pending} from '@/app/components/pending';
import {fetchMediaImage} from '@/lib/redux/slices/media-image.slice';
import {Button} from '@/components/ui/button';
import {FileImage} from 'lucide-react';

export const ComicPage = ({id}: {id: string}) => {
  const dispatch = useComicDispatch();
  const {comic, error, status} = useComicSelector((state) => state.comicReducer);
  const {imageStatus, imageError} = useComicSelector((state) => state.imageReducer);

  useEffect(() => {
    // * error if route id isn't a number
    const comic_id = Number(id);
    if (isNaN(comic_id)) {
      dispatch(setError('The id param must be a number'));
      return;
    }

    if (status === 'idle') {
      dispatch(fetchComic({comic_id}));
    }
  }, [dispatch, status, id, comic]);

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  if (error !== null) {
    return (
      <div className="w-full h-6/12 flex items-center justify-center">
        <ErrorComponent error={error} />
      </div>
    );
  }

  return (
    <>
      {comic === null ? (
        <div className="w-full h-100">
          <Pending />
        </div>
      ) : (
        <div className="px-5">
          <div className="flex space-x-5">
            {comic.image ? (
              <ComicImage uri={comic.image} slug={comic.comic_slug} size="large" />
            ) : (
              <ComicImagePlaceholder status={imageStatus} error={imageError} size="large" />
            )}
            <div className="flex-1 flex flex-col space-y-5">
              <span className="text-2xl font-semibold">{comic.comic_title}</span>
              <span>{comic.desc ?? <span className="italic">No description here...</span>}</span>
              {!comic.image && (
                <Button
                  onClick={() => dispatch(fetchMediaImage(comic.comic_id))}
                  variant="outline"
                  disabled={imageStatus === 'pending'}
                >
                  <FileImage /> Get Image
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
