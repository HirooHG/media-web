'use client';

import {ErrorComponent} from '@/components/shared/error';
import {MediaImage} from '@/app/components/media-image';
import {MediaImagePlaceholder} from '@/app/components/media-image-placeholder';
import {Pending} from '@/app/components/pending';
import {Button} from '@/components/ui/button';
import {FileImage, RefreshCcw} from 'lucide-react';
import {Chapters} from './chapters';
import {ButtonGroup} from '@/components/ui/button-group';
import {Badge} from '@/components/ui/badge';
import {MediaStatus} from '@/lib/shared/models/media-status';
import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks';
import {useMediaImageMutation, useMediaQuery, useRefreshChaptersMutation} from '@/lib/redux/api';
import {z} from 'zod';
import {setMediaImage} from '@/lib/redux/slices/media-slice';

export const MediaPage = ({id}: {id: number}) => {
  const {status: session, data} = useSession();

  if (session === 'unauthenticated' || data?.tokensExpired) {
    redirect('/');
  }

  const dispatch = useAppDispatch();
  const {media, error, status} = useAppSelector((state) => state.media);
  const {imageStatus, imageError, comic_id} = useAppSelector((state) => state.mediaImage);
  const [getImageMedia] = useMediaImageMutation();
  const [refreshChapters] = useRefreshChaptersMutation();

  const media_id = z.coerce.number().int().safeParse(id);
  useMediaQuery(media_id.data ?? 0, {skip: !media_id.success, refetchOnMountOrArgChange: true});

  if (status === 'error' || (!media_id.success && media_id.error)) {
    return (
      <div className="w-full h-6/12 flex items-center justify-center">
        <ErrorComponent error={error ?? media_id.error?.message ?? ''} />
      </div>
    );
  }

  const getBadgeStatusSeverity = () => {
    switch (media?.comic_status) {
      case 1:
      case 2:
        return 'outline';
      case 3:
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <>
      {status === 'pending' || media === null ? (
        <div className="w-full h-6/12">
          <Pending />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col px-5 gap-5 overflow-scroll">
          <div className="flex space-x-5">
            {media.image ? (
              <MediaImage uri={media.image.uri} slug={media.comic_slug} size="large" />
            ) : (
              <MediaImagePlaceholder status={imageStatus} error={imageError} size="large" />
            )}
            <div className="flex-1 flex flex-col space-y-3">
              <span className="text-2xl font-semibold">{media.comic_title}</span>
              <span className="h-50 overflow-scroll">
                {media.desc ?? <span className="italic">No description here...</span>}
              </span>
              <Badge variant={getBadgeStatusSeverity()}>{MediaStatus[media.comic_status]}</Badge>
              <ButtonGroup className="w-full">
                {!media.image && (
                  <Button
                    onClick={async () => {
                      const image = await getImageMedia(media.comic_id);
                      if (!image.data) return;
                      dispatch(setMediaImage(image.data.uri));
                    }}
                    variant="outline"
                    className="flex-1"
                    disabled={imageStatus === 'pending'}
                  >
                    <FileImage /> Get Image
                  </Button>
                )}
                <Button
                  onClick={() => refreshChapters(media.comic_id)}
                  variant="outline"
                  className="flex-1"
                  disabled={imageStatus === 'pending'}
                >
                  <RefreshCcw /> Refresh chapters
                </Button>
              </ButtonGroup>
              {imageError && comic_id === media.comic_id && (
                <span className="text-red-700 dark:text-red-400">{imageError}</span>
              )}
            </div>
          </div>
          <Chapters comic_id={media.comic_id} />
        </div>
      )}
    </>
  );
};
