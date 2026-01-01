export enum ComicStatus {
  ONGOING = 1,
  COMPLETED = 2,
  CANCELLED = 3,
  HIATUS = 4,
}

export type ComicStatusKeys = keyof typeof ComicStatus;
