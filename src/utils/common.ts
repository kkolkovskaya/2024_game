import { shuffle } from 'lodash';

export const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
};

export const getEmptyTails = (board: number[][]) => {
    const empty = [];

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 0) {
                empty.push([i, j]);
            }
        }
    }

    return empty;
};

export const getRandomEmptyTail = (board: number[][], count: number): number[][] => {
    const emptyTails = getEmptyTails(board);

    if (emptyTails.length < count) {
        return [];
    }

    const shuffledTails = shuffle(emptyTails);
    return shuffledTails.slice(0, count);
};

export const generateRandomTileValue = () => (Math.random() < 0.9 ? 2 : 4);

export const moveZeros = (arr: number[]) => {
    let lastNonZeroIndex = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
            arr[lastNonZeroIndex] = arr[i];
            lastNonZeroIndex++;
        }
    }

    for (let i = lastNonZeroIndex; i < arr.length; i++) {
        arr[i] = 0;
    }

    return arr;
};

export const compressArray = (arr: number[]) => {
    let score = 0;
    const processedArr = moveZeros(arr);

    for (let i = 0; i < processedArr.length; i++) {
        if (i < processedArr.length - 1 && processedArr[i] === processedArr[i + 1]) {
            processedArr[i] = processedArr[i] * 2;
            score += processedArr[i] * 2;
            processedArr[i + 1] = 0;
        }
    }

    return { compressedArr: moveZeros(processedArr), score };
};

export const transposeMatrix = (matrix: number[][]): number[][] => {
    if (matrix.length === 0) {
        return [];
    }

    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
};

export const processColumns = (board: number[][], callback: (row: number[]) => number[]): number[][] => {
    const transposed = transposeMatrix(board);
    const processed = transposed.map(callback);
    return transposeMatrix(processed);
};

export const hasEmptyCells = (board: number[][]): boolean => {
    for (const row of board) {
        if (row.includes(0)) {
            return false;
        }
    }

    return true;
};

export const isGameOver = (board: number[][]): boolean => {
    if (hasEmptyCells(board)) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (j < board[i].length - 1 && board[i][j] === board[i][j + 1]) {
                    return false;
                }

                if (i < board.length - 1 && board[i][j] === board[i + 1][j]) {
                    return false;
                }
            }
        }
        return true;
    } else {
        return false;
    }
};

export const processRow = (row: number[], state: { score: number }) => {
    const { compressedArr, score } = compressArray(row);
    state.score += score;
    return compressedArr;
};
