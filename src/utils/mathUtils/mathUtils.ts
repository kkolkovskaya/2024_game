export const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
};

export const moveZerosWithIndices = (arr: [number, number, number][]): [number, number, number][] => {
    const nonZeroElements = arr.filter(([value]) => value !== 0);

    const updatedNonZeroElements = nonZeroElements.map(([value, originalIndex], newIndex) => [value, originalIndex, newIndex]);

    const zeroElements = Array(arr.length - updatedNonZeroElements.length).fill([0, -1, -1]);

    return [...updatedNonZeroElements, ...zeroElements];
};

export const transposeMatrix = (matrix: number[][]): number[][] => {
    if (matrix.length === 0) {
        return [];
    }
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
};
