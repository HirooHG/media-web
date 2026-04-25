import {ChapterDetails} from './components/chapter-details';

export default async function ChapterPage({
  params,
}: {
  params: Promise<{id: string; chapter_id: string}>;
}) {
  const {chapter_id, id} = await params;

  return <ChapterDetails id={id} chapter_id={chapter_id} />;
}
