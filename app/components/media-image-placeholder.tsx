import {Skeleton} from '@/components/ui/skeleton';
import {Spinner} from '@/components/ui/spinner';
import {LoadingState} from '@/types/loadingState';
import {TriangleAlert} from 'lucide-react';
import {ImageSize} from '@/types/image-size';

export const MediaImagePlaceholder = ({
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
        className={'bg-gray-400 rounded-lg ' + (size === 'small' ? 'w-32 h-46' : 'w-56 h-84')}
      />
      {status === 'pending' && loadingEnabled && (
        <Spinner className="absolute top-[50%] left-[47%] w-5 h-5" />
      )}
      {error && loadingEnabled && (
        <TriangleAlert className="absolute top-[50%] left-[47%] text-red-700 dark:text-red-400 animate-bounce" />
      )}
    </div>
  );
};
