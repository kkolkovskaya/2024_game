import { createSlice } from '@reduxjs/toolkit';

import { GameState } from '../entities/GameState.interface';
import { getRandomEmptyTail, generateRandomTileValue } from '../utils/tileUtils/tileUtils';
import { processColumns, processRow } from '../utils/gameLogicUtils/gameLogicUtils';
import { isGameOver } from '../utils/gameStateUtils/gameStateUtils';
import { EventKey } from '../entities/enums/eventKey.enum';

const initialState: GameState = {
    board: Array.from({ length: 4 }, () => Array(4).fill(0)),
    score: 0,
    gameOver: false,
    newTile: [],
    mergedTiles: [],
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        initGame: (state) => {
            state.board = initialState.board;
            const randomTails = getRandomEmptyTail(state.board, 2);

            state.board = state.board.map((row, rowIndex) =>
                row.map((cell, colIndex) =>
                    randomTails.some(([i, j]) => i === rowIndex && j === colIndex) ? generateRandomTileValue() : cell,
                ),
            );

            state.gameOver = false;
            state.score = 0;
        },
        addTile: (state) => {
            const randomTail = getRandomEmptyTail(state.board, 1);
            state.newTile = randomTail[0];

            state.board = state.board.map((row, rowIndex) =>
                row.map((cell, colIndex) =>
                    randomTail.some(([i, j]) => i === rowIndex && j === colIndex) ? generateRandomTileValue() : cell,
                ),
            );
        },
        move: (state, action) => {
            const direction = action.payload;

            let newBoard = state.board;
            state.mergedTiles = [];

            switch (direction) {
                case EventKey.Left:
                    newBoard = newBoard.map((row, i) => processRow(row, i, state));
                    break;

                case EventKey.Right:
                    newBoard = newBoard.map((row, i) => processRow([...row].reverse(), i, state, true).reverse());
                    break;

                case EventKey.Up:
                    newBoard = processColumns(newBoard, (row, i) => processRow(row, i, state));
                    break;

                case EventKey.Down:
                    newBoard = processColumns(newBoard, (row, i) => processRow([...row].reverse(), i, state, true).reverse());
                    break;

                default:
                    return;
            }

            state.board = newBoard;

            state.gameOver = isGameOver(state.board);
        },
        updateGameState: (state, action) => {
            const lastState = action.payload.lastState;
            if (lastState && lastState.board && (lastState.score === 0 || lastState.score)) {
                state.board = lastState.board;
                state.score = lastState.score;
                if (action.payload.checkGameOver) {
                    state.gameOver = isGameOver(lastState.board);
                }
            }
        },

        // TODO: Remove this
        mockGameOver: (state) => {
            // state.board = [
            //     [2, 8, 4, 2],
            //     [8, 32, 64, 16],
            //     [16, 128, 8, 8],
            //     [4, 8, 2, 4],
            // ];

            state.board = [
                [0, 0, 0, 0],
                [2, 2, 4, 4],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ];
        },
    },
});

export const { initGame, addTile, move, updateGameState, mockGameOver } = gameSlice.actions;

export default gameSlice.reducer;
