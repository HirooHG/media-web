import {z} from 'zod';

export const actionsEnum = z.enum(['images', 'chapters', 'hello']);
export type ActionsType = z.infer<typeof actionsEnum>;

export const resultsEnum = z.enum(['imagesLoaded', 'chaptersLoaded', 'world']);
export const resultSchema = z.object({
  action: resultsEnum,
  result: z.string(),
});
