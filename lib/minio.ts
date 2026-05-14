'use server';

import {Client} from 'minio';

const bucket = process.env.NEXT_PUBLIC_MINIO_BUCKET;

const minio = new Client({
  endPoint: process.env.NEXT_PUBLIC_MINIO_ENDPOINT,
  port: Number(process.env.NEXT_PUBLIC_MINIO_PORT),
  useSSL: process.env.NEXT_PUBLIC_MINIO_USESSL === 'true',
  accessKey: process.env.MINIO_ROOT_USER,
  secretKey: process.env.MINIO_ROOT_PASSWORD,
});

export const getImageUrl = async (name: string) => {
  try {
    const url = await minio.presignedGetObject(bucket, name, 3600);
    return url;
  } catch {
    return null;
  }
};
