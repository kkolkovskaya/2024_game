import Tile from './Tile';
import { customRender, reduxWrapper } from '../../utils/test-utils';
import { TileProps } from './Tile.interface';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
}));

describe('Tile Component', () => {
    const defaultProps: TileProps = {
        tile: 2,
        isNew: false,
        row: 0,
        column: 1,
    };

    beforeEach(() => {
        (useSelector as unknown as jest.Mock).mockImplementation((selector) => {
            return selector({
                game: {
                    mergedTiles: [[]],
                },
            });
        });
    });

    it('should render the tile with correct value', () => {
        const { container } = customRender(<Tile {...defaultProps} />, reduxWrapper);
        const tile = container.querySelector('.tile');
        expect(tile?.innerHTML).toEqual('2');
        expect(tile?.classList.contains('new')).toBe(false);
        expect(tile?.classList.contains('merged')).toBe(false);
        expect(tile?.classList.contains('empty')).toBe(false);
    });

    it('should apply the correct class when the tile is new', () => {
        const { container } = customRender(<Tile {...defaultProps} isNew={true} />, reduxWrapper);
        const tile = container.querySelector('.tile');
        expect(tile?.classList.contains('new')).toBe(true);
        expect(tile?.classList.contains('merged')).toBe(false);
        expect(tile?.classList.contains('empty')).toBe(false);
    });

    it('should apply the correct class when the tile is empty', () => {
        const { container } = customRender(<Tile {...defaultProps} tile={0} />, reduxWrapper);
        const tile = container.querySelector('.tile');
        expect(tile?.innerHTML).toEqual('');
        expect(tile?.classList.contains('new')).toBe(false);
        expect(tile?.classList.contains('merged')).toBe(false);
        expect(tile?.classList.contains('empty')).toBe(true);
    });

    it('should apply the correct class when the tile is merged', () => {
        (useSelector as unknown as jest.Mock).mockImplementation((selector) => {
            return selector({
                game: {
                    mergedTiles: [[0, 1]],
                },
            });
        });
        const { container } = customRender(<Tile {...defaultProps} tile={4} />, reduxWrapper);
        const tile = container.querySelector('.tile');
        expect(tile?.innerHTML).toEqual('4');
        expect(tile?.classList.contains('new')).toBe(false);
        expect(tile?.classList.contains('merged')).toBe(true);
        expect(tile?.classList.contains('empty')).toBe(false);
    });

    it('should apply the correct class when mergedTiles is empty', () => {
        (useSelector as unknown as jest.Mock).mockImplementation((selector) => {
            return selector({
                game: {
                    mergedTiles: [],
                },
            });
        });
        const { container } = customRender(<Tile {...defaultProps} tile={4} />, reduxWrapper);
        const tile = container.querySelector('.tile');
        expect(tile?.innerHTML).toEqual('4');
        expect(tile?.classList.contains('new')).toBe(false);
        expect(tile?.classList.contains('merged')).toBe(false);
        expect(tile?.classList.contains('empty')).toBe(false);
    });
});
