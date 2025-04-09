import { compressArray } from './gameLogicUtils';

describe('compressArray', () => {
    it('should compress array if there is one merge', () => {
        const input = [2, 2, 4, 0];
        const rowIndex = 0;
        const reversed = false;
        expect(compressArray(input, rowIndex, reversed)).toEqual({
            compressedArr: [4, 4, 0, 0],
            score: 4,
            merged: [[0, 0]],
        });
    });

    it('should compress array if there is no merge', () => {
        const input = [2, 4, 0, 8];
        const rowIndex = 1;
        const reversed = false;
        expect(compressArray(input, rowIndex, reversed)).toEqual({
            compressedArr: [2, 4, 8, 0],
            score: 0,
            merged: [],
        });
    });

    it('should compress array if there are multiple merges', () => {
        const input = [2, 2, 2, 2];
        const rowIndex = 0;
        const reversed = false;
        expect(compressArray(input, rowIndex, reversed)).toEqual({
            compressedArr: [4, 4, 0, 0],
            score: 8,
            merged: [
                [0, 0],
                [0, 1],
            ],
        });
    });

    it('should compress array if reversed is true', () => {
        const input = [0, 2, 2, 4];
        const rowIndex = 3;
        const reversed = true;
        expect(compressArray(input, rowIndex, reversed)).toEqual({
            compressedArr: [4, 4, 0, 0],
            score: 4,
            merged: [[3, 3]],
        });
    });

    it('should remain the same array if all tiles are empty', () => {
        const input = [0, 0, 0, 0];
        const rowIndex = 0;
        const reversed = false;
        expect(compressArray(input, rowIndex, reversed)).toEqual({
            compressedArr: [0, 0, 0, 0],
            score: 0,
            merged: [],
        });
    });

    it('should compress array with alternating merges', () => {
        const input = [2, 2, 4, 4];
        const rowIndex = 0;
        const reversed = false;
        expect(compressArray(input, rowIndex, reversed)).toEqual({
            compressedArr: [4, 8, 0, 0],
            score: 12,
            merged: [
                [0, 0],
                [0, 1],
            ],
        });
    });

    it('should compress array when only one merge occurs at the end', () => {
        const input = [4, 0, 2, 2];
        const rowIndex = 1;
        const reversed = false;
        expect(compressArray(input, rowIndex, reversed)).toEqual({
            compressedArr: [4, 4, 0, 0],
            score: 4,
            merged: [[1, 1]],
        });
    });

    it('should handle an array with non-merging values and empty spaces', () => {
        const input = [8, 4, 2, 0];
        const rowIndex = 2;
        const reversed = false;
        expect(compressArray(input, rowIndex, reversed)).toEqual({
            compressedArr: [8, 4, 2, 0],
            score: 0,
            merged: [],
        });
    });

    it('should compress array with merges when reversed is true', () => {
        const input = [2, 2, 4, 4];
        const rowIndex = 3;
        const reversed = true;
        expect(compressArray(input, rowIndex, reversed)).toEqual({
            compressedArr: [4, 8, 0, 0],
            score: 12,
            merged: [
                [3, 3],
                [3, 2],
            ],
        });
    });
});
