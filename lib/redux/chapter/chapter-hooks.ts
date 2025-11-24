import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {ChapterDispatch, ChapterRootState} from './chapter-store';

export const useChapterDispatch = () => useDispatch<ChapterDispatch>();
export const useChapterSelector: TypedUseSelectorHook<ChapterRootState> = useSelector;
