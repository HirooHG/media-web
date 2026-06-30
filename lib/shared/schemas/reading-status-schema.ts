import {z} from 'zod';

export const readingStatusSchema = z.object({
  label: z.string(),
});

export type ReadingStatusDto = z.infer<typeof readingStatusSchema>;
