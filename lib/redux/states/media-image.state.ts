import {LoadingState} from '@/types/loadingState';

// State machine
// idle -> processing -> idle;
export type ImagesStatus = 'processing' | 'idle';

export interface MediaImageState {
  media_id: number | null;
  newImageName: string | null;
  imageStatus: LoadingState;
  imageError: string | null;
  // load multiple images
  images: number[] | null;
  currentImage: number | null;
  imagesStatus: ImagesStatus;
}
