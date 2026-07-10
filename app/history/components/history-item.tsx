import {MediaImage} from '@/app/components/media-image';
import {MediaImagePlaceholder} from '@/app/components/media-image-placeholder';
import {useGetMediaLastChapterQuery} from '@/lib/redux/api';
import {MediaHistory} from '@/lib/shared/models/media-history';
import {useRouter} from 'next/navigation';

export const HistoryItem = ({history}: {history: MediaHistory}) => {
  const {push} = useRouter();
  const {data: lastChapter} = useGetMediaLastChapterQuery(history.mediaId);

  return (
    <div
      className="flex flex-col items-center gap-1 cursor-pointer"
      onClick={() => push('/' + history.mediaId)}
    >
      {!history.image ? (
        <MediaImagePlaceholder size="large" />
      ) : (
        <MediaImage size="large" uri={history.image.uri} slug={history.title} />
      )}

      <div className="w-58 overflow-hidden text-ellipsis text-center">
        <span className="text-nowrap">{history.title}</span>
      </div>
      <span>
        Chapter <span className="text-green-400">{history.chapter}</span>{' '}
        <span className="text-red-400"> / {lastChapter ?? history.chapter}</span>
      </span>
    </div>
  );
};
