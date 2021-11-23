import userTypes from "./user.types";

export const emailSignInStart = (userCredentials) => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials,
});

export const signInSuccess = (user) => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const checkUserSession = () => ({
  type: userTypes.CHECK_USER_SESSION,
});

export const signOutUserStart = () => ({
  type: userTypes.SIGN_OUT_USER_START,
});

export const signOutUserSuccess = () => ({
  type: userTypes.SIGN_OUT_USER_SUCCESS,
});

export const signUpUserStart = (userCredentials) => ({
  type: userTypes.SIGN_UP_USER_START,
  payload: userCredentials,
});

export const userError = (err) => ({
  type: userTypes.USER_ERROR,
  payload: err,
});

export const resetPasswordStart = (userCredentials) => ({
  type: userTypes.RESET_PASSWORD_START,
  payload: userCredentials,
});

export const resetPasswordSuccess = () => ({
  type: userTypes.RESET_PASSWORD_SUCCESS,
  payload: true,
});

export const resetUserState = () => ({
  type: userTypes.RESET_USER_STATE,
});

export const resetError = () => ({
  type: userTypes.RESET_ERROR,
});

export const googleSignInStart = () => ({
  type: userTypes.GOOGLE_SIGN_IN_START,
});

export const updateUserInfoStart = (updateInformation) => ({
  type: userTypes.UPDATE_USER_INFO_START,
  payload: updateInformation,
});

export const updateUserInfoSuccess = (user) => ({
  type: userTypes.UPDATE_USER_INFO_SUCCESS,
  payload: user,
});

export const deleteUserStart = () => ({
  type: userTypes.DELETE_USER_START,
});

export const deleteUserSuccess = (user) => ({
  type: userTypes.DELETE_USER_SUCCESS,
  payload: user,
});

export const resetStatus = () => ({
  type: userTypes.RESET_STATUS,
});
