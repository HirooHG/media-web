import {Skeleton} from '@/components/ui/skeleton';
import {Spinner} from '@/components/ui/spinner';
import {LoadingState} from '@/lib/shared/models/loadingState';
import {TriangleAlert} from 'lucide-react';
import {ImageSize} from '../models/image-size';

export const ComicImagePlaceholder = ({
  status,
  error,
  loadingEnabled = true,
  size = 'small',
}: {
  status: LoadingState;
  error: string | null;
  loadingEnabled?: boolean;
  size?: ImageSize;
}) => {
  return (
    <div className="w-fit h-fit relative">
      <Skeleton
        className={'bg-gray-400 rounded-lg ' + (size === 'small' ? 'w-32 h-46' : 'w-64 h-96')}
      />
      {status === 'pending' && loadingEnabled && (
        <Spinner className="absolute top-5/12 left-5/12 w-5 h-5" />
      )}
      {error && loadingEnabled && (
        <TriangleAlert className="absolute top-5/12 left-5/12 text-red-700 dark:text-red-400 animate-bounce" />
      )}
    </div>
  );
};
