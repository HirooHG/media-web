import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {ComicDispatch, ComicRootState} from './comic-store';

export const useComicDispatch = () => useDispatch<ComicDispatch>();
export const useComicSelector: TypedUseSelectorHook<ComicRootState> = useSelector;
