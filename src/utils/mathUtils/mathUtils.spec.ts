import { moveZerosWithIndices } from './mathUtils';

describe('moveZerosWithIndices', () => {
    it('should move zeros to the end when they are at the end of the array', () => {
        const input: [number, number][] = [
            [1, 0],
            [2, 1],
            [3, 2],
            [0, 3],
            [0, 4],
        ];
        const result = moveZerosWithIndices(input);
        expect(result).toEqual([
            [1, 0],
            [2, 1],
            [3, 2],
            [0, -1],
            [0, -1],
        ]);
    });

    it('should move zeros to the end when they are in the middle of the array', () => {
        const input: [number, number][] = [
            [1, 0],
            [0, 1],
            [2, 2],
            [0, 3],
            [3, 4],
        ];
        const result = moveZerosWithIndices(input);
        expect(result).toEqual([
            [1, 0],
            [2, 2],
            [3, 4],
            [0, -1],
            [0, -1],
        ]);
    });

    it('should move zeros to the end when they are at the beginning of the array', () => {
        const input: [number, number][] = [
            [0, 0],
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 4],
        ];
        const result = moveZerosWithIndices(input);
        expect(result).toEqual([
            [1, 2],
            [2, 3],
            [3, 4],
            [0, -1],
            [0, -1],
        ]);
    });

    it('should not change the array if there are no zeros', () => {
        const input: [number, number][] = [
            [1, 0],
            [2, 1],
            [3, 2],
            [4, 3],
        ];
        const result = moveZerosWithIndices(input);
        expect(result).toEqual([
            [1, 0],
            [2, 1],
            [3, 2],
            [4, 3],
        ]);
    });

    it('should return an empty array for an empty input', () => {
        const input: [number, number][] = [];
        const result = moveZerosWithIndices(input);
        expect(result).toEqual([]);
    });

    it('should move zeros to the end if all elements are zeros', () => {
        const input: [number, number][] = [
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3],
        ];
        const result = moveZerosWithIndices(input);
        expect(result).toEqual([
            [0, -1],
            [0, -1],
            [0, -1],
            [0, -1],
        ]);
    });

    it('should handle repeated numbers and zeros', () => {
        const input: [number, number][] = [
            [1, 0],
            [0, 1],
            [1, 2],
            [0, 3],
            [1, 4],
        ];
        const result = moveZerosWithIndices(input);
        expect(result).toEqual([
            [1, 0],
            [1, 2],
            [1, 4],
            [0, -1],
            [0, -1],
        ]);
    });
});
