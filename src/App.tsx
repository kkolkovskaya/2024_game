import GameBoard from './components/GameBoard/GameBoard';
import Header from './components/Header/Header';
import BottomPanel from './components/BottomPanel/BottomPanel';
import Modal from './components/UI/Modal/Modal';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import styles from './App.module.scss';
import { initGame } from './redux/gameSlice';

function App() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const dispatch = useDispatch();

    const handleConfirmAction = useCallback(() => {
        setIsModalOpen(false);
        dispatch(initGame());
    }, [dispatch]);

    return (
        <div className={styles.app}>
            <Header openModal={openModal} />
            <GameBoard />
            <BottomPanel />
            {isModalOpen && <Modal closeModal={closeModal} confirmAction={handleConfirmAction} />}
        </div>
    );
}

export default App;
