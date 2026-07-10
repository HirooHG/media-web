import {Button} from '@/components/ui/button';
import {VersionsDropdown} from './versions-dropdown';
import {useMediaImageMutation, useRefreshChaptersMutation} from '@/lib/redux/api';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks';
import {hasChapters, setMediaImage} from '@/lib/redux/slices/media-slice';
import {useRouter} from 'next/navigation';
import {Media} from '@/lib/shared/models/media';
import {FileImage, ImagePlus, RefreshCcw, StepForward} from 'lucide-react';
import {useSocket} from '@/hooks/use-ws';
import {appToast} from '@/components/shared/app-toast';

export const ActionButtons = ({media}: {media: Media}) => {
  const dispatch = useAppDispatch();
  const {push} = useRouter();

  const {bookmark, chapters} = useAppSelector((state) => state.media);
  const hasChaps = useAppSelector(hasChapters);
  const {imageStatus} = useAppSelector((state) => state.mediaImage);

  const {loadMediaChaptersImages} = useSocket();
  const [getImageMedia] = useMediaImageMutation();
  const [refreshChapters] = useRefreshChaptersMutation();

  return (
    <div className="h-fit flex md:w-75 w-full flex-col gap-4">
      <Button
        variant="secondary"
        onClick={() => refreshChapters(media.id)}
        disabled={imageStatus === 'pending'}
      >
        <RefreshCcw /> Refresh chapters
      </Button>
      {!media.image && (
        <Button
          variant="outline"
          onClick={async () => {
            const image = await getImageMedia(media.id);
            if (!image.data) return;
            dispatch(setMediaImage(image.data.uri));
          }}
          disabled={imageStatus === 'pending'}
        >
          <FileImage /> Get Image
        </Button>
      )}
      {bookmark && chapters && (
        <VersionsDropdown
          versions={chapters.find((c) => c.id === bookmark.chapterId)?.versions ?? []}
          action={(version) => push('/' + media.id + '/chapter/' + version.hid)}
        >
          <Button variant="outline">
            <StepForward /> {bookmark ? 'Continue to read' : 'Start to read'}
          </Button>
        </VersionsDropdown>
      )}
      {hasChaps && (
        <Button
          variant="outline"
          onClick={() => {
            loadMediaChaptersImages(media.id);
            appToast('Images', 'Loading this media chapters...');
          }}
        >
          <ImagePlus /> Load all chapters images
        </Button>
      )}
    </div>
  );
};
