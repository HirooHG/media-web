import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getSession} from 'next-auth/react';
import {Media} from '../shared/models/media';
import {MediaStatus} from '../shared/models/media-status';
import {Pagination} from '@/types/pagination';
import {Result} from '@/types/result';
import {Chapter} from '../shared/models/chapter';
import {MediaImage} from '../shared/models/media-image';

const defaultTransforms = <T>() => ({
  transformResponse: (baseQueryReturnValue: unknown) => (baseQueryReturnValue as Result<T>).data!,
  transformErrorResponse: (baseQueryReturnValue: unknown) =>
    (baseQueryReturnValue as Result<T>).error ?? 'An error occured',
});

export const api = createApi({
  reducerPath: 'mediaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + '/media',
    prepareHeaders: async (headers) => {
      const session = await getSession();
      const token = session?.accessToken;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    medias: builder.query<Media[], Pagination & {status: MediaStatus | null}>({
      query: ({page, per_page, status}) =>
        `?page=${page}&per_page=${per_page}${status === null ? '' : '&status=' + status}`,
      ...defaultTransforms<Media[]>(),
    }),
    mediaImage: builder.mutation<MediaImage, number>({
      query: (media_id: number) => `/comic/image/${media_id}`,
      ...defaultTransforms<MediaImage>(),
    }),
    refresh: builder.mutation<Media[], Pagination & {status: MediaStatus | null}>({
      query: ({page, per_page, status}) => ({
        url: `/refresh?page=${page}&per_page=${per_page}${status === null ? '' : '&status=' + status}`,
        method: 'POST',
      }),
      ...defaultTransforms<Media[]>(),
    }),
    media: builder.query<Media, number>({
      query: (media_id: number) => `/comic/${media_id}`,
      ...defaultTransforms<Media>(),
    }),
    chapters: builder.query<Chapter[], number>({
      query: (media_id: number) => `/comic/${media_id}/chapters`,
      ...defaultTransforms<Chapter[]>(),
    }),
    refreshChapters: builder.mutation<Chapter[], number>({
      query: (media_id: number) => ({
        url: `/refresh/comic/${media_id}/chapters`,
        method: 'POST',
      }),
      ...defaultTransforms<Chapter[]>(),
    }),
    chapter: builder.query<Chapter, {media_id: number; chapter_id: number}>({
      query: ({media_id, chapter_id}) => `/comic/${media_id}/chapter/${chapter_id}`,
      ...defaultTransforms<Chapter>(),
    }),
  }),
});

export const {
  useMediasQuery,
  useRefreshMutation,
  useMediaQuery,
  useMediaImageMutation,
  useChaptersQuery,
  useRefreshChaptersMutation,
  useChapterQuery,
} = api;
