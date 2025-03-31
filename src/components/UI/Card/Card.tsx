import { CardProps } from './Card.interface';

import styles from './Card.module.scss';

const Card = ({ title, subtitle }: CardProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>{title}</div>
            <div className={styles.subtitle}>{subtitle}</div>
        </div>
    );
};

export default Card;
