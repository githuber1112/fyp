import { takeLatest, call, all, put } from 'redux-saga/effects';
import {auth, handleUserProfile, getCurrentUser, GoogleProvider} from './../../firebase/utils';
import userTypes from "./user.types";
import {signInSuccess, signOutUserSuccess, resetPasswordSuccess, userError, changePasswordSuccess, updateUserInfoSuccess} from './user.actions';
import {handleResetPasswordAPI,handleUpdateInfo} from './user.helper';

export function* getSnapshotFromUserAuth(user, additionalData={}){
    try{
                
        const userRef = yield call(handleUserProfile, { userAuth: user , additionalData});
        const snapshot = yield userRef.get();
        yield put(
                signInSuccess({           
                    id:snapshot.id,
                    ...snapshot.data()
               })
        );
         
      
              
    }catch(err){

    }
}

export function* updateUserAuth(user, additionalData={}){
    try{
                
        const userRef = yield call(handleUserProfile, { userAuth: user , additionalData});
        const snapshot = yield userRef.get();
        yield put(
                updateUserInfoSuccess({           
                    id:snapshot.id,
                    ...snapshot.data()
               })
        );
         
      
              
    }catch(err){

    }
}

export function* emailSignIn({ payload: {email, password} }){
    try{
            
            const {user} = yield auth.signInWithEmailAndPassword(email, password);
            yield getSnapshotFromUserAuth(user)
            
            
        
        }catch(err){
            yield put(
                userError([err.message])
                );
        }
}

export function* onEmailSignInStart(){
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* isUserAuthenticated() {
    try{
        const userAuth = yield getCurrentUser();
        yield getSnapshotFromUserAuth(userAuth);

    }catch(err){

    }
}

export function* onCheckUserSession() {
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOutUser(){
    try{
        yield auth.signOut();
        yield put(
            signOutUserSuccess()
        )
    }catch(err){
  
    }
}

export function* onSignOutUserStart(){
    yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* signUpUser({payload: {
    displayName,
    email,
    password,
    confirmPassword
}})
    {
    if (password !== confirmPassword){
        const err=['Confirm password does not match with the password!'];
        yield put(
            userError(err)
        );
        return;
    }

    try{
       const {user} = yield auth.createUserWithEmailAndPassword(email,password);
       const additionalData = {displayName};
       yield getSnapshotFromUserAuth(user, additionalData)
        user.sendEmailVerification();
        yield auth.signOut();
        yield put(
            signOutUserSuccess()
        )
     
    }catch(err){
        yield put(
            userError([err.message])
        );
    }
}

export function* onSignUpUserStart() {
    yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
}

export function* resetPassword({payload:{email}}){
    try{
        yield call(handleResetPasswordAPI, email);
        yield put (
            resetPasswordSuccess()
        );

        }catch(err){
              yield put(
                userError(err)
            );
        }
}

export function* onResetPasswordStart(){
    yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}

export function* googleSignIn(){

    try{
        const {user} = yield auth.signInWithPopup(GoogleProvider);
         yield getSnapshotFromUserAuth(user);
     }catch(err){
 
     }
}

export function* onGoogleSignInStart(){
    yield takeLatest(userTypes.GOOGLE_SIGN_IN_START,googleSignIn);
}

export function* updateUserInfo({payload}){
    console.log(payload)
    try{
    yield handleUpdateInfo(payload) 
    const userAuth = yield getCurrentUser();
        yield updateUserAuth(userAuth);
 
    }catch(err){
        console.log(err)
    }
}

export function* onUpdateUserInfoStart(){
    yield takeLatest(userTypes.UPDATE_USER_INFO_START, updateUserInfo);
}

// export function* changePassword({payload:{email}}){
//     try{
//         yield call(handleChangePasswordAPI, {email});
//         yield put (
//             changePasswordSuccess()
//         );

//         }catch(err){
//               yield put(
//                 userError(err)
//             );
//         }
// }

// export function* onChangePasswordStart(){
//     yield takeLatest(userTypes.CHANGE_PASSWORD_START, changePassword);
// }

export default function* userSagas(){
    yield all([
        call(onEmailSignInStart), 
        call(onCheckUserSession), 
        call(onSignOutUserStart),
        call(onSignUpUserStart),
        call(onResetPasswordStart),
        call(onGoogleSignInStart),
        call(onUpdateUserInfoStart),
        //call(onChangePasswordStart),
    ])
}

