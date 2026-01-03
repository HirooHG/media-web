import {ComicStatus} from './comic-status';
import {MediaImage} from './media-image';

export type ComicReadingState = 'reading' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_read';

export interface Comic {
  id: string;
  comic_id: number;
  type: ComicReadingState;
  comic_title: string;
  comic_slug: string;
  comic_status: ComicStatus;
  image: MediaImage | undefined;
  desc: string | undefined;
}
