import {getImageUrl} from '@/lib/minio';
import {ImageSize} from '@/types/image-size';
import {useEffect, useRef, useState} from 'react';
import {Skeleton} from '@/components/ui/skeleton';

export const MediaImage = ({
  uri,
  slug,
  size = 'small',
}: {
  uri: string;
  slug: string;
  size?: ImageSize;
}) => {
  const ref = useRef<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const dims = size === 'small' ? 'w-32 h-46' : 'w-64 h-84';

  useEffect(() => {
    if (ref.current) return;
    ref.current = 'loaded';

    getImageUrl(uri).then(setUrl);
  }, [uri]);

  if (!url) {
    return <Skeleton className={dims} />;
  }

  return (
    <>
      <div className={dims}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="rounded-lg max-h-full max-w-full" src={url} alt={slug}></img>
      </div>
    </>
  );
};
