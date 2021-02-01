import * as actionTypes from '../actions/actionTypes';
import { setAuthRedirectPath } from '../actions/Auth';
import {updateObject} from '../../shared/utility';
const initialState={
    token:null,
    userId:null,
    loading:false,
    error:null,
    authRedirectPath:'/'
    
}

const authStart=(state,action)=>{

    return updateObject(state,{error:null,loading:true});
    
}

const authSuccess=(state,action)=>{
    return updateObject(state,{error:null,token:action.idToken,userId:action.userId,loading:false});
}

const authFail=(state,action)=>{
    return updateObject(state,{error:action.error,loading:false});
}

const authLoggout=(state,action)=>{
    return updateObject(state,{token:null,userId:null})

}

const setAuthRedirect=(state,action)=>{
    return updateObject(state,{authRedirectPath:action.path})
}

const reducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.AUTH_START:return authStart(state,action);
         
        case actionTypes.AUTH_SUCCESS:return authSuccess(state,action);

        case actionTypes.AUTH_FAIL:return authFail(state,action);

        case actionTypes.AUTH_LOGGOUT:return authLoggout(state,action);

        case actionTypes.SET_AUTH_REDIRECT_PATH:return setAuthRedirect(state,action);
    
        default:
            return state;
    }
}

export default reducer;