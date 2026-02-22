import {Comic} from '../../../shared/models/comic';
import {LoadingState} from '../../../shared/models/loadingState';

export interface ComicState {
  comic: Comic | null;
  error: string | null;
  status: LoadingState;
}
