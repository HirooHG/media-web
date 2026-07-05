import {MediaPage} from './components/media-page';
import {SearchDialog} from '@/components/shared/search-dialog';

export default async function HomeMedia({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;

  return (
    <>
      <SearchDialog />
      <MediaPage id={id} />
    </>
  );
}
