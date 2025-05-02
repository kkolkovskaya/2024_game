import { shuffle } from 'lodash';

export const generateRandomTileValue = (): number => (Math.random() < 0.9 ? 2 : 4);

export const getEmptyTails = (board: number[][]): number[][] => {
    const empty: number[][] = [];
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
