import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import gameReducer from '../redux/gameSlice/gameSlice';
import historyReducer from '../redux/historySlice/historySlice';

const store = configureStore({
    reducer: {
        game: gameReducer,
        history: historyReducer,
    },
});

export const reduxWrapper = ({ children }: { children: ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
};

export const customRender = (ui: ReactNode, wrapper: React.FC<{ children: ReactNode }>) => {
    return render(ui, { wrapper });
};
