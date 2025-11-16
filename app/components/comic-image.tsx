import {API_URI} from '@/lib/redux/constants';

export const ComicImage = ({uri, slug}: {uri: string; slug: string}) => {
  return (
    <div className="w-32 h-46">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="" src={API_URI + '/images/' + uri} alt={slug}></img>
    </div>
  );
};
