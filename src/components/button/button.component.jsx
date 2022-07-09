import { BaseButton, GoogleSignInButton, InvertedButton } from './button.styles';

/*
3 different buttons
1. default button

2. inverted button

3. google sign-in button

*/
// if we pass buttonType="inverted" it will take inverted css design
export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted',
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
}[buttonType]);

// children will get button name eg: <button>Sign Up</button> so, children value is 'Sign Up'
const Button = ({children, buttonType, ...otherProps}) => {
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton {...otherProps}>{children}</CustomButton>
    );
};

export default Button;