import { moveZerosWithIndices } from './mathUtils';

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
