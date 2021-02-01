import * as actionType from './actionTypes';
import axios from 'axios';

export const authStart=()=>{
    return{
        type:actionType.AUTH_START
    }
}

export const authSuccess=(token,userId)=>{
    return{
        type:actionType.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
}

export const authFail=(error)=>{
    return{
        type:actionType.AUTH_FAIL,
        error:error
    }
}

export const loggout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{
        type:actionType.AUTH_LOGGOUT
    }

}
export const checkTimeOut=(expirationTime)=>{
    return dispatch=>{

        setTimeout(
            ()=>{
                dispatch(loggout());
            }
            ,expirationTime * 1000);

    }
}

export const auth=(email,password,isSignUp)=>{
    return dispatch=>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }

        let url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCtPcVzlqA2cnqudmktg7PrEL1i538eax8";
        if(!isSignUp){
            url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCtPcVzlqA2cnqudmktg7PrEL1i538eax8";
        }

        axios.post(url,authData).then(
            response =>{
              
               const expirationDate= new Date(new Date().getTime() + response.data.expiresIn * 1000);
               localStorage.setItem('token',response.data.idToken);
               localStorage.setItem('expirationDate',expirationDate);
               localStorage.setItem('userId',response.data.localId);
               dispatch(authSuccess(response.data.idToken,response.data.localId));
               dispatch(checkTimeOut(response.data.expiresIn));
            }
        ).catch(err=>{
            
            dispatch(authFail(err.response.data.error));
        });
        
    }
}

export const setAuthRedirectPath=(path)=>{
    return{
        type:actionType.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authCheckState=()=>{
    return dispatch=>{
        const token=localStorage.getItem('token');
        if(!token){
            dispatch(loggout());
        }
        else{
            const expirationDate=new Date(localStorage.getItem("expirationDate"));
            if(expirationDate<=new Date()){
                dispatch(loggout());

            }
            else{
                const getUserId=localStorage.getItem('userId');
                dispatch(authSuccess(token,getUserId));
                dispatch(checkTimeOut(   ( expirationDate.getTime()-new Date().getTime() ) /1000 ))

            }
            
        }

        }

    
}