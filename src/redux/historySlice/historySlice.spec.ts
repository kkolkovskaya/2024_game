import { HistoryState } from '../../entities/HistoryState.interface';
import { historySlice, initialState } from './historySlice';

describe('historySlice - initial state', () => {
    it('should initialize with correct default values', () => {
        expect(initialState).toEqual({
            history: expect.any(Array),
        });
    });
});

describe('historySlice - addToHistory (multiple calls)', () => {
    it('should store only last 5 game states', () => {
        const state = { ...initialState };

        for (let i = 1; i <= 6; i++) {
            const fakeBoard = [
                [i, i, i, i],
                [i, i, i, i],
                [i, i, i, i],
                [i, i, i, i],
            ];

            historySlice.caseReducers.addToHistory(state, {
                payload: { board: fakeBoard, score: i * 10 },
                type: 'historySlice/addToHistory',
            });
        }

        expect(state.history.length).toBe(5);

        expect(state.history).toEqual([
            {
                board: [
                    [2, 2, 2, 2],
                    [2, 2, 2, 2],
                    [2, 2, 2, 2],
                    [2, 2, 2, 2],
                ],
                score: 20,
            },
            {
                board: [
                    [3, 3, 3, 3],
                    [3, 3, 3, 3],
                    [3, 3, 3, 3],
                    [3, 3, 3, 3],
                ],
                score: 30,
            },
            {
                board: [
                    [4, 4, 4, 4],
                    [4, 4, 4, 4],
                    [4, 4, 4, 4],
                    [4, 4, 4, 4],
                ],
                score: 40,
            },
            {
                board: [
                    [5, 5, 5, 5],
                    [5, 5, 5, 5],
                    [5, 5, 5, 5],
                    [5, 5, 5, 5],
                ],
                score: 50,
            },
            {
                board: [
                    [6, 6, 6, 6],
                    [6, 6, 6, 6],
                    [6, 6, 6, 6],
                    [6, 6, 6, 6],
                ],
                score: 60,
            },
        ]);
    });
});

describe('historySlice - clearHistory', () => {
    it('should clear the history', () => {
        const state: HistoryState = {
            history: [],
        };

        for (let i = 1; i <= 3; i++) {
            state.history.push({
                board: [
                    [i, i, i, i],
                    [i, i, i, i],
                    [i, i, i, i],
                    [i, i, i, i],
                ],
                score: i * 10,
            });
        }

        historySlice.caseReducers.clearHistory(state);

        expect(state.history).toEqual([]);
    });
});

describe('historySlice - undo', () => {
    const state: HistoryState = {
        history: [],
    };
    it('should remove last element from history', () => {
        for (let i = 1; i <= 3; i++) {
            state.history.push({
                board: [
                    [i, i, i, i],
                    [i, i, i, i],
                    [i, i, i, i],
                    [i, i, i, i],
                ],
                score: i * 10,
            });
        }

        expect(state.history.length).toEqual(3);

        historySlice.caseReducers.undo(state);

        expect(state.history).toEqual([
            {
                board: [
                    [1, 1, 1, 1],
                    [1, 1, 1, 1],
                    [1, 1, 1, 1],
                    [1, 1, 1, 1],
                ],
                score: 10,
            },
            {
                board: [
                    [2, 2, 2, 2],
                    [2, 2, 2, 2],
                    [2, 2, 2, 2],
                    [2, 2, 2, 2],
                ],
                score: 20,
            },
        ]);
    });
});
