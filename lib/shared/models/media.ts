import {MediaStatus} from './media-status';
import {MediaImage} from './media-image';

export type MediaReadingState = 'reading' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_read';

export interface Media {
  id: number;
  type: MediaReadingState;
  title: string;
  slug: string;
  status: MediaStatus;
  image: MediaImage | undefined;
  description: string | undefined;
}
