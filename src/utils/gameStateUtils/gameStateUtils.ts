export const hasEmptyCells = (board: number[][]): boolean => {
    for (const row of board) {
        if (row.includes(0)) {
            return true;
        }
    }
    return false;
};

export const isGameOver = (board: number[][]): boolean => {
    if (!hasEmptyCells(board)) {
        return false;
    }
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (j < board[i].length - 1 && board[i][j] === board[i][j + 1]) {
                return false;
            }
            if (i < board.length - 1 && board[i][j] === board[i + 1][j]) {
                return false;
            }
        }
    }
    return true;
};
