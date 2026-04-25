import {z} from 'zod';

export const paramsMediaSchema = z.object({
  id: z.coerce.number().int(),
});

export const paramsChapterSchema = paramsMediaSchema.and(
  z.object({
    chapter_id: z.coerce.number().int(),
  }),
);
