import {z} from 'zod';

export const authSchema = z.object({
  data: z
    .object({
      username: z.string(),
      token: z.jwt(),
      refreshToken: z.jwt(),
    })
    .nullable(),
  error: z.string().nullable(),
});

export type AuthResult = z.infer<typeof authSchema>;
