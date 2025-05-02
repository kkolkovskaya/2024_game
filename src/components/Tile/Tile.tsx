import * as styles from './Tile.module.scss';
import { TileProps } from './Tile.interface';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { isEqual } from 'lodash';

const Tile = ({ tile, isNew, row, column }: TileProps) => {
    const mergedTiles = useSelector((state: RootState) => state.game.mergedTiles);

    const isMerged = () => {
        if (mergedTiles.length === 0) {
            return false;
        }

        for (let i = 0; i < mergedTiles.length; i++) {
            if (isEqual(mergedTiles[i], [row, column])) {
                return true;
            }
        }

        return false;
    };

    const tileClass = classNames({
        [styles.tile]: true,
        [styles.empty]: tile === 0,
        [styles.new]: isNew,
        [styles.merged]: isMerged(),
    });

    return (
        <div className={tileClass} data-value={tile}>
            {tile || ''}
        </div>
    );
};

export default Tile;
