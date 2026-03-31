import {ImageSize} from '@/types/image-size';

export const MediaImage = ({
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
          src={process.env.NEXT_PUBLIC_API_URL + '/medias/' + uri}
          alt={slug}
        ></img>
      </div>
    </>
  );
};
