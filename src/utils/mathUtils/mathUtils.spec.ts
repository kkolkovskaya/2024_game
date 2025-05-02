import { moveZerosWithIndices, getRandomInt, transposeMatrix } from './mathUtils';

describe('moveZerosWithIndices', () => {
    it('should move zeros and update indicies', () => {
        const input: [number, number, number][] = [
            [2, 0, 0],
            [0, 1, 1],
            [2, 2, 2],
            [4, 3, 3],
        ];

        expect(moveZerosWithIndices(input)).toEqual([
            [2, 0, 0],
            [2, 2, 1],
            [4, 3, 2],
            [0, -1, -1],
        ]);
    });
});

describe('getRandomInt', () => {
    it('should return a number within the given range', () => {
        const min = 10;
        const max = 20;

        for (let i = 0; i < 100; i++) {
            const result = getRandomInt(min, max);
            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThan(max);
        }
    });

    it('should handle edge case where min is equal to max - 1', () => {
        const min = 5;
        const max = 6;

        const result = getRandomInt(min, max);
        expect(result).toBe(5);
    });

    it('should handle negative range values', () => {
        const min = -10;
        const max = -5;

        const result = getRandomInt(min, max);
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThan(max);
    });

    it('should return different values over multiple calls', () => {
        const min = 1;
        const max = 10;

        const results = new Set();
        for (let i = 0; i < 100; i++) {
            results.add(getRandomInt(min, max));
        }

        expect(results.size).toBeGreaterThan(1);
    });
});

describe('transposeMatrix', () => {
    it('should transpose a square matrix', () => {
        const matrix = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ];

        const result = transposeMatrix(matrix);

        expect(result).toEqual([
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
        ]);
    });

    it('should return an empty array for an empty matrix', () => {
        const matrix: number[][] = [];

        const result = transposeMatrix(matrix);

        expect(result).toEqual([]);
    });

    it('should handle a single-row matrix', () => {
        const matrix = [[1, 2, 3, 4]];

        const result = transposeMatrix(matrix);

        expect(result).toEqual([[1], [2], [3], [4]]);
    });

    it('should handle a single-column matrix', () => {
        const matrix = [[1], [2], [3], [4]];

        const result = transposeMatrix(matrix);

        expect(result).toEqual([[1, 2, 3, 4]]);
    });
});
