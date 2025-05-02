import type { RootState, AppDispatch } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback, useMemo, useRef } from 'react';
import { EventKey } from '../../entities/enums/eventKey.enum';
import Tile from '../Tile/Tile';
import { initGame, move, addTile, mockGameOver } from '../../redux/gameSlice/gameSlice';
import { addToHistory } from '../../redux/historySlice/historySlice';

import * as styles from './GameBoard.module.scss';

const GameBoard = () => {
    const board = useSelector((state: RootState) => state.game.board);
    const score = useSelector((state: RootState) => state.game.score);
    const gameOver = useSelector((state: RootState) => state.game.gameOver);
    const newTile = useSelector((state: RootState) => state.game.newTile);

    const dispatch: AppDispatch = useDispatch();

    const isFirstRender = useRef(true);

    useEffect(() => {
        dispatch(initGame());
    }, [dispatch]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            dispatch((dispatch, getState) => {
                const { board: updatedBoard, score: updatedScore } = getState().game;
                dispatch(addToHistory({ board: updatedBoard, score: updatedScore }));
            });
        }
    }, [board, dispatch, score]);

    const actions: Record<string, () => void> = useMemo(
        () => ({
            [EventKey.Up]: () => dispatch(move(EventKey.Up)),
            [EventKey.Down]: () => dispatch(move(EventKey.Down)),
            [EventKey.Left]: () => dispatch(move(EventKey.Left)),
            [EventKey.Right]: () => dispatch(move(EventKey.Right)),
        }),
        [dispatch],
    );

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (actions[event.key] && !gameOver) {
                event.preventDefault();
                actions[event.key]();
                dispatch(addToHistory({ board, score }));
                dispatch(addTile());
            }

            // TODO: Remove this
            if (event.key === 'g') {
                dispatch((dispatch, getState) => {
                    dispatch(mockGameOver());

                    const { board: updatedBoard, score: updatedScore } = getState().game;
                    dispatch(addToHistory({ board: updatedBoard, score: updatedScore }));
                });
            }
        },
        [actions, dispatch, board, score, gameOver],
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className={styles.board}>
            {board.map((row, rowIndex) =>
                row.map((tile, colIndex) => (
                    <Tile
                        key={`tile-${rowIndex}-${colIndex}`}
                        tile={tile}
                        isNew={newTile ? rowIndex === newTile[0] && colIndex === newTile[1] : false}
                        row={rowIndex}
                        column={colIndex}
                    />
                )),
            )}
        </div>
    );
};

export default GameBoard;
