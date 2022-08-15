import { useState } from "react";
/*import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils"; REMOVED FOR USING REDUX-SAGA */
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";
// import { UserContext } from "../../contexts/user.context";

// SET DEFAULT VALUES ON COMPONENT DID MOUNT TIME
const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    conformPassword: "",
};

const SignUpForm = () => {
    const dispatch = useDispatch();
    // USING SET & USE STATE & TAKE DEFAULT VALUES TO FORMFIELDS
    const [formFields, setFormFields] = useState(defaultFormFields);
    // DEPRECATED VALUES FROM FORMFIELDS
    const { displayName, email, password, conformPassword } = formFields;

    // USING CONTEXT its using when user sign up to set the current user from the response
    // const { setCurrentUser } = useContext(UserContext);

    // ON CHANGE HANDLER TRIGGERING EVERY KEY PRESS ON INPUT FILEDS
    const onChangeHandler = (event) => {
        // const name = event.target.name;      // ASSIGN VALUES TO VARIALBE NAME IN DEFAULT PROCEDURE
        const { name, value } = event.target; //DEPRECATED VALUES FROM EVENT.TARGET
        // SET VALUES TO FORM FIELDS
        setFormFields({ ...formFields, [name]: value });
    };
    // FORM RESET AFTER FORM SUBMITION SUCCESS MESSAGE
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };
    // FORM SUBMIT HANDLER TO STORE DATA TO DB
    const onSubmitHandler = async (event) => {
        event.preventDefault(); //PREVENT BROWSER DEFAULTS
        // CHECK PASSWORD & CONFORM PASSWORD ARE SAME OR NOT
        if (password !== conformPassword) {
            alert("Your passwords does not match!");
            return;
        }

        try {
            // DEFAULT WAY...
            // const response = await createAuthUserWithEmailAndPassword(email, password);
            // DEPRECATED USER FROM RESPONSE
            /*
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );

            // set currentuser data
            // setCurrentUser(user);
            
            // PASSING RESPONSE.USER VALUES AND EXTRA CUSTOM VALUE 'DISPLAY NAME'
            await createUserDocumentFromAuth(user, { displayName });
            REMOVED FOR USING REDUX-SAGA
            */
            dispatch(signUpStart(displayName, email, password));
            alert("User succefully created");
            // CALLING RESET FORM FUNCTION
            resetFormFields();
        } catch (error) {
            // ERROR CODES FROM FIREBASE
            if (error.code === "auth/email-already-in-use") {
                alert("User not created, Email already in use!");
            } else if (error.code === "auth/weak-password") {
                alert(
                    "User not created, Password should be at least 6 characters"
                );
            } else {
                alert("User not created, " + error.message);
            }
        }
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <span>Sign Up with email and password</span>
            <form onSubmit={onSubmitHandler}>
                {/* FORMINPUT IS GENERALIZED FORM COMPONENT*/}
                <FormInput
                    label={"Display Name"}
                    type={"text"}
                    name="displayName"
                    required
                    value={displayName}
                    onChange={onChangeHandler}
                />
                <FormInput
                    label={"E-mail"}
                    type={"email"}
                    name="email"
                    required
                    value={email}
                    onChange={onChangeHandler}
                />
                <FormInput
                    label={"Password"}
                    type={"password"}
                    name="password"
                    required
                    value={password}
                    onChange={onChangeHandler}
                />
                <FormInput
                    label={"Confirm Password"}
                    type={"password"}
                    name="conformPassword"
                    required
                    value={conformPassword}
                    onChange={onChangeHandler}
                />
                {/*BUTTON IS GENERALIZED BUTTON COMPOENT THAT REUSE DIFFERENT STYLES
                    <Button type={"submit"}>Sign Up</Button>
                    <Button buttonType="inverted" type={"submit"}>Sign Up</Button>    
                */}
                <Button type={"submit"}>Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;
