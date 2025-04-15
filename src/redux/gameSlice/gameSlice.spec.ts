import { gameSlice, initialState } from './gameSlice';
import * as tileUtils from '../../utils/tileUtils/tileUtils';
import { EventKey } from '../../entities/enums/eventKey.enum';

describe('gameSlice - initial state', () => {
    it('should initialize with correct default values', () => {
        expect(initialState).toEqual({
            board: expect.any(Array),
            score: 0,
            mergedTiles: [],
            newTile: [],
            gameOver: false,
        });
    });
});

describe('gameSlice - initGame', () => {
    it('should initialize board and set two random tiles', () => {
        jest.spyOn(tileUtils, 'getRandomEmptyTail').mockReturnValue([
            [0, 1],
            [2, 3],
        ]);
        jest.spyOn(tileUtils, 'generateRandomTileValue').mockReturnValue(2);
        const state = { ...initialState };

        gameSlice.caseReducers.initGame(state);

        expect(state.board.length).toBe(initialState.board.length);
        expect(state.board[0].length).toBe(initialState.board[0].length);

        expect(state.board[0][1]).toBe(2);
        expect(state.board[2][3]).toBe(2);

        expect(state.gameOver).toBe(false);

        expect(state.score).toBe(0);
    });
});

describe('gameSlice - addTile', () => {
    it('should add a new tile at a random empty position', () => {
        jest.spyOn(tileUtils, 'getRandomEmptyTail').mockReturnValue([[1, 2]]);
        jest.spyOn(tileUtils, 'generateRandomTileValue').mockReturnValue(4);

        const state = { ...initialState };

        gameSlice.caseReducers.addTile(state);

        expect(state.board[1][2]).toBe(4);

        expect(state.newTile).toEqual([1, 2]);
    });
});

describe('gameSlice - move action', () => {
    const board = [
        [2, 2, 4, 4],
        [2, 2, 4, 4],
        [4, 4, 8, 8],
        [4, 4, 8, 8],
    ];

    it('should move tiles to the left correctly', () => {
        const state = {
            ...initialState,
            board,
        };

        gameSlice.caseReducers.move(state, {
            payload: EventKey.Left,
            type: 'game/move',
        });

        expect(state.board).toEqual([
            [4, 8, 0, 0],
            [4, 8, 0, 0],
            [8, 16, 0, 0],
            [8, 16, 0, 0],
        ]);
        expect(state.mergedTiles).toEqual([
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
            [2, 0],
            [2, 1],
            [3, 0],
            [3, 1],
        ]);
        expect(state.gameOver).toEqual(false);
        expect(state.score).toEqual(72);
    });

    it('should move tiles to the right correctly', () => {
        const state = {
            ...initialState,
            board,
        };

        gameSlice.caseReducers.move(state, {
            payload: EventKey.Right,
            type: 'game/move',
        });

        expect(state.board).toEqual([
            [0, 0, 4, 8],
            [0, 0, 4, 8],
            [0, 0, 8, 16],
            [0, 0, 8, 16],
        ]);
        expect(state.mergedTiles).toEqual([
            [0, 3],
            [0, 2],
            [1, 3],
            [1, 2],
            [2, 3],
            [2, 2],
            [3, 3],
            [3, 2],
        ]);
        expect(state.gameOver).toEqual(false);
        expect(state.score).toEqual(72);
    });

    it('should move tiles up correctly', () => {
        const state = {
            ...initialState,
            board,
        };

        gameSlice.caseReducers.move(state, {
            payload: EventKey.Up,
            type: 'game/move',
        });

        expect(state.board).toEqual([
            [4, 4, 8, 8],
            [8, 8, 16, 16],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]);
        expect(state.mergedTiles).toEqual([
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1],
            [0, 2],
            [1, 2],
            [0, 3],
            [1, 3],
        ]);
        expect(state.gameOver).toEqual(false);
        expect(state.score).toEqual(72);
    });

    it('should move tiles down correctly', () => {
        const state = {
            ...initialState,
            board,
        };

        gameSlice.caseReducers.move(state, { payload: EventKey.Down, type: 'game/move' });

        expect(state.board).toEqual([
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [4, 4, 8, 8],
            [8, 8, 16, 16],
        ]);

        expect(state.mergedTiles).toEqual([
            [3, 0],
            [2, 0],
            [3, 1],
            [2, 1],
            [3, 2],
            [2, 2],
            [3, 3],
            [2, 3],
        ]);

        expect(state.gameOver).toEqual(false);
        expect(state.score).toEqual(72);
    });

    it('should not trigger gameOver', () => {
        const state = {
            ...initialState,
            board: [
                [4, 32, 2, 8],
                [4, 64, 8, 2],
                [32, 8, 32, 4],
                [16, 4, 0, 2],
            ],
        };

        gameSlice.caseReducers.move(state, { payload: EventKey.Up, type: 'game/move' });

        expect(state.gameOver).toEqual(false);
    });

    it('should trigger gameOver', () => {
        const state = {
            ...initialState,
            board: [
                [2, 4, 8, 16],
                [32, 64, 128, 256],
                [512, 1024, 2048, 4096],
                [8, 16, 32, 64],
            ],
        };

        gameSlice.caseReducers.move(state, { payload: EventKey.Right, type: 'game/move' });

        expect(state.gameOver).toEqual(true);
    });
});

describe('gameSlice - updateGameState', () => {
    it('should update board and score from lastState', () => {
        const state = { ...initialState };
        const lastState = {
            board: [
                [2, 4, 8, 16],
                [32, 64, 128, 256],
                [512, 1024, 2048, 4096],
                [8, 16, 32, 64],
            ],
            score: 1000,
        };

        gameSlice.caseReducers.updateGameState(state, { payload: { lastState, checkGameOver: false }, type: 'game/updateGameState' });

        expect(state.board).toEqual(lastState.board);
        expect(state.score).toBe(lastState.score);
        expect(state.gameOver).toBe(false);
    });

    it('should update gameOver when checkGameOver is true', () => {
        const state = { ...initialState };
        const lastState = {
            board: [
                [2, 4, 8, 16],
                [32, 64, 128, 256],
                [512, 1024, 2048, 4096],
                [8, 16, 32, 64],
            ],
            score: 1000,
        };

        gameSlice.caseReducers.updateGameState(state, { payload: { lastState, checkGameOver: true }, type: 'game/updateGameState' });

        expect(state.gameOver).toBe(true);
    });

    it('should not update state if lastState is missing', () => {
        const state = { ...initialState };

        gameSlice.caseReducers.updateGameState(state, { payload: {}, type: 'game/updateGameState' });

        expect(state.board).toEqual(initialState.board);
        expect(state.score).toBe(initialState.score);
        expect(state.gameOver).toBe(initialState.gameOver);
    });

    it('should not update state if lastState.board is missing', () => {
        const state = { ...initialState };
        const lastState = { score: 500 };

        gameSlice.caseReducers.updateGameState(state, { payload: { lastState }, type: 'game/updateGameState' });

        expect(state.board).toEqual(initialState.board);
        expect(state.score).toBe(initialState.score);
    });

    it('should not update state if lastState.score is undefined', () => {
        const state = { ...initialState };
        const lastState = {
            board: [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
        };

        gameSlice.caseReducers.updateGameState(state, { payload: { lastState }, type: 'game/updateGameState' });

        expect(state.board).toEqual(initialState.board);
        expect(state.score).toBe(initialState.score);
    });
});
