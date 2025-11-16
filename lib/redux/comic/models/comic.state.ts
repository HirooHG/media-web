import {Comic} from '../../models/comic';
import {LoadingState} from '../../models/loadingState';

export interface ComicState {
  comic: Comic | null;
  error: string | null;
  status: LoadingState;
}
