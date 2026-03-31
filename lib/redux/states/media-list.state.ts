import {Media} from '@/lib/shared/models/media';
import {MediaStatusKeys} from '@/lib/shared/models/media-status';
import {LoadingState} from '@/types/loadingState';

export interface MediaListState {
  medias: Media[];
  status: LoadingState;
  error: string | null;
  page: number;
  per_page: number;
  selectedStatus: MediaStatusKeys | null;
}
