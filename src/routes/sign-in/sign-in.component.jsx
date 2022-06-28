import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const SignIn = () => {

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
        const userDocRef = await createUserDocumentFromAuth(response.user);      //response.user get the details/object from console.log(reponse)
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with google auth popup</button>
        </div>
    );
};

export default SignIn;