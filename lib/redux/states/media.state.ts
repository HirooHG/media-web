import {Media} from '@/lib/shared/models/media';
import {LoadingState} from '@/types/loadingState';

export interface MediaState {
  media: Media | null;
  error: string | null;
  status: LoadingState;
}
