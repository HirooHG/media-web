import {z} from 'zod';

export const keycloakAccountPayload = z.object({
  id_token: z.string(),
  access_token: z.string(),
  expires_at: z.number(),
  refresh_expires_in: z.number(),
  refresh_token: z.string(),
});

// Keycloak refresh token response
export const refreshTokenResponse = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  refresh_expires_in: z.number(),
  refresh_token: z.string(),
  token_type: z.string(),
  id_token: z.string(),
  scope: z.string(),
});

export type RefreshTokenResponse = z.infer<typeof refreshTokenResponse>;
