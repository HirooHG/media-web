import {MediaStatus} from './media-status';
import {MediaImage} from './media-image';

export type MediaReadingState = 'reading' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_read';

export interface Media {
  id: string;
  comic_id: number;
  type: MediaReadingState;
  comic_title: string;
  comic_slug: string;
  comic_status: MediaStatus;
  image: MediaImage | undefined;
  desc: string | undefined;
}
