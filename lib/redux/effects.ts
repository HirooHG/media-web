import {createListenerMiddleware} from '@reduxjs/toolkit';
import {setImage} from './slices/media-list-slice';
import {clearImageState} from './slices/media-image-slice';
import {setMediaImage} from './slices/media-slice';

const listener = createListenerMiddleware();

listener.startListening({
  actionCreator: setImage,
  effect: (_, api) => {
    api.dispatch(clearImageState());
  },
});

listener.startListening({
  actionCreator: setMediaImage,
  effect: (_, api) => {
    api.dispatch(clearImageState());
  },
});

export default listener;
