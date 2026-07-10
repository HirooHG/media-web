import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getSession} from 'next-auth/react';
import {Media} from '../shared/models/media';
import {MediaStatus} from '../shared/models/media-status';
import {Pagination} from '@/types/pagination';
import {Result} from '@/types/result';
import {Chapter} from '../shared/models/chapter';
import {MediaImage} from '../shared/models/media-image';
import {GetAllMediasResult} from '../shared/models/result/get-all-medias-result';
import {Bookmark} from '../shared/models/bookmark';
import {ReadingStatus} from '../shared/models/reading-status';
import {ReadingStatusDto} from '../shared/schemas/reading-status-schema';
import {MediaHistory} from '../shared/models/media-history';

const defaultTransforms = <T>() => ({
  transformResponse: (baseQueryReturnValue: unknown) => (baseQueryReturnValue as Result<T>).data!,
  transformErrorResponse: (baseQueryReturnValue: unknown) =>
    (baseQueryReturnValue as Result<T>).error ?? 'An error occured',
});

export const api = createApi({
  reducerPath: 'mediaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      const token = session?.accessToken;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    medias: builder.query<GetAllMediasResult, Pagination & {status: MediaStatus | null}>({
      query: ({page, per_page, status}) =>
        `/media?page=${page}&per_page=${per_page}${status === null ? '' : '&status=' + status}`,
      ...defaultTransforms<GetAllMediasResult>(),
    }),
    mediaImage: builder.mutation<MediaImage, number>({
      query: (media_id: number) => `/media/image/${media_id}`,
      ...defaultTransforms<MediaImage>(),
    }),
    refresh: builder.mutation<GetAllMediasResult, Pagination & {status: MediaStatus | null}>({
      query: ({page, per_page, status}) => ({
        url: `/media/refresh?page=${page}&per_page=${per_page}${status === null ? '' : '&status=' + status}`,
        method: 'POST',
      }),
      ...defaultTransforms<GetAllMediasResult>(),
    }),
    media: builder.query<Media, number>({
      query: (media_id: number) => `/media/${media_id}`,
      ...defaultTransforms<Media>(),
    }),
    getMediaLastChapter: builder.query<string, number>({
      query: (media_id: number) => `/media/${media_id}/lastChapter`,
      ...defaultTransforms<string>(),
    }),
    chapters: builder.query<Chapter[], number>({
      query: (media_id: number) => `/chapter/media/${media_id}`,
      ...defaultTransforms<Chapter[]>(),
    }),
    refreshChapters: builder.mutation<Chapter[], number>({
      query: (media_id: number) => ({
        url: `/chapter/refresh/media/${media_id}`,
        method: 'POST',
      }),
      ...defaultTransforms<Chapter[]>(),
    }),
    chapter: builder.query<Chapter, {media_id: number; chapter_hid: string}>({
      query: ({media_id, chapter_hid}) => `/chapter/media/${media_id}/${chapter_hid}`,
      ...defaultTransforms<Chapter>(),
    }),
    ticket: builder.query<string, void>({
      query: () => ({
        url: `/wss/ticket`,
        method: 'POST',
      }),
      ...defaultTransforms<string>(),
    }),
    search: builder.mutation<Media[], string>({
      query: (filter) => ({
        url: '/media/search',
        method: 'POST',
        body: {filter},
      }),
      ...defaultTransforms<Media[]>(),
    }),
    getBookmarkByMedia: builder.query<Bookmark | null, number>({
      query: (mediaId: number) => `/bookmark/media/${mediaId}`,
      ...defaultTransforms<Bookmark | null>(),
    }),
    deleteBookmark: builder.mutation<string, string>({
      query: (id: string) => ({
        url: `/bookmark/${id}`,
        method: 'DELETE',
      }),
      ...defaultTransforms<string | null>(),
    }),
    createBookmark: builder.mutation<Bookmark, {mediaId: number; chapterId: number}>({
      query: ({mediaId, chapterId}) => ({
        url: '/bookmark',
        method: 'POST',
        body: {mediaId, chapterId},
      }),
      ...defaultTransforms<Bookmark>(),
    }),
    upsertBookmarkByChapterHid: builder.query<Bookmark, {mediaId: number; chapterHid: string}>({
      query: ({mediaId, chapterHid}) => ({
        url: '/bookmark/hid',
        method: 'POST',
        body: {mediaId, chapterHid},
      }),
      ...defaultTransforms<Bookmark>(),
    }),
    updateBookmark: builder.mutation<Bookmark, {id: string; chapterId: number; mediaId: number}>({
      query: ({id, chapterId, mediaId}) => ({
        url: `/bookmark/${id}`,
        method: 'PUT',
        body: {mediaId, chapterId},
      }),
      ...defaultTransforms<Bookmark>(),
    }),
    getReadingStatuses: builder.query<ReadingStatus[], void>({
      query: () => '/readingStatus',
      ...defaultTransforms<ReadingStatus[]>(),
    }),
    postReadingStatus: builder.mutation<ReadingStatus, ReadingStatusDto>({
      query: (dto) => ({
        url: '/readingStatus',
        method: 'POST',
        body: dto,
      }),
      ...defaultTransforms<ReadingStatus>(),
    }),
    deleteReadingStatus: builder.mutation<string, string>({
      query: (id) => ({
        url: `/readingStatus/${id}`,
        method: 'DELETE',
      }),
      ...defaultTransforms<string>(),
    }),
    getMediaReadingStatus: builder.query<ReadingStatus | null, number>({
      query: (mediaId: number) => `/media/${mediaId}/readingStatus`,
      ...defaultTransforms<ReadingStatus | null>(),
    }),
    patchMediaReadingStatus: builder.mutation<
      Media,
      {mediaId: number; readingStatusId: string | null}
    >({
      query: ({mediaId, readingStatusId}) => ({
        url: `/media/${mediaId}/readingStatus`,
        method: 'PATCH',
        body: {readingStatusId},
      }),
      ...defaultTransforms<Media>(),
    }),
    getMediaHistory: builder.query<MediaHistory[], number>({
      query: (limit: number) => `/history?limit=${limit}`,
      ...defaultTransforms<MediaHistory[]>(),
    }),
    putMediaHistory: builder.query<void, {mediaId: number; chapterHid: string}>({
      query: ({chapterHid, mediaId}) => ({
        url: `/history/${mediaId}`,
        method: 'PUT',
        body: {chapterHid},
      }),
      ...defaultTransforms<void>(),
    }),
    deleteMediaHistory: builder.mutation<void, number>({
      query: (id: number) => ({
        url: `/history/${id}`,
        method: 'DELETE',
      }),
      ...defaultTransforms<void>(),
    }),
  }),
});

export const {
  useMediasQuery,
  useRefreshMutation,
  useMediaQuery,
  useGetMediaLastChapterQuery,
  useMediaImageMutation,
  useChaptersQuery,
  useRefreshChaptersMutation,
  useChapterQuery,
  useTicketQuery,
  useSearchMutation,
  useGetBookmarkByMediaQuery,
  useCreateBookmarkMutation,
  useUpsertBookmarkByChapterHidQuery,
  useUpdateBookmarkMutation,
  useDeleteBookmarkMutation,
  useGetReadingStatusesQuery,
  usePostReadingStatusMutation,
  useDeleteReadingStatusMutation,
  usePatchMediaReadingStatusMutation,
  useGetMediaReadingStatusQuery,
  useGetMediaHistoryQuery,
  usePutMediaHistoryQuery,
  useDeleteMediaHistoryMutation,
} = api;
