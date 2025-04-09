export interface GameState {
    board: number[][];
    score: number;
    gameOver: boolean;
    newTile: number[];
    mergedTiles: number[][];
}
