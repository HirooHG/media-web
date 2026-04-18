import {ChapterDetails} from './components/chapter-details';

export default async function ChapterPage({
  params,
}: {
  params: Promise<{id: number; chapter_id: number}>;
}) {
  const {chapter_id, id} = await params;

  return <ChapterDetails media_id={id} chapter_id={chapter_id} />;
}
