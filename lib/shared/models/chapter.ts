import {ChapterImage} from './chapter-image';

export interface Chapter {
  id: string;
  hid: string;
  chap: string;
  title: string | undefined;
  images: ChapterImage[];
  translator?: string;
  prev_chap?: number;
  next_chap?: number;
}
