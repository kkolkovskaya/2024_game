import { moveZerosWithIndices, transposeMatrix } from '../mathUtils/mathUtils';

export const compressArray = (
    arr: number[],
    rowIndex: number,
    reversed = false,
): { compressedArr: number[]; score: number; merged: number[][] } => {
    let score = 0;

    const arrWithIndices = arr.map((value, index) => [value, index, index] as [number, number, number]);
    const processedArrWithIndices = moveZerosWithIndices(arrWithIndices);

    const mergedIndices: number[] = [];
    for (let i = 0; i < processedArrWithIndices.length - 1; i++) {
        const [currentValue, originalIndex] = processedArrWithIndices[i];
        const [nextValue] = processedArrWithIndices[i + 1];

        if (currentValue !== 0 && currentValue === nextValue) {
            processedArrWithIndices[i][0] = currentValue * 2;
            processedArrWithIndices[i + 1][0] = 0;
            score += currentValue * 2;

            mergedIndices.push(originalIndex);
        }
    }

    const finalArrWithIndices = moveZerosWithIndices(processedArrWithIndices);
    const compressedArr = finalArrWithIndices.map(([value]) => value);

    const merged = mergedIndices.map((originalIndex) => {
        const newIndex = finalArrWithIndices.find(([, origIdx]) => origIdx === originalIndex)?.[2] ?? -1;
        return [rowIndex, reversed ? arr.length - 1 - newIndex : newIndex];
    });

    return { compressedArr, score, merged };
};

export const processRow = (
    row: number[],
    rowIndex: number,
    state: { score: number; mergedTiles: number[][] },
    reversed = false,
    vertical = false,
): number[] => {
    const { compressedArr, score, merged } = compressArray(row, rowIndex, reversed);
    state.score += score;

    const correctedMerged = merged.map(([r, c]) => [c, r]);

    if (vertical) {
        state.mergedTiles.push(...correctedMerged);
    } else {
        state.mergedTiles.push(...merged);
    }

    return compressedArr;
};

export const processColumns = (board: number[][], callback: (col: number[], colIndex: number) => number[]): number[][] => {
    const transposed = transposeMatrix(board);
    const processed = transposed.map((col, colIndex) => callback(col, colIndex));
    return transposeMatrix(processed);
};
