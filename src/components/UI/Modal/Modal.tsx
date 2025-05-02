import { ButtonVariant } from '../../../entities/enums/button.enum';
import Backdrop from '../Backdrop/Backdrop';
import Button from '../Button/Button';
import { ModalProps } from './Modal.interface';
import { useCallback } from 'react';

import * as styles from './Modal.module.scss';

const Modal = ({ closeModal, confirmAction }: ModalProps) => {
    const handleContentClick = useCallback((event: React.MouseEvent) => {
        event.stopPropagation();
    }, []);

    return (
        <Backdrop closeModal={closeModal}>
            <div className={styles.container} onClick={handleContentClick}>
                <div className={styles.dialog}>
                    <div className={styles.title}>New Game</div>
                    <div className={styles.subtitle}>Are you sure want to start a new game?</div>
                    <div className={styles.subtitle}>All progress will be lost</div>
                </div>

                <Button text="Start New Game" className={styles.button} onClick={confirmAction} />
                <Button text="Cancel" variant={ButtonVariant.Outlined} className={styles.button} onClick={closeModal} />
            </div>
        </Backdrop>
    );
};

export default Modal;
