import { STATEMENT_OR_BLOCK_KEYS } from "@babel/types";
import { resetPassword } from "./user.actions";
import userTypes from "./user.types";

const INITIAL_STATE = {
  loading: false,
  currentUser: null,
  resetPasswordSuccess: false,
  userErr: [],
};

const userReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        
        case userTypes.SIGN_IN_SUCCESS:
            return{
                ...state,
                currentUser: action.payload,
                userErr: []
            }
        case userTypes.USER_ERROR:
            return{
                ...state,
                userErr: action.payload
            }   
        case userTypes.RESET_PASSWORD_SUCCESS:
            return{
                ...state,
                resetPasswordSuccess:action.payload
            }
        case userTypes.RESET_ERROR:
            return{
                ...state,
                userErr:[]
            }
        case userTypes.RESET_USER_STATE:
        case userTypes.SIGN_OUT_USER_SUCCESS:
            return{
                 ...state,
                 ...INITIAL_STATE
             }            
        default:
            return state;
    }
};

export default userReducer;
