import { createSlice } from '@reduxjs/toolkit';

import { GameState } from '../entities/GameState.interface';
import { getRandomEmptyTail, generateRandomTileValue, processColumns, isGameOver, processRow } from '../utils/common';
import { EventKey } from '../entities/enums/eventKey.enum';

const initialState: GameState = {
    board: Array.from({ length: 4 }, () => Array(4).fill(0)),
    score: 0,
    gameOver: false,
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
            const randomTails = getRandomEmptyTail(state.board, 1);
            state.board = state.board.map((row, rowIndex) =>
                row.map((cell, colIndex) =>
                    randomTails.some(([i, j]) => i === rowIndex && j === colIndex) ? generateRandomTileValue() : cell,
                ),
            );
        },
        move: (state, action) => {
            const direction = action.payload;

            let newBoard = state.board;

            switch (direction) {
                case EventKey.Left:
                    newBoard = newBoard.map((row) => processRow(row, state));
                    break;

                case EventKey.Right:
                    newBoard = newBoard.map((row) => processRow([...row].reverse(), state).reverse());
                    break;

                case EventKey.Up:
                    newBoard = processColumns(newBoard, (row) => processRow(row, state));
                    break;

                case EventKey.Down:
                    newBoard = processColumns(newBoard, (row) => processRow([...row].reverse(), state).reverse());
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
            state.board = [
                [2, 4, 8, 16],
                [32, 64, 128, 256],
                [512, 1024, 2048, 4096],
                [2, 4, 8, 16],
            ];

            state.gameOver = true;
        },
    },
});

export const { initGame, addTile, move, updateGameState, mockGameOver } = gameSlice.actions;

export default gameSlice.reducer;
