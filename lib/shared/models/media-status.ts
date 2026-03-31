export enum MediaStatus {
  ONGOING = 1,
  COMPLETED = 2,
  CANCELLED = 3,
  HIATUS = 4,
}

export type MediaStatusKeys = keyof typeof MediaStatus;
