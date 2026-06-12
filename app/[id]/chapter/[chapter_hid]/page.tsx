import {SearchDialog} from '@/components/shared/search-dialog';
import {ChapterDetails} from './components/chapter-details';

export default async function ChapterPage({
  params,
}: {
  params: Promise<{id: string; chapter_hid: string}>;
}) {
  const {chapter_hid, id} = await params;

  return (
    <>
      <SearchDialog />
      <ChapterDetails id={id} chapterHid={chapter_hid} />
    </>
  );
}
