import classNames from 'classnames';
import { ButtonProps } from './Button.interface';

import * as styles from './Button.module.scss';
import { ButtonVariant } from '../../../entities/enums/button.enum';

const Button = ({ text, className, variant = ButtonVariant.Contained, onClick, disabled }: ButtonProps) => {
    const buttonClasses = classNames({
        [styles.button]: true,
        [className || '']: !!className,
        [styles.outlined]: variant === ButtonVariant.Outlined,
        [styles.disabled]: disabled,
    });

    return (
        <button className={buttonClasses} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
};

export default Button;
