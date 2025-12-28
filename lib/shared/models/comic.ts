import {ComicStatus} from './comic-status';

export type ComicReadingState = 'reading' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_read';

export interface Comic {
  id: string;
  comic_id: number;
  type: ComicReadingState;
  comic_title: string;
  comic_slug: string;
  comic_status: ComicStatus;
  image: string | undefined;
  desc: string | undefined;
  last_chapter: string;
}
