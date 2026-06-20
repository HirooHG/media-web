import {appToast} from '@/components/shared/app-toast';
import {
  useCreateBookmarkMutation,
  useDeleteBookmarkMutation,
  useGetBookmarkByMediaQuery,
  useUpdateBookmarkMutation,
} from '@/lib/redux/api';
import {useAppSelector} from '@/lib/redux/hooks';
import {setChaptersError} from '@/lib/redux/slices/media-slice';
import {useDispatch} from 'react-redux';

export const useBookmarks = (mediaId: number) => {
  const dispatch = useDispatch();
  const bookmark = useAppSelector((state) => state.media.bookmark);
  const {refetch} = useGetBookmarkByMediaQuery(mediaId, {refetchOnMountOrArgChange: true});

  const [createBookmark] = useCreateBookmarkMutation();
  const [updateBookmark] = useUpdateBookmarkMutation();
  const [deleteBookmark] = useDeleteBookmarkMutation();

  const onBookmarkChapter = async (chapterId: number) => {
    if (!bookmark) {
      const created = await createBookmark({mediaId, chapterId});

      if (created.error) {
        dispatch(setChaptersError('Failed to create bookmark'));
        return;
      }
    } else if (bookmark.chapterId === chapterId && bookmark.mediaId === mediaId) {
      const res = await deleteBookmark(bookmark.id);

      if (res.error) {
        dispatch(setChaptersError('Failed to delete bookmark'));
        return;
      }
    } else {
      const updated = await updateBookmark({id: bookmark.id, mediaId, chapterId});

      if (updated.error) {
        dispatch(setChaptersError('Failed to update bookmark'));
        return;
      }
    }

    await refetch();
    appToast('Bookmark', 'Modified bookmark');
  };

  return {
    bookmark,
    onBookmarkChapter,
  };
};
