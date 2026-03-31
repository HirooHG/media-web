import {authSchema} from '@/types/schemas/auth-schema';
import {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt, {JwtPayload} from 'jsonwebtoken';
import {SignInForm} from '@/types/schemas/signin-schema';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async jwt({token: tk, user}) {
      let token = {...tk, ...user};

      const {accessToken, refreshToken} = token;

      const {exp: accessExp} = jwt.decode(accessToken) as JwtPayload;
      const {exp: refreshExp} = jwt.decode(refreshToken) as JwtPayload;

      const interval = 3600 * 1000; // 1 hour interval with UTC (UTC+01)
      const accessExpDate = new Date((accessExp ?? 0) * 1000 + interval); // x1000, second to milsecond

      const now = new Date(Date.now() + interval);
      if (accessExpDate < now) {
        const refreshExpDate = new Date((refreshExp ?? 0) * 1000 + interval);

        if (refreshExpDate < now) {
          return {...token, tokensExpired: true};
        }

        const dto = {
          username: token.name,
          refreshToken,
        };

        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/refresh', {
          method: 'POST',
          body: JSON.stringify(dto),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const json = await res.json();
        const {success, data, error} = authSchema.safeParse(json);

        if (!res.ok || !success || !data || !data.data) {
          return {...token, tokensExpired: true, error: data?.error ?? error?.message};
        }

        token = {
          ...token,
          accessToken: data.data.token,
          refreshToken: data.data.refreshToken,
        };
      }

      return {...token, tokensExpired: false};
    },
    async session({session, token}) {
      session.user = {...token};
      session.tokensExpired = token.tokensExpired;
      session.error = token.error;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: {label: 'username', type: 'text'},
        password: {label: 'password', type: 'password'},
      },
      async authorize(creds) {
        try {
          const dto: SignInForm = {
            username: creds?.username.trim() ?? '',
            password: creds?.password.trim() ?? '',
          };
          const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth', {
            method: 'POST',
            body: JSON.stringify(dto),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const json = await res.json();
          const auth = authSchema.safeParse(json);

          if (res.ok && auth.success && auth.data.data) {
            const {username, token, refreshToken} = auth.data.data;
            const parsed = jwt.decode(token);
            return {
              id: parsed!.sub as string,
              name: username,
              accessToken: token,
              refreshToken,
            };
          }
        } catch {
          return null;
        }

        return null;
      },
    }),
  ],
};
