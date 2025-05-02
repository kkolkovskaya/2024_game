import Header from './Header';
import { useSelector } from 'react-redux';
import { customRender, reduxWrapper } from '../../utils/test-utils';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
}));
describe('Header', () => {
    it('should render correct component layout when gameOver is false', () => {
        (useSelector as unknown as jest.Mock).mockImplementation((selector) => {
            return selector({
                game: {
                    score: 100,
                    gameOver: false,
                },
            });
        });
        const { container } = customRender(<Header openModal={jest.fn()} />, reduxWrapper);

        expect(container).toMatchSnapshot();
    });

    it('should render correct component layout when gameOver is true', () => {
        (useSelector as unknown as jest.Mock).mockImplementation((selector) => {
            return selector({
                game: {
                    score: 100,
                    gameOver: true,
                },
            });
        });
        const { container } = customRender(<Header openModal={jest.fn()} />, reduxWrapper);

        expect(container).toMatchSnapshot();
    });
});
