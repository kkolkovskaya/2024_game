import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice/gameSlice';
import historyReducer from './historySlice';

export const store = configureStore({
    reducer: {
        game: gameReducer,
        history: historyReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
