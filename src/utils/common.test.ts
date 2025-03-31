import { moveZeros, compressArray, transposeMatrix, isGameOver } from './common';

describe('moveZeros', () => {
    it('should move all zeros to the end of the array', () => {
        expect(moveZeros([0, 1, 0, 3, 12])).toEqual([1, 3, 12, 0, 0]);
        expect(moveZeros([0, 0, 0, 0])).toEqual([0, 0, 0, 0]);
        expect(moveZeros([1, 2, 3])).toEqual([1, 2, 3]);
        expect(moveZeros([])).toEqual([]);
    });
});

describe('compressArray', () => {
    it('should combine adjacent equal values and shift zeros to the end', () => {
        expect(compressArray([2, 2, 0, 4])).toEqual([4, 4, 0, 0]);
        expect(compressArray([2, 0, 2, 2])).toEqual([4, 2, 0, 0]);
        expect(compressArray([4, 4, 4, 4])).toEqual([8, 8, 0, 0]);
        expect(compressArray([0, 0, 0, 0])).toEqual([0, 0, 0, 0]);
        expect(compressArray([2, 0, 0, 2])).toEqual([4, 0, 0, 0]);
    });
});

describe('transposeMatrix', () => {
    it('should transpose a matrix with multiple rows and columns', () => {
        expect(
            transposeMatrix([
                [1, 2, 3],
                [4, 5, 6],
            ]),
        ).toEqual([
            [1, 4],
            [2, 5],
            [3, 6],
        ]);
    });

    it('should handle a square matrix', () => {
        expect(
            transposeMatrix([
                [1, 2],
                [3, 4],
            ]),
        ).toEqual([
            [1, 3],
            [2, 4],
        ]);
    });

    it('should handle a single row', () => {
        expect(transposeMatrix([[1, 2, 3]])).toEqual([[1], [2], [3]]);
    });

    it('should handle a single column', () => {
        expect(transposeMatrix([[1], [2], [3]])).toEqual([[1, 2, 3]]);
    });

    it('should return an empty matrix for empty input', () => {
        expect(transposeMatrix([])).toEqual([]);
    });

    it('should transpose a matrix with zeros and negatives', () => {
        expect(
            transposeMatrix([
                [0, -1],
                [-2, 0],
            ]),
        ).toEqual([
            [0, -2],
            [-1, 0],
        ]);
    });
});

describe('isGameOver', () => {
    it('should return false if there are empty cells', () => {
        const board = [
            [2, 4, 8, 16],
            [32, 64, 0, 128],
            [256, 512, 1024, 2048],
            [2, 4, 8, 16],
        ];
        expect(isGameOver(board)).toBe(false);
    });

    it('should return false if merges are possible', () => {
        const board = [
            [2, 2, 8, 16],
            [32, 64, 128, 256],
            [512, 1024, 2048, 4096],
            [2, 4, 8, 8],
        ];
        expect(isGameOver(board)).toBe(false);
    });

    it('should return true if no empty cells and no merges are possible', () => {
        const board = [
            [2, 4, 8, 16],
            [32, 64, 128, 256],
            [512, 1024, 2048, 4096],
            [2, 4, 8, 16],
        ];
        expect(isGameOver(board)).toBe(true);
    });

    it('should return false for an empty board', () => {
        const board = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        expect(isGameOver(board)).toBe(false);
    });

    it('should return false if a single row is mergeable', () => {
        const board = [
            [2, 2, 2, 2],
            [4, 8, 16, 32],
            [64, 128, 256, 512],
            [1024, 2048, 4096, 8192],
        ];
        expect(isGameOver(board)).toBe(false);
    });

    it('should return false if a column is mergeable', () => {
        const board = [
            [2, 16, 2, 4],
            [2, 8, 16, 32],
            [64, 128, 256, 512],
            [1024, 2048, 4096, 8192],
        ];
        expect(isGameOver(board)).toBe(false);
    });
});
