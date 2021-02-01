import * as actionType from '../actions/actionTypes';
import { setIngredient } from '../actions/burgerBuilder';
import {updateObject} from '../../shared/utility';

const initialState={

    Ingredient:null,
    totalPrice :4,
    loading:false,
    error:false,
    building:false
};

const INGREDIENT_PRICES={
    salad:0.4,
    bacon:0.7,
    cheese:0.5,
    meat:0.8
};

const addIngredients=(state,action)=>{
    const updatedIngredient={[action.ingredientName]:state.Ingredient[action.ingredientName] +1};
    const updatedIngredients=updateObject(state.Ingredient,updatedIngredient);
    const updatedState={
        Ingredient:updatedIngredients,
        totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building:true

    }
    return updateObject(state,updatedState);
    
    
}

const removeIngredients=(state,action)=>{
    const updatedIng={[action.ingredientName]:state.Ingredient[action.ingredientName] -1};
    const updatedIngs=updateObject(state.Ingredient,updatedIng);
    const updatedSt={
        Ingredient:updatedIngs,
        totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building:true

    }
    return updateObject(state,updatedSt);
    
}

const setIngredients=(state,action)=>{
    return updateObject(state,{
        Ingredient:{
            salad:action.ingredients.salad,
            bacon:action.ingredients.bacon,
            cheese:action.ingredients.cheese,
            meat:action.ingredients.meat
        },
        error:false,
        totalPrice:4,
        building:false
    });

}


const fetchIngredients=(state,action)=>{

    return updateObject(state,{
        error:true

    });

}
//reducer
const reducer=(state=initialState,action)=>{

    switch (action.type) {
        
        case actionType.ADD_INGREDIENT:return addIngredients(state,action);
           
        
    
        case actionType.REMOVE_INGREDIENT:return removeIngredients(state,action);
           

            case actionType.SET_INGREDIENT: return setIngredients(state,action);
               
               
            case actionType.FETCH_INGREDIENTS_FAILED:return fetchIngredients(state,action);
             
               
            

        default:
            return state;
            
    }
    

}

export default reducer;




