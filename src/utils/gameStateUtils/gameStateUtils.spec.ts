import { hasEmptyCells, isGameOver } from './gameStateUtils';

describe('hasEmptyCells', () => {
    it('should return true if there is at least one empty cell', () => {
        const board = [
            [2, 4, 8, 16],
            [32, 0, 128, 256],
            [512, 1024, 2048, 4096],
            [8, 16, 32, 64],
        ];

        expect(hasEmptyCells(board)).toEqual(true);
    });

    it('should return false if there are no empty cells', () => {
        const board = [
            [2, 4, 8, 16],
            [32, 64, 128, 256],
            [512, 1024, 2048, 4096],
            [8, 16, 32, 64],
        ];

        expect(hasEmptyCells(board)).toEqual(false);
    });

    it('should handle a board with only zeros', () => {
        const board = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];

        expect(hasEmptyCells(board)).toEqual(true);
    });
});

describe('isGameOver', () => {
    it('should return false if there are empty cells', () => {
        const board = [
            [2, 4, 8, 16],
            [32, 0, 128, 256],
            [512, 1024, 2048, 4096],
            [8, 16, 32, 64],
        ];

        expect(isGameOver(board)).toEqual(false);
    });

    it('should return false if there is a possible merge horizontally', () => {
        const board = [
            [2, 2, 8, 16],
            [32, 64, 128, 256],
            [512, 1024, 2048, 4096],
            [8, 16, 32, 64],
        ];

        expect(isGameOver(board)).toEqual(false);
    });

    it('should return false if there is a possible merge vertically', () => {
        const board = [
            [2, 4, 8, 16],
            [2, 64, 128, 256],
            [512, 1024, 2048, 4096],
            [8, 16, 32, 64],
        ];

        expect(isGameOver(board)).toEqual(false);
    });

    it('should return true if there are no empty cells and no possible merges', () => {
        const board = [
            [2, 4, 8, 16],
            [32, 64, 128, 256],
            [512, 1024, 2048, 4096],
            [8, 16, 32, 64],
        ];

        expect(isGameOver(board)).toEqual(true);
    });
});
