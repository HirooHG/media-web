import {authOptions} from '@/lib/auth';
import {getServerSession} from 'next-auth';

export async function GET(req: Request) {
  if (req.method !== 'GET') {
    return Response.json({error: 'Method not allowed'});
  }

  try {
    // Get token from the session
    const session = await getServerSession(authOptions);
    const token = session?.id_token;

    if (!token) {
      return Response.json({error: 'Authentication required'});
    }

    // Build Keycloak logout URL with the right parameters
    const logoutParams = {
      id_token_hint: token,
      post_logout_redirect_uri: `${process.env.NEXTAUTH_URL}`,
      client_id: `${process.env.NEXT}`,
    };

    const logoutUrl = `${
      process.env.NEXT_PUBLIC_KEYCLOAK_URL
    }/protocol/openid-connect/logout?${new URLSearchParams(logoutParams).toString()}`;

    return Response.json({logoutUrl});
  } catch {
    return Response.json({error: 'Failed to generate logout URL'});
  }
}
