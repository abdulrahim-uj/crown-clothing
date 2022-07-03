import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDc_OpxaFAuGnICYOY1HbiwCve8fqnBiF8",
    authDomain: "crown-clothing-db-56822.firebaseapp.com",
    projectId: "crown-clothing-db-56822",
    storageBucket: "crown-clothing-db-56822.appspot.com",
    messagingSenderId: "32246036094",
    appId: "1:32246036094:web:921fcbaa164ee800950a2f",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => {
    return signInWithPopup(auth, googleProvider);
};

export const signInWithGoogleRedirect = () => {
    return signInWithRedirect(auth, googleProvider);
};

export const dbCon = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
) => {
    if (!userAuth) {
        return;
    }
    const userDocRef = doc(dbCon, "users", userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
    // if user data does not exist
    // create/setthe document with the data from userAuth in my collection
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log("error creating the user", error.message);
        }
    }
    // if user data exist
    // nothoing todo, just return the userAuth
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        return;
    }
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        return;
    }
    return await signInWithEmailAndPassword(auth, email, password);
};

// INTERFACE LAYER FUNCTION
export const signOutUser = async () => {
    return await signOut(auth);
};