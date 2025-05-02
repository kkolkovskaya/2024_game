import { render } from '@testing-library/react';
import Card from './Card';

describe('Card Component', () => {
    it('should render component layout', () => {
        const container = render(<Card title="Title" subtitle="Subtitle" />);

        expect(container).toMatchSnapshot();
    });
});
