'use client';

import {ButtonGroup} from '@/components/ui/button-group';
import {Button} from '@/components/ui/button';
import {ExternalLink, FileImage} from 'lucide-react';
import {Comic} from '@/lib/shared/models/comic';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks';
import {fetchMediaImage} from '@/lib/redux/slices/media-image.slice';
import {ComicImage} from './comic-image';
import {ComicImagePlaceholder} from './comic-image-placeholder';
import {useRouter} from 'next/navigation';

export const MediaItem = ({comic}: {comic: Comic}) => {
  const dispatch = useAppDispatch();
  const {comic_id, imageStatus, imageError} = useAppSelector((state) => state.mediaImage);
  const router = useRouter();

  return (
    <div className="w-full flex space-x-2 md:space-x-4 items-start justify-center">
      {comic.image ? (
        <ComicImage uri={comic.image.url} slug={comic.comic_slug} />
      ) : (
        <ComicImagePlaceholder
          status={imageStatus}
          error={imageError}
          loadingEnabled={comic.comic_id === comic_id}
        />
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
          <Button
            onClick={() => router.push('/' + comic.comic_id)}
            className="flex gap-2"
            variant="outline"
          >
            See more <ExternalLink />
          </Button>
        </ButtonGroup>
        {imageError && comic_id === comic.comic_id && (
          <span className="text-red-700 dark:text-red-400">{imageError}</span>
        )}
      </div>
    </div>
  );
};
