import {configureStore} from '@reduxjs/toolkit';
import mediaListReducer from './slices/mediaList.slice';
import mediaImageReducer from './slices/mediaImage.slice';

export const store = configureStore({
  reducer: {
    mediaList: mediaListReducer,
    mediaImage: mediaImageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
