import { customRender, reduxWrapper } from '../../utils/test-utils';
import GameBoard from './GameBoard';
import { useSelector, useDispatch } from 'react-redux';
import { initGame } from '../../redux/gameSlice/gameSlice';
import { addToHistory } from '../../redux/historySlice/historySlice';
import userEvent from '@testing-library/user-event';
import { EventKey } from '../../entities/enums/eventKey.enum';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

describe('GameBoard', () => {
    const mockDispatch = jest.fn();
    beforeEach(() => {
        (useSelector as unknown as jest.Mock).mockImplementation((selector) => {
            return selector({
                game: {
                    score: 0,
                    board: [
                        [2, 0, 2, 4],
                        [0, 4, 0, 8],
                        [2, 8, 2, 0],
                        [4, 0, 4, 2],
                    ],
                    gameOver: false,
                    newTile: [],
                    mergedTiles: [],
                },
            });
        });

        (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render correct component layout', () => {
        const { container } = customRender(<GameBoard />, reduxWrapper);
        expect(container).toMatchSnapshot();
    });

    it('should dispatch initGame on mount', () => {
        customRender(<GameBoard />, reduxWrapper);

        expect(mockDispatch).toHaveBeenCalledWith(initGame());
    });

    it('should update history on first render', () => {
        mockDispatch.mockImplementation((action) => {
            if (typeof action === 'function') {
                action(mockDispatch, () => ({
                    game: {
                        board: [
                            [2, 0, 2, 4],
                            [0, 4, 0, 8],
                            [2, 8, 2, 0],
                            [4, 0, 4, 2],
                        ],
                        score: 100,
                        gameOver: false,
                    },
                }));
            }
        });

        customRender(<GameBoard />, reduxWrapper);

        expect(mockDispatch).toHaveBeenCalledWith(addToHistory({ board: expect.any(Array), score: expect.any(Number) }));
    });

    it('should dispatch move action on keydown', async () => {
        customRender(<GameBoard />, reduxWrapper);

        await userEvent.keyboard('{ArrowUp}');
        expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'game/move', payload: EventKey.Up }));

        await userEvent.keyboard('{ArrowDown}');
        expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'game/move', payload: EventKey.Down }));

        await userEvent.keyboard('{ArrowLeft}');
        expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'game/move', payload: EventKey.Left }));

        await userEvent.keyboard('{ArrowRight}');
        expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'game/move', payload: EventKey.Right }));
    });
});
