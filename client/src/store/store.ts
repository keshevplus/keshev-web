import { configureStore } from '@reduxjs/toolkit';
import sharedStateReducer from './sharedStateSlice';

const store = configureStore({
  reducer: {
    sharedState: sharedStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
