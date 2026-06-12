import {Skeleton} from '@/components/ui/skeleton';
import {Spinner} from '@/components/ui/spinner';
import {LoadingState} from '@/types/loadingState';
import {TriangleAlert} from 'lucide-react';
import {ImageSize} from '@/types/image-size';

const Dimensions = {
  'small': 'w-11 h-14',
  'medium': 'w-32 h-48',
  'large': 'w-64 h-84',
};

export const MediaImagePlaceholder = ({
  status,
  error,
  loadingEnabled = true,
  size = 'medium',
}: {
  status?: LoadingState;
  error?: string | null;
  loadingEnabled?: boolean;
  size?: ImageSize;
}) => {
  const dims = Dimensions[size];

  return (
    <div className="w-fit h-fit relative">
      <Skeleton className={'bg-zinc-400 dark:bg-zinc-800 rounded-lg ' + dims} />
      {status === 'pending' && loadingEnabled && (
        <Spinner className="absolute top-[50%] left-[47%] w-5 h-5" />
      )}
      {error && loadingEnabled && (
        <TriangleAlert className="absolute top-[50%] left-[47%] text-red-700 dark:text-red-400 animate-bounce" />
      )}
    </div>
  );
};
