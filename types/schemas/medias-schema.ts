import {MediaStatus} from '@/lib/shared/models/media-status';
import {z} from 'zod';

export const MediaReadingStateSchema = z.enum([
  'reading',
  'completed',
  'on_hold',
  'dropped',
  'plan_to_read',
]);

export const mediaSchema = z.object({
  id: z.string(),
  comic_id: z.string(),
  type: MediaReadingStateSchema,
  comic_title: z.string(),
  comic_slug: z.string(),
  comic_status: z.enum(MediaStatus),
  image: z.string().optional(),
  desc: z.string().optional(),
});

export const mediasSchema = z.object({
  data: z.array(mediaSchema),
  error: z.string(),
});

export type MediasResult = z.infer<typeof mediasSchema>;
