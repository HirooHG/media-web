import {Chapter} from '@/lib/shared/models/chapter';
import {LoadingState} from '@/types/loadingState';

export interface ChapterState {
  status: LoadingState;
  error: string | null;
  chapter: Chapter | null;
}
