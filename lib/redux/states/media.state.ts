import {Bookmark} from '@/lib/shared/models/bookmark';
import {Chapter} from '@/lib/shared/models/chapter';
import {Media} from '@/lib/shared/models/media';
import {ReadingStatus} from '@/lib/shared/models/reading-status';
import {LoadingState} from '@/types/loadingState';

export interface MediaState {
  media: Media | null;
  chapters: Chapter[] | null;
  error: string | null;
  status: LoadingState;
  chaptersError: string | null;
  chaptersStatus: LoadingState;
  bookmark: Bookmark | null;
  readingStatus: ReadingStatus | null;
}
