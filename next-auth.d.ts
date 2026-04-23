declare module 'next-auth' {
  interface Session {
    tokensExpired: boolean;
    accessToken: string;
    refreshToken: string;
    id_token: string;
    user: {
      _id: string;
      stdId: string;
      name: string | null | undefined;
      email: string | null | undefined;
      hallName: string;
      description: string;
      role: string;
    };
  }

  interface User {
    id: string;
    accessToken: string;
    refreshToken: string;
    user: {
      _id: string;
      stdId: string;
      name: string;
      email: string;
      hallName: string;
      description: string;
      role: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    email?: string | null;
    name?: string | null;
    accessToken?: string;
    refreshToken?: string;
    id_token?: string;
    accessTokenExpires?: number;
    refreshTokenExpiresAt?: number;
    error?: string;
    tokensExpired: boolean;
    user?: {
      _id: string;
      stdId: string;
      name: string;
      email: string;
      hallName: string;
      description: string;
      role: string;
    };
  }
}

export {};
