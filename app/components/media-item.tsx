'use client';

import {ButtonGroup} from '@/components/ui/button-group';
import {Button} from '@/components/ui/button';
import {ExternalLink, FileImage} from 'lucide-react';
import {Media} from '@/lib/shared/models/media';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks';
import {MediaImage} from './media-image';
import {MediaImagePlaceholder} from './media-image-placeholder';
import {useRouter} from 'next/navigation';
import {useMediaImageMutation} from '@/lib/redux/api';
import {setImage} from '@/lib/redux/slices/media-list-slice';

export const MediaItem = ({media}: {media: Media}) => {
  const dispatch = useAppDispatch();
  const {media_id, imageStatus, imageError} = useAppSelector((state) => state.mediaImage);
  const router = useRouter();
  const [getImageMedia] = useMediaImageMutation();

  return (
    <div className="w-full flex space-x-2 md:space-x-4 items-start justify-center">
      {media.image ? (
        <MediaImage uri={media.image.uri} slug={media.slug} />
      ) : (
        <MediaImagePlaceholder
          status={imageStatus}
          error={imageError}
          loadingEnabled={media.id === media_id}
        />
      )}

      <div className="flex-1 flex flex-col space-y-2 md:space-y-4 items-start justify-start">
        <span className="text-sm text-gray-600 dark:text-gray-300">{media.title}</span>
        <ButtonGroup>
          {!media.image && (
            <Button
              onClick={async () => {
                const image = await getImageMedia(media.id);
                if (!image.data) return;
                dispatch(
                  setImage({
                    media_id: media.id,
                    uri: image.data.uri,
                  }),
                );
              }}
              variant="outline"
              disabled={imageStatus === 'pending'}
            >
              <FileImage /> Get Image
            </Button>
          )}
          <Button onClick={() => router.push('/' + media.id)} className="flex gap-2 bg-primary">
            See more <ExternalLink />
          </Button>
        </ButtonGroup>
        {imageError && media_id === media.id && (
          <span className="text-red-700 dark:text-red-400">{imageError}</span>
        )}
      </div>
    </div>
  );
};
