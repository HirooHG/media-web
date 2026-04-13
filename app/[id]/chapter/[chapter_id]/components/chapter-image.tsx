import {getImageUrl} from '@/lib/minio';
import {useEffect, useRef, useState} from 'react';

export const ChapterImage = ({uri, name}: {uri: string; name?: string}) => {
  const ref = useRef<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (ref.current) return;
    ref.current = 'loaded';

    getImageUrl(uri).then(setUrl);
  }, [uri]);

  if (!url) return null;

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="max-w-full" src={url} loading="lazy" alt={name ?? ''}></img>
    </>
  );
};
