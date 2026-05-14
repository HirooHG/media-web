// env.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_BASE_URL: string;
      // keycloak
      NEXT_PUBLIC_KEYCLOAK_URL: string;
      NEXT_PUBLIC_KEYCLOAK_CLIENTID: string;
      // minio
      NEXT_PUBLIC_MINIO_BUCKET: string;
      NEXT_PUBLIC_MINIO_ENDPOINT: string;
      NEXT_PUBLIC_MINIO_PORT: number;
      NEXT_PUBLIC_MINIO_USESSL: string;
      // mqtt
      NEXT_PUBLIC_WS_URL: string;
    }
  }
}

export {};
