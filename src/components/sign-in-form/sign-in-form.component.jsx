import { useState, useContext } from "react";
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";
import { UserContext } from "../../contexts/user.context";

// SET DEFAULT VALUES ON COMPONENT DID MOUNT TIME
const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {
    // USING SET & USE STATE & TAKE DEFAULT VALUES TO FORMFIELDS
    const [formFields, setFormFields] = useState(defaultFormFields);
    // DEPRECATED VALUES FROM FORMFIELDS
    const { email, password } = formFields;

    // USING CONTEXT its using when user sign in to set the current user from the response
    const { setCurrentUser } = useContext(UserContext);

    // ON CHANGE HANDLER TRIGGERING EVERY KEY PRESS ON INPUT FILEDS
    const onChangeHandler = (event) => {
        // const name = event.target.name;      // ASSIGN VALUES TO VARIALBE NAME IN DEFAULT PROCEDURE
        const { name, value } = event.target;   //DEPRECATED VALUES FROM EVENT.TARGET
        // SET VALUES TO FORM FIELDS
        setFormFields({ ...formFields, [name]: value });
    };
    // SIGN IN WITH GOOGLE ON CLICK BUTTON
    const signInWithGoogle = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
        
        // SET CURRENT USER FROM RESPONSE.USER WHILE AUTHENTICATED
        setCurrentUser(response.user);

        await createUserDocumentFromAuth(response.user);
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
            console.log('signinsuccess: : : ', response);
            
            // SET CURRENT USER FROM RESPONSE.USER WHILE AUTHENTICATED
            setCurrentUser(response.user);

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
                    console.log(error);
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
                    <Button type={"button"} buttonType={"google"} onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
