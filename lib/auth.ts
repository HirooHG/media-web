import KeycloakProvider from 'next-auth/providers/keycloak';
import {NextAuthOptions} from 'next-auth';
import {keycloakAccountPayload} from './shared/schemas/auth-schemas';
import jwt, {JwtPayload} from 'jsonwebtoken';
import {refreshAccessToken} from './refresh-token';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async jwt({token, trigger, account, session}) {
      if (trigger === 'update') token.name = session.user.name;
      if (account && account.provider === 'keycloak' && account.type === 'oauth') {
        const acc = keycloakAccountPayload.parse(account);
        token.accessToken = acc.access_token;
        token.refreshToken = acc.refresh_token;
        token.accessTokenExpires = acc.expires_at * 1000;
        token.refreshTokenExpiresAt = Date.now() + acc.refresh_expires_in * 1000;
        token.id_token = acc.id_token;
      }

      const BUFFER_TIME = 10 * 1000;
      const expirationTime = token.accessTokenExpires ?? 0;
      const isTokenExpired = Date.now() > expirationTime - BUFFER_TIME;

      if (isTokenExpired) {
        const expirationRefreshTime = token.refreshTokenExpiresAt ?? 0;
        const isRefreshExpired = Date.now() > expirationRefreshTime - BUFFER_TIME;

        if (isRefreshExpired) {
          token.tokensExpired = true;
          return token;
        }

        try {
          const refreshedToken = await refreshAccessToken({
            refreshToken: token.refreshToken ?? '',
          });

          token.id_token = refreshedToken.id_token;
          token.accessToken = refreshedToken.access_token;
          token.refreshToken = refreshedToken.refresh_token;
          token.accessTokenExpires = Date.now() + refreshedToken.expires_in * 1000;
        } catch (err) {
          console.error(err);
          token.tokensExpired = true;
        }
      }

      return token;
    },
    async session({session, token}) {
      if (token) {
        session.user = {
          ...session.user,
          email: token.email,
          name: token.name,
        };
        session.tokensExpired = token.tokensExpired;

        const {accessToken, refreshToken, id_token} = token;
        if (accessToken && refreshToken && id_token) {
          session.accessToken = accessToken;
          session.refreshToken = refreshToken;
          session.id_token = id_token;

          const tokenParsed = jwt.decode(accessToken) as JwtPayload;
          session.user.role = tokenParsed.realm_access.roles.join(',');
          session.user._id = tokenParsed.sub ?? '';
        }
      }
      return session;
    },
  },
  providers: [
    KeycloakProvider({
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENTID,
      clientSecret: process.env.KEYCLOAK_SECRET!,
      issuer: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
    }),
  ],
};
