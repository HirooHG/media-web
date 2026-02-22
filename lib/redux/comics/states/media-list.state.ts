import {Comic} from '@/lib/shared/models/comic';
import {ComicStatusKeys} from '@/lib/shared/models/comic-status';
import {LoadingState} from '@/lib/shared/models/loadingState';

export interface MediaListState {
  comics: Comic[];
  status: LoadingState;
  error: string | null;
  page: number;
  per_page: number;
  selectedStatus: ComicStatusKeys | null;
}
