import { customRender, reduxWrapper } from './utils/test-utils';
import App from './App';
import userEvent from '@testing-library/user-event';
import { useDispatch } from 'react-redux';

jest.mock('./components/GameBoard/GameBoard', () => ({
    __esModule: true,
    default: () => <div data-testid="gameBoard">GameBoard</div>,
}));

jest.mock('./components/UI/Modal/Modal', () => ({
    __esModule: true,
    default: ({ closeModal, confirmAction }: { closeModal: () => void; confirmAction: () => void }) => (
        <div data-testid="mock-modal">
            <button onClick={closeModal}>Close</button>
            <button onClick={confirmAction}>Confirm</button>
        </div>
    ),
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));

describe('App', () => {
    it('should render correct component layout', () => {
        const { container } = customRender(<App />, reduxWrapper);

        expect(container).toMatchSnapshot();
    });

    it('should open modal when Header triggers openModal', async () => {
        const { getByText, getByTestId } = customRender(<App />, reduxWrapper);

        const openButton = getByText(/new game/i);
        await userEvent.click(openButton);

        expect(getByTestId('mock-modal')).toBeInTheDocument();
    });

    it('should close modal when Close button is clicked', async () => {
        const { getByText, queryByTestId, getByTestId } = customRender(<App />, reduxWrapper);

        const openButton = getByText(/new game/i);
        await userEvent.click(openButton);
        expect(getByTestId('mock-modal')).toBeInTheDocument();

        const closeButton = getByText(/close/i);
        await userEvent.click(closeButton);

        expect(queryByTestId('mock-modal')).not.toBeInTheDocument();
    });

    it('should dispatch initGame when Confirm button is clicked', async () => {
        const mockDispatch = jest.fn();
        (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
        const { getByText } = customRender(<App />, reduxWrapper);

        const openButton = getByText(/new game/i);
        await userEvent.click(openButton);

        const confirmButton = getByText(/confirm/i);
        await userEvent.click(confirmButton);

        expect(mockDispatch).toHaveBeenCalled();
    });
});
