import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query, 
    getDocs,
} from "firebase/firestore";

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

// upload SHOP_DATA "shop-data.js" to firebase database firestore using collection, writeBatch methods from firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(dbCon, collectionKey);
    const batch = writeBatch(dbCon);
    objectsToAdd.forEach((object) => {
        // object: Hats,Shirts, Womens, Mens, boys, ... 
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    await batch.commit();
    alert('Data saved done...');
};

// GET CATEGORIES AND DOCUMENTS FROM FIRESTORE DATABSE SUPPORT OF query & getDocs
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(dbCon, 'categories');
    // query method
    const query_1 = query(collectionRef);
    // using snapshot
    const querySnapshot = await getDocs(query_1);
    const categoryMap = querySnapshot.docs.reduce((accumilator, docSnapshot) => {
        /*
        {
            hats: {
                title: "Hats",
                items: [
                    {
                        id: 1,
                        name: "Brown Brim",
                        imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
                        price: 25,
                    },
                    {...}...
                ] 
            },
            sneakers: {
                title: "Sneakers",
                items: [
                    {
                        id: 1,
                        name: "Brown Brim",
                        imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
                        price: 25,
                    },
                    {...}...
                ] 
            },
        */
        // De structure the items
        const { title, items } = docSnapshot.data();
        accumilator[title.toLowerCase()] = items;
        return accumilator;
    }, {});
    return categoryMap;
};

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

export const onAuthStateChangedListner = (callback) => {
    return onAuthStateChanged(auth, callback);
};
