'use server';

import {Client} from 'minio';

const bucket = process.env.NEXT_PUBLIC_MINIO_BUCKET;

const minio = new Client({
  endPoint: process.env.NEXT_PUBLIC_MINIO_ENDPOINT,
  port: Number(process.env.NEXT_PUBLIC_MINIO_PORT),
  useSSL: true,
  accessKey: process.env.NEXT_PUBLIC_MINIO_ROOT_USER,
  secretKey: process.env.NEXT_PUBLIC_MINIO_ROOT_PASSWORD,
});

export const getImageUrl = async (name: string) => {
  const url = await minio.presignedGetObject(bucket, name, 3600);

  return url;
};
