import {authOptions} from '@/lib/auth';
import {getServerSession} from 'next-auth';

export async function GET(req: Request) {
  if (req.method !== 'GET') {
    return Response.json({error: 'Method not allowed'});
  }

  try {
    const session = await getServerSession(authOptions);
    const token = session?.refreshToken;

    if (!token) {
      return Response.json({error: 'Authentication required'});
    }

    const revokeUrl = `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/protocol/openid-connect/revoke`;

    await fetch(revokeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: `${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENTID}`,
        client_secret: `${process.env.KEYCLOAK_SECRET}`,
        token: token,
        token_type_hint: 'access_token',
      }).toString(),
    });

    if (session?.refreshToken) {
      await fetch(revokeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: `${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENTID}`,
          client_secret: `${process.env.KEYCLOAK_SECRET}`,
          token: session.refreshToken,
          token_type_hint: 'refresh_token',
        }).toString(),
      });
    }

    return Response.json({success: true});
  } catch {
    return Response.json({error: 'Failed to generate logout URL'});
  }
}
