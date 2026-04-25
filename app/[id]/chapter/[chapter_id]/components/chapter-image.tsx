import {getImageUrl} from '@/lib/minio';
import {ChapterImage as Image} from '@/lib/shared/models/chapter-image';
import {useEffect, useRef, useState} from 'react';

export const ChapterImage = ({im}: {im: Image}) => {
  const ref = useRef<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (ref.current) return;
    ref.current = 'loaded';

    getImageUrl(im.uri).then(setUrl);
  }, [im]);

  if (!url) return null;

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="max-w-full" src={url} loading="lazy" alt={im.name ?? ''}></img>
    </>
  );
};
