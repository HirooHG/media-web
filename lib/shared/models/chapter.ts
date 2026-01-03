import {ChapterImage} from './chapter-image';

export interface Chapter {
  id: string;
  hid: string;
  chap: string;
  title: string | undefined;
  is_last_chapter: boolean;
  images: ChapterImage[];
}
