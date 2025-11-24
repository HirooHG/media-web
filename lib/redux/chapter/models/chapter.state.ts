import {Chapter} from '@/lib/shared/models/chapter';
import {LoadingState} from '@/lib/shared/models/loadingState';

export interface ChapterState {
  status: LoadingState;
  error: string | null;
  chapter: Chapter | null;
}
