'use client';

import {ButtonGroup} from '@/components/ui/button-group';
import {Button} from '@/components/ui/button';
import {ExternalLink, FileImage, TriangleAlert} from 'lucide-react';
import {Spinner} from '@/components/ui/spinner';
import {Skeleton} from '@/components/ui/skeleton';
import {Comic} from '@/lib/redux/models/comic';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks';
import {fetchMediaImage} from '@/lib/redux/slices/media-image.slice';
import Link from 'next/link';
import {ComicImage} from './comic-image';

export const MediaItem = ({comic}: {comic: Comic}) => {
  const dispatch = useAppDispatch();
  const {comic_id, imageStatus, imageError} = useAppSelector((state) => state.mediaImage);

  return (
    <div className="w-full flex space-x-2 md:space-x-4 items-start justify-center">
      {comic.image ? (
        <ComicImage uri={comic.image} slug={comic.comic_slug} />
      ) : (
        <div className="w-fit h-fit relative">
          <Skeleton className="w-32 h-46 bg-gray-400" />
          {imageStatus === 'pending' && comic_id === comic.comic_id && (
            <Spinner className="absolute top-5/12 left-5/12 w-5 h-5" />
          )}
          {imageError && comic_id === comic.comic_id && (
            <TriangleAlert className="absolute top-5/12 left-5/12 text-red-700 dark:text-red-400 animate-bounce" />
          )}
        </div>
      )}

      <div className="flex-1 flex flex-col space-y-2 md:space-y-4 items-start justify-start">
        <span className="text-sm text-gray-600 dark:text-gray-300">{comic.comic_title}</span>
        <ButtonGroup>
          {!comic.image && (
            <Button
              onClick={() => dispatch(fetchMediaImage(comic.comic_id))}
              variant="outline"
              disabled={imageStatus === 'pending'}
            >
              <FileImage /> Get Image
            </Button>
          )}
          <Button variant="outline">
            <Link href={'/' + comic.comic_id} className="flex gap-2">
              See more <ExternalLink />
            </Link>
          </Button>
        </ButtonGroup>
        {imageError && comic_id === comic.comic_id && (
          <span className="text-red-700 dark:text-red-400">{imageError}</span>
        )}
      </div>
    </div>
  );
};
