import React,{Component} from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorhandler';
import * as burgerBuilderActions from '../../Store/actions/index';
import axios from '../../axios-Orders';
class BurgerBuilder extends Component{
    state={
        purchasing:false,
        loading:false,
        error:false

    }
    componentDidMount(){
        
        this.props.onInitIngredients();
       
    }
    updatePurchaseState=(ingredients)=>{
    
        const sum=Object.keys(ingredients).map((igKey)=> {
            return ingredients[igKey]
        }).reduce(( (sum,el)=> sum +el),0);
       return sum > 0
    }

 



purchasinghandler=()=>{
    if(this.props.isAuthenticated){

        this.setState({purchasing:true});

    }
    else{
        this.props.onSetAuthRedirectPath('/checkout');
        this.props.history.push('/auth');
    }
    
}

purchaseCancelHandler=()=>{
    this.setState({purchasing:false});
}
purchaseContinueHandler=()=>{
    // alert('Your Continuing!!');


// });


this.props.onInitPurchase();

this.props.history.push('/checkout')

}



    render() {
        const disabledInfo={...this.props.ings};
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key] <=0 
        }
        let orderSummary=null;
        
       

        let burger =this.props.error?<p>Ingredients can't be loaded!!</p>:<Spinner/> ;

        if(this.props.ings){
            burger=
            (
            <>
            <Burger Ingredient={this.props.ings}/>
            <BurgerControls ingredientAdded={this.props.onIngredientAdd } 
            ingredientRemoved={this.props.onIngredientRemove} 
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={()=>this.updatePurchaseState(this.props.ings)}
            ordered={this.purchasinghandler}
            isAuth={this.props.isAuthenticated}
            />
            </>);

            orderSummary=<OrderSummary  price={this.props.price} 
            ingredients={this.props.ings}  
            purchaseCanceled={this.purchaseCancelHandler} 
            purchaseContiue={this.purchaseContinueHandler} > 
            </OrderSummary>;
             
           

        }
        
return(
    <>
    <Modal show={this.state.purchasing} ModalClosed={this.purchaseCancelHandler}>
        {orderSummary}
     </Modal>
     {burger}
    </>
);

    }
}






const mapStatetoProps= state=>{
    return{
        ings:state.burgerBuilder.Ingredient,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token !=null
    }
}

const mapDispatchtoProps=dispatch=>{
    return{
        onIngredientAdd:(ingName)=>dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemove:(ingName)=>dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients:()=>dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase:()=>dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath:(path)=>dispatch(burgerBuilderActions.setAuthRedirectPath(path))

    }
}
export default connect(mapStatetoProps,mapDispatchtoProps)(withErrorHandler(BurgerBuilder,axios));



















