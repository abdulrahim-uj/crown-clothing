import { takeLatest, all, call, put } from "redux-saga/effects";

import USER_ACTION_TYPES from "./user.types";
import { signInSuccess, signInFailed, signUpFailed, signUpSuccess } from "./user.action";
import {
    getCurrentUser,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

/* ******************************************* SAGA BASED EFFECT GENERATORS *********************************************** */

export function* getSnapshotFromUserAuthGenFuncSaga(
    userAuth,
    additionalDetails
) {
    try {
        const userSnapshot = yield call(
            createUserDocumentFromAuth,
            userAuth,
            additionalDetails
        );
        console.log(
            "user.saga.js: getSnapshotFromUserAuthGenFuncSaga: userSnapshot: ",
            userSnapshot
        );
        console.log(
            "user.saga.js: getSnapshotFromUserAuthGenFuncSaga: userSnapshot.data(): ",
            userSnapshot.data()
        );
        yield put(
            signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
        );
    } catch (error) {
        yield put(signInFailed(error));
    }
}

/* ************************************************** GENERATOR ********************************************************* */

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
    yield call(getSnapshotFromUserAuthGenFuncSaga, user, additionalDetails)
}

export function* signUp({ payload: { displayName, email, password } }) {
    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put(signUpSuccess(user, { displayName }))
    } catch (error) {
        yield put(signUpFailed(error));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield call(
            signInUserWithEmailAndPassword,
            email,
            password
        );
        yield call(getSnapshotFromUserAuthGenFuncSaga, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuthGenFuncSaga, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* isUserAuthenticatedGenFuncSaga() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) {
            return;
        }
        yield call(getSnapshotFromUserAuthGenFuncSaga, userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

/* ************************************************* ENTRY POINT SAGA **************************************************** */

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSessionGenFuncSaga() {
    yield takeLatest(
        USER_ACTION_TYPES.CHECK_USER_SESSION,
        isUserAuthenticatedGenFuncSaga
    );
}

export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

/* *********************************************** APPROPRIATE SAGA PROFILE ********************************************* */

export function* userGeneratorFuncSaga() {
    yield all([
        call(onCheckUserSessionGenFuncSaga),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
    ]);
}
