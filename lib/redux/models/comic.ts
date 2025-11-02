export interface Comic {
  id: string;
  user_id: number;
  comic_id: number;
  default_thumbnail: string;
  type: 'reading' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_read';
  comic_title: string;
  comic_slug: string;
  comic_status: 1;
  comic_last_chapter: string;
  chapter_hid: string;
}
