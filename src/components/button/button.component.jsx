import './button.styles.scss';

/*
3 different buttons
1. default button

2. inverted button

3. google sign-in button

*/
// if we pass buttonType="inverted" it will take inverted css design
const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
}

// children will get button name eg: <button>Sign Up</button> so, children value is 'Sign Up'
const Button = ({children, buttonType, ...otherProps}) => {
    return (
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>{children}</button>
    );
};

export default Button;