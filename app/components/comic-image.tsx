import {API_URI} from '@/lib/shared/constants';
import {ImageSize} from '@/app/models/image-size';

export const ComicImage = ({
  uri,
  slug,
  size = 'small',
}: {
  uri: string;
  slug: string;
  size?: ImageSize;
}) => {
  return (
    <>
      <div className={size === 'small' ? 'w-32 h-46' : 'w-56 h-84'}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="rounded-lg max-h-full max-w-full"
          src={API_URI + '/images/medias/' + uri}
          alt={slug}
        ></img>
      </div>
    </>
  );
};
