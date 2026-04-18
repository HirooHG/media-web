import {LoadingState} from '@/types/loadingState';

export interface MediaImageState {
  media_id: number | null;
  newImageName: string | null;
  imageStatus: LoadingState;
  imageError: string | null;
}
