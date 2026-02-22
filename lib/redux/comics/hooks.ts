import {useDispatch, useSelector, type TypedUseSelectorHook} from 'react-redux';
import type {RootState, AppDispatch} from './store';

// dispatch events
export const useAppDispatch = () => useDispatch<AppDispatch>();
// state redux selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
