import { createSlice } from '@reduxjs/toolkit';
import { HistoryState } from '../entities/HistoryState.interface';

const initialState: HistoryState = {
    history: [],
};

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addToHistory: (state, action) => {
            const board = action.payload.board;
            const score = action.payload.score;

            state.history.push({ board, score });

            if (state.history.length >= 5) {
                state.history.shift();
            }
        },
        clearHistory: (state) => {
            state.history = [];
        },
        undo: (state) => {
            state.history.pop();
        },
    },
});

export const { addToHistory, undo, clearHistory } = historySlice.actions;

export default historySlice.reducer;
