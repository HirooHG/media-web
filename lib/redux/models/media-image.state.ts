import {LoadingState} from '../../shared/models/loadingState';

export interface MediaImageState {
  comic_id: number | null;
  newImageName: string | null;
  imageStatus: LoadingState;
  imageError: string | null;
}
