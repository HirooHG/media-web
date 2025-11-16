import {Comic} from './comic';
import {LoadingState} from './loadingState';

export interface MediaListState {
  comics: Comic[];
  status: LoadingState;
  error: string | null;
  page: number;
  per_page: number;
}
