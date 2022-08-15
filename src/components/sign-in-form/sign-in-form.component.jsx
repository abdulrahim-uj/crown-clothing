import { useState } from "react";
import { useDispatch } from "react-redux";
import {
    //signInWithGooglePopup,    //REMOVED FOR USING REDUX-SAGA
    signInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import { googleSignInStart } from "../../store/user/user.action";

// SET DEFAULT VALUES ON COMPONENT DID MOUNT TIME
const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const dispatch = useDispatch();
    // USING SET & USE STATE & TAKE DEFAULT VALUES TO FORMFIELDS
    const [formFields, setFormFields] = useState(defaultFormFields);
    // DEPRECATED VALUES FROM FORMFIELDS
    const { email, password } = formFields;

    // ON CHANGE HANDLER TRIGGERING EVERY KEY PRESS ON INPUT FILEDS
    const onChangeHandler = (event) => {
        // const name = event.target.name;      // ASSIGN VALUES TO VARIALBE NAME IN DEFAULT PROCEDURE
        const { name, value } = event.target;   //DEPRECATED VALUES FROM EVENT.TARGET
        // SET VALUES TO FORM FIELDS
        setFormFields({ ...formFields, [name]: value });
    };
    // SIGN IN WITH GOOGLE ON CLICK BUTTON
    const signInWithGoogle = async () => {
        // await signInWithGooglePopup();   // REMOVED FOR USING REDUX-SAGA
        dispatch(googleSignInStart())
    };

    // FORM RESET AFTER FORM SUBMITION SUCCESS MESSAGE
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };
    // FORM SUBMIT HANDLER TO STORE DATA TO DB
    const onSubmitHandler = async (event) => {
        event.preventDefault();     //PREVENT BROWSER DEFAULTS

        try {
            const response = await signInUserWithEmailAndPassword(email, password);

            alert('Successfully login');
            // CALLING RESET FORM FUNCTION
            resetFormFields();
        } catch (error) {
            // ERROR CODES FROM FIREBASE USING SWITCH CASE
            switch (error.code) {
                case 'auth/user-not-found':
                    alert('User not found');
                    break;
                case 'auth/wrong-password':
                    alert('Incorrect password');
                    break;

                default:
                    break;
            }
        }
    };

    return (
        <div className="sign-in-container">
            <h2>Already have an account</h2>
            <span>Sign In with email and password</span>
            <form onSubmit={onSubmitHandler}>
                {/* FORMINPUT IS GENERALIZED FORM COMPONENT*/}
                <FormInput
                    label={'E-mail'}
                    type={"email"}
                    name="email"
                    required
                    value={email}
                    onChange={onChangeHandler}
                />
                <FormInput
                    label={'Password'}
                    type={"password"}
                    name="password"
                    required
                    value={password}
                    onChange={onChangeHandler}
                />
                <div className="buttons-container">
                    {/*BUTTON IS GENERALIZED BUTTON COMPOENT THAT REUSE DIFFERENT STYLES
                        <Button type={"submit"}>Sign Up</Button>
                        <Button buttonType="inverted" type={"submit"}>Sign Up</Button>    
                    */}
                    <Button type={"submit"}>Sign In</Button>
                    <Button type={"button"} buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
