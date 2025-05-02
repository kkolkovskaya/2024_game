import { render, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal Component', () => {
    it('should render component layout', () => {
        const closeModal = jest.fn();
        const confirmAction = jest.fn();
        const container = render(<Modal closeModal={closeModal} confirmAction={confirmAction} />);

        expect(container).toMatchSnapshot();
    });

    it('should prevent event propagation when clicking inside modal', () => {
        const closeModal = jest.fn();
        const confirmAction = jest.fn();

        const { container } = render(<Modal closeModal={closeModal} confirmAction={confirmAction} />);

        const modalContent = container.querySelector(`.container`);

        fireEvent.click(modalContent!);

        expect(closeModal).not.toHaveBeenCalled();
    });
});
