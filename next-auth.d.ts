import {DefaultSession} from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: User;
    tokensExpired: boolean;
    error: string | undefined;
  }

  interface User {
    id: string;
    name: string;
    accessToken: string;
    refreshToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    name: string;
    id: string;
    accessToken: string;
    refreshToken: string;
    tokensExpired: boolean;
    error: string | undefined;
  }
}

export {};
