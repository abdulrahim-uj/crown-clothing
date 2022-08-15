import { takeLatest, all, call, put } from 'redux-saga/effects'

import USER_ACTION_TYPES from './user.types'
import { signInSuccess, signInFailed } from './user.action'
import { getCurrentUser, createUserDocumentFromAuth, signInWithGooglePopup } from '../../utils/firebase/firebase.utils'

export function* getSnapshotFromUserAuthGenFuncSaga(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails)
        console.log('user.saga.js: getSnapshotFromUserAuthGenFuncSaga: userSnapshot: ', userSnapshot);
        console.log('user.saga.js: getSnapshotFromUserAuthGenFuncSaga: userSnapshot.data(): ', userSnapshot.data());
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    } catch (error) {
        yield put(signInFailed(error))
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup)
        yield call(getSnapshotFromUserAuthGenFuncSaga, user)
    } catch (error) {
        yield put(signInFailed(error))
    }
}

export function* isUserAuthenticatedGenFuncSaga() {
    try {
        const userAuth = yield call(getCurrentUser)
        if (!userAuth) {
            return;
        }
        yield call(getSnapshotFromUserAuthGenFuncSaga, userAuth)
    } catch (error) {
        yield put(signInFailed(error))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onCheckUserSessionGenFuncSaga() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticatedGenFuncSaga)
}

export function* userGeneratorFuncSaga() {
    yield all([call(onCheckUserSessionGenFuncSaga), call(onGoogleSignInStart)]);
}