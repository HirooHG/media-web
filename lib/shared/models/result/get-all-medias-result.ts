import type {Media} from '../media';

export interface GetAllMediasResult {
  medias: Media[];
  pagination: {
    lastPage: number;
  };
}
