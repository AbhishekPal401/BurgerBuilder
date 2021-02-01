import * as actionTypes from './actionTypes';
import axios from '../../axios-Orders';

export const purchaseBurgerSuccess =(id,orderData)=>{
    return{
        type:actionTypes.PURCHASEE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseBurgerFail=(error)=>{
    return{
        type:actionTypes.PURCHASEE_BURGER_FAIL,
        error:error
    }
}

export const purchaseBurgerStart=()=>{
    return{
        type:actionTypes.PURCHASEE_BURGER_START
    }
}


export const purchaseBurger=(orderData,token)=>{
    return dispatch =>{
        dispatch(purchaseBurgerStart());
        axios.post("/orders.json?auth="+token, orderData).then(response => {
            

            dispatch(purchaseBurgerSuccess(response.data.name,orderData));
        }).catch(error => {

            dispatch(purchaseBurgerFail(error));
        });
    }
}

export const purchaseInit=()=>{
    return{
        type:actionTypes.PURCHASE_INIT
    }
}


export const fetchOrderSucces=(orders)=>{
    return{
        type:actionTypes.FETCH_ORDER_SUCCESS,
        orders:orders
    }
}
export const fetchOrderFail=(error)=>{
    return{
        type:actionTypes.FETCH_ORDER_FAIL,
        error:error
    }
}
export const fetchOrderStart=()=>{
return{
    type:actionTypes.FETCH_ORDER_START
}

}

export const fetchOrders=(token,userId)=>{

    return dispatch=>{
        dispatch(fetchOrderStart());
        const queryparams='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json'+queryparams).then(res=>{

            const fetchOrders=[];
            for(let Key in res.data){

                fetchOrders.push({...res.data[Key],id:Key });

            }
          dispatch(fetchOrderSucces(fetchOrders));
          
        }).catch(err=> {
            dispatch(fetchOrderFail(err));
        });
    }
}