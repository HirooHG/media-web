import {Chapter} from '@/lib/shared/models/chapter';
import {LoadingState} from '@/lib/shared/models/loadingState';

export interface ChaptersState {
  chaptersStatus: LoadingState;
  chapters: Chapter[];
  chaptersError: string | null;
}
