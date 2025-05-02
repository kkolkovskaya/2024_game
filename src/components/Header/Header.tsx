import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';

import * as styles from './Header.module.scss';
import { HeaderProps } from './Header.interface';

const Header = ({ openModal }: HeaderProps) => {
    const score = useSelector((state: RootState) => state.game.score);
    const gameOver = useSelector((state: RootState) => state.game.gameOver);

    return (
        <header className={styles.header}>
            {gameOver ? (
                <div className={styles.gameOver}>
                    <div className={styles.goTitle}>Game Over</div>
                    <div className={styles.goSubtitle}>{score} points scored</div>
                </div>
            ) : (
                <>
                    <div className={styles.logo}>2048</div>
                    <Card title={'Score'} subtitle={score} />
                    <div>
                        <Button text={'New Game'} onClick={openModal} />
                    </div>
                </>
            )}
        </header>
    );
};

export default Header;
