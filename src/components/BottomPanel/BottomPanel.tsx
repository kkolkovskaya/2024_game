import { ButtonVariant } from '../../entities/enums/button.enum';
import Button from '../UI/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux/store';
import { initGame, updateGameState } from '../../redux/gameSlice/gameSlice';
import { undo, addToHistory, clearHistory } from '../../redux/historySlice';

import styles from './BottomPanel.module.scss';
import { useCallback } from 'react';

const BottomPanel = () => {
    const gameOver = useSelector((state: RootState) => state.game.gameOver);
    const history = useSelector((state: RootState) => state.history.history);
    const dispatch: AppDispatch = useDispatch();

    const handleStartGame = useCallback(() => {
        dispatch(initGame());
        dispatch(clearHistory());
        dispatch((dispatch, getState) => {
            const { board: updatedBoard, score: updatedScore } = getState().game;
            dispatch(addToHistory({ board: updatedBoard, score: updatedScore }));
        });
    }, [dispatch]);

    const handleUndo = useCallback(() => {
        if (history.length > 1) {
            dispatch(undo());
            const lastState = history[history.length - 2];
            dispatch(updateGameState({ lastState, checkGameOver: gameOver }));
        }
    }, [dispatch, history, gameOver]);

    return (
        <div className={styles.container}>
            {gameOver && <Button text="Play Again" className={styles.button} variant={ButtonVariant.Outlined} onClick={handleStartGame} />}
            <Button text="Undo" className={styles.button} onClick={handleUndo} disabled={history.length <= 1} />
        </div>
    );
};

export default BottomPanel;
