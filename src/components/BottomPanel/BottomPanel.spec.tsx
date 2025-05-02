import { customRender, reduxWrapper } from '../../utils/test-utils';
import BottomPanel from './BottomPanel';
import { useSelector, useDispatch } from 'react-redux';
import { fireEvent } from '@testing-library/dom';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

describe('BottomPanel', () => {
    const mockDispatch = jest.fn();

    let store = {
        game: {
            gameOver: false,
        },
        history: {
            history: [],
        },
    };

    beforeEach(() => {
        (useSelector as unknown as jest.Mock).mockImplementation((selector) => {
            return selector(store);
        });

        (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    });

    it('should not render Play Again button if the game is not over', () => {
        const { container, queryByText } = customRender(<BottomPanel />, reduxWrapper);

        expect(queryByText(/play again/i)).not.toBeInTheDocument();

        expect(container).toMatchSnapshot();
    });

    it('should render Play Again button if game is over and trigger handleStartGame', () => {
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

        store = { ...store, game: { gameOver: true } };
        const { getByText } = customRender(<BottomPanel />, reduxWrapper);

        const playAgainBtn = getByText(/play again/i);

        expect(playAgainBtn).toBeInTheDocument();

        fireEvent.click(playAgainBtn);
    });

    it('should render disabled Undo button if history length <= 1', () => {
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

        store = { ...store, game: { gameOver: true } };
        const { getByText } = customRender(<BottomPanel />, reduxWrapper);

        const undoBtn = getByText(/undo/i);

        expect(undoBtn).toHaveAttribute('disabled');
    });
});
