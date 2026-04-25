import {MediaPage} from './components/media-page';

export default async function HomeMedia({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;

  return <MediaPage id={id} />;
}
