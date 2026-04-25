import {ChapterImage} from './chapter-image';

export interface Chapter {
  id: number;
  hid: string;
  chap: number;
  title: string | undefined;
  images: ChapterImage[];
  translator?: string;
  prev_chap?: number;
  next_chap?: number;
}
