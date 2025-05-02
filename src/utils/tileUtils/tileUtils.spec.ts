import { generateRandomTileValue, getEmptyTails, getRandomEmptyTail } from './tileUtils';

describe('generateRandomTileValue', () => {
    it('should return either 2 or 4', () => {
        for (let i = 0; i < 100; i++) {
            const result = generateRandomTileValue();
            expect([2, 4]).toContain(result);
        }
    });

    it('should return 2 approximately 90% of the time', () => {
        let countTwo = 0;
        let countFour = 0;

        for (let i = 0; i < 1000; i++) {
            const result = generateRandomTileValue();
            if (result === 2) countTwo++;
            else if (result === 4) countFour++;
        }

        const probabilityTwo = countTwo / 1000;
        const probabilityFour = countFour / 1000;

        expect(probabilityTwo).toBeGreaterThan(0.85);
        expect(probabilityFour).toBeLessThan(0.15);
    });
});

describe('getEmptyTails', () => {
    it('should return empty positions when the board has empty cells', () => {
        const board = [
            [2, 0, 4, 0],
            [8, 16, 0, 32],
            [0, 64, 128, 256],
            [512, 1024, 2048, 4096],
        ];

        expect(getEmptyTails(board)).toEqual([
            [0, 1],
            [0, 3],
            [1, 2],
            [2, 0],
        ]);
    });

    it('should return an empty array if there are no empty cells', () => {
        const board = [
            [2, 4, 8, 16],
            [32, 64, 128, 256],
            [512, 1024, 2048, 4096],
            [8, 16, 32, 64],
        ];

        expect(getEmptyTails(board)).toEqual([]);
    });

    it('should return correct indices for a board filled only with zeros', () => {
        const board = [
            [0, 0],
            [0, 0],
        ];

        expect(getEmptyTails(board)).toEqual([
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
        ]);
    });

    it('should handle an empty board', () => {
        const board: number[][] = [];

        expect(getEmptyTails(board)).toEqual([]);
    });
});

jest.mock('lodash', () => ({
    shuffle: jest.fn((arr) => arr.reverse()),
}));

describe('getRandomEmptyTail', () => {
    it('should return empty positions when count is valid', () => {
        const board = [
            [2, 0, 4, 0],
            [8, 16, 0, 32],
            [0, 64, 128, 256],
            [512, 1024, 2048, 4096],
        ];

        const result = getRandomEmptyTail(board, 3);
        expect(result.length).toBe(3);
        expect(result).toEqual([
            [2, 0],
            [1, 2],
            [0, 3],
        ]);
    });

    it('should return an empty array if there are fewer empty cells than requested', () => {
        const board = [
            [2, 4, 8, 16],
            [32, 64, 128, 256],
            [512, 1024, 2048, 4096],
            [8, 16, 32, 64],
        ];

        const result = getRandomEmptyTail(board, 2);
        expect(result).toEqual([]);
    });

    it('should return exactly one empty cell when count is 1', () => {
        const board = [
            [2, 4, 8, 16],
            [32, 0, 128, 256],
            [512, 1024, 2048, 4096],
            [8, 16, 32, 64],
        ];

        const result = getRandomEmptyTail(board, 1);
        expect(result).toEqual([[1, 1]]);
    });

    it('should return all empty cells if count is equal to available cells', () => {
        const board = [
            [0, 2, 0, 4],
            [0, 0, 8, 16],
        ];

        const result = getRandomEmptyTail(board, 4);
        expect(result.length).toBe(4);
        expect(result).toEqual([
            [1, 1],
            [1, 0],
            [0, 2],
            [0, 0],
        ]);
    });
});
