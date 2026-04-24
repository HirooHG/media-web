'use client';

import {ErrorComponent} from '@/components/shared/error';
import {MediaImage} from '@/app/components/media-image';
import {MediaImagePlaceholder} from '@/app/components/media-image-placeholder';
import {Pending} from '@/app/components/pending';
import {Button} from '@/components/ui/button';
import {ChevronLeft, FileImage, RefreshCcw} from 'lucide-react';
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
import {useRouter} from 'next/navigation';

export const MediaPage = ({id}: {id: number}) => {
  const {status: session, data} = useSession();

  if (session === 'unauthenticated' || data?.tokensExpired) {
    redirect('/');
  }

  const dispatch = useAppDispatch();
  const {back} = useRouter();
  const {media, error, status} = useAppSelector((state) => state.media);
  const {imageStatus, imageError, media_id} = useAppSelector((state) => state.mediaImage);
  const [getImageMedia] = useMediaImageMutation();
  const [refreshChapters] = useRefreshChaptersMutation();

  const parsedId = z.coerce.number().int().safeParse(id);
  useMediaQuery(parsedId.data ?? 0, {skip: !parsedId.success, refetchOnMountOrArgChange: true});

  if (status === 'error' || (!parsedId.success && parsedId.error)) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <ErrorComponent error={error ?? parsedId.error?.message ?? ''} />
      </div>
    );
  }

  const getBadgeStatusSeverity = () => {
    switch (media?.status) {
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
    <div className="h-screen pt-16">
      {status === 'pending' || media === null ? (
        <div className="w-full h-6/12">
          <Pending />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col px-5 gap-5 overflow-scroll">
          <div className="flex space-x-5">
            <Button className="h-full" variant="outline" onClick={() => back()}>
              <ChevronLeft />
            </Button>
            {media.image ? (
              <MediaImage uri={media.image.uri} slug={media.slug} size="large" />
            ) : (
              <MediaImagePlaceholder status={imageStatus} error={imageError} size="large" />
            )}
            <div className="flex-1 flex flex-col justify-between">
              <div className="gap-2 flex flex-col">
                <span className="text-2xl font-semibold">{media.title}</span>
                <span className="h-50 overflow-scroll">
                  {media.description ?? <span className="italic">No description here...</span>}
                </span>
              </div>
              <Badge variant={getBadgeStatusSeverity()}>{MediaStatus[media.status]}</Badge>
              <ButtonGroup className="w-full">
                {!media.image && (
                  <Button
                    onClick={async () => {
                      const image = await getImageMedia(media.id);
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
                  onClick={() => refreshChapters(media.id)}
                  variant="outline"
                  className="flex-1"
                  disabled={imageStatus === 'pending'}
                >
                  <RefreshCcw /> Refresh chapters
                </Button>
              </ButtonGroup>
              {imageError && media_id === media.id && (
                <span className="text-red-700 dark:text-red-400">{imageError}</span>
              )}
            </div>
          </div>
          <Chapters media_id={media.id} />
        </div>
      )}
    </div>
  );
};
