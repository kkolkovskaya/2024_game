import styles from './Tile.module.scss';
import { TileProps } from './Tile.interface';
import classNames from 'classnames';

const Tile = ({ tile }: TileProps) => {
    const tileClass = classNames({
        [styles.tile]: true,
        [styles.empty]: tile === 0,
    });
    return (
        <div className={tileClass} data-value={tile}>
            {tile || ''}
        </div>
    );
};

export default Tile;
