import { ButtonVariant } from '../../../entities/enums/button.enum';

export interface ButtonProps {
    text: string;
    disabled?: boolean;
    onClick?: () => void;
    variant?: ButtonVariant;
    className?: string;
}
