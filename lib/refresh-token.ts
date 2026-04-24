import {refreshTokenResponse, RefreshTokenResponse} from './shared/schemas/auth-schemas';

export async function refreshAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}): Promise<RefreshTokenResponse> {
  const url = `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/protocol/openid-connect/token`;
  const formData = new URLSearchParams();

  formData.append('grant_type', 'refresh_token');
  formData.append('client_id', process.env.NEXT_PUBLIC_KEYCLOAK_CLIENTID!);
  formData.append('client_secret', process.env.KEYCLOAK_SECRET!);
  formData.append('refresh_token', refreshToken);

  const response = await fetch(url, {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error('Failed to refresh token');

  return refreshTokenResponse.parse(await response.json());
}
