import {Comic} from '../../shared/models/comic';
import {LoadingState} from '../../shared/models/loadingState';

export interface MediaListState {
  comics: Comic[];
  status: LoadingState;
  error: string | null;
  page: number;
  per_page: number;
}
