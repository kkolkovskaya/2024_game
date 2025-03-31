import { BackdropProps } from './Backdrop.interface';
import styles from './Backdrop.module.scss';

const Backdrop = ({ children, closeModal }: BackdropProps) => {
    return (
        <div className={styles.backdrop} onClick={closeModal}>
            {children}
        </div>
    );
};

export default Backdrop;
