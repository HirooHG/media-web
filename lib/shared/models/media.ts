import {MediaStatus} from './media-status';
import {MediaImage} from './media-image';

export interface Media {
  id: number;
  readingStatus: string | null;
  title: string;
  slug: string;
  status: MediaStatus;
  image: MediaImage | undefined;
  description: string | undefined;
}
