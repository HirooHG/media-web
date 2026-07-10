import {MediaImage} from './media-image';

export interface MediaHistory {
  mediaId: number;
  title: string;
  image?: MediaImage;
  timestamp: Date;
  chapterHid: string;
  chapter: string;
}
