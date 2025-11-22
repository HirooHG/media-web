export enum ComicStatus {
  ONGOING = 1,
  COMPLETED = 2,
  CANCELLED = 3,
  HIATUS = 4,
}

export type ComicReadingState = 'reading' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_read';

export interface Comic {
  id: string;
  comic_id: number;
  type: ComicReadingState;
  comic_title: string;
  comic_slug: string;
  comic_status: ComicStatus;
  image: string | undefined;
  desc: string | undefined;
  hid: string;
  country: string;
  origination: string;
  last_chapter: number;
  chapter_count: number;
  demographic_name: string;
  content_rating: string;
}
