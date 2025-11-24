'use client';

import {useComicDispatch, useComicSelector} from '@/lib/redux/comic/comic-hooks';
import {useEffect} from 'react';
import {fetchComic, resetState, setImage} from '@/lib/redux/comic/slices/comic.slice';
import {ErrorComponent} from '@/components/shared/error';
import {setError} from '@/lib/redux/comic/slices/comic.slice';
import {ComicImage} from '@/app/components/comic-image';
import {ComicImagePlaceholder} from '@/app/components/comic-image-placeholder';
import {Pending} from '@/app/components/pending';
import {clearState, fetchMediaImage} from '@/lib/redux/slices/media-image.slice';
import {Button} from '@/components/ui/button';
import {FileImage, RefreshCcw} from 'lucide-react';
import {Chapters} from './chapters';
import {ButtonGroup} from '@/components/ui/button-group';
import {refreshChapters} from '@/lib/redux/comic/slices/chapters.slice';
import {Badge} from '@/components/ui/badge';
import {ComicStatus} from '@/lib/shared/models/comic-status';

export const ComicPage = ({id}: {id: string}) => {
  const dispatch = useComicDispatch();
  const {comic, error, status} = useComicSelector((state) => state.comicReducer);
  const {imageStatus, imageError, comic_id, newImageName} = useComicSelector(
    (state) => state.imageReducer,
  );

  useEffect(() => {
    // * error if route id isn't a number
    const comic_id = Number(id);
    if (isNaN(comic_id)) {
      dispatch(setError('The id param must be a number'));
    }

    if (status === 'idle') {
      dispatch(fetchComic({comic_id}));
    }
  }, [dispatch, status, id]);

  useEffect(() => {
    const comic_id = Number(id);
    if (isNaN(comic_id)) {
      dispatch(setError('The id param must be a number'));
    }

    if (imageStatus === 'succeeded') {
      dispatch(setImage(newImageName ?? ''));
      dispatch(clearState());
    }
  }, [comic_id, dispatch, imageStatus, newImageName, id]);

  useEffect(() => {
    // on comic page unmounted, reset state
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  const getBadgeStatusSeverity = () => {
    switch (comic?.comic_status) {
      case 1:
      case 2:
        return 'outline';
      case 3:
        return 'destructive';
      default:
        return 'secondary';
    }
  };

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
        <div className="w-full h-6/12">
          <Pending />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col px-5 gap-5">
          <div className="flex space-x-5">
            {comic.image ? (
              <ComicImage uri={comic.image} slug={comic.comic_slug} size="large" />
            ) : (
              <ComicImagePlaceholder status={imageStatus} error={imageError} size="large" />
            )}
            <div className="flex-1 flex flex-col space-y-3">
              <span className="text-2xl font-semibold">{comic.comic_title}</span>
              <span className="max-h-55 overflow-scroll">
                {comic.desc ?? <span className="italic">No description here...</span>}
              </span>
              <Badge variant={getBadgeStatusSeverity()}>{ComicStatus[comic.comic_status]}</Badge>
              <ButtonGroup className="w-full">
                {!comic.image && (
                  <Button
                    onClick={() => dispatch(fetchMediaImage(comic.comic_id))}
                    variant="outline"
                    className="flex-1"
                    disabled={imageStatus === 'pending'}
                  >
                    <FileImage /> Get Image
                  </Button>
                )}
                <Button
                  onClick={() => dispatch(refreshChapters({comic_id: comic.comic_id}))}
                  variant="outline"
                  className="flex-1"
                  disabled={imageStatus === 'pending'}
                >
                  <RefreshCcw /> Refresh chapters
                </Button>
              </ButtonGroup>
              {imageError && comic_id === comic.comic_id && (
                <span className="text-red-700 dark:text-red-400">{imageError}</span>
              )}
            </div>
          </div>
          <Chapters comic_id={comic.comic_id} />
        </div>
      )}
    </>
  );
};
