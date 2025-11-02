import {Comic} from './comic';
import {LoadingState} from './loadingState';

export interface MediaState {
  comics: Comic[];
  loading: boolean;
  error: string | null;
  status: LoadingState;
}
