import React ,{Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary';
import ContactData from '../../container/Checkout/ContactData/ContactData';
import * as actions from '../../Store/actions/index';
// import Spinner from '../../components/UI/Spinner/Spinner';
class Checkout extends Component {
    
   
    checkoutCancelledHandler=()=>{
        this.props.history.goBack();

    }
    checkoutContinueHandler=()=>{

        this.props.history.replace("/checkout/contact-data");
    }

    render(){
        let summary =<Redirect to="/"/>;
        if(this.props.ings){
            const purchaseRedirect =this.props.purchased?<Redirect to="/"/>:null;
            summary= (
            <div>
                {purchaseRedirect}
            <CheckoutSummary ingredients={this.props.ings} checkoutCancelled={this.checkoutCancelledHandler} checkoutContinue={this.checkoutContinueHandler}/>
                <Route path={this.props.match.url +"/contact-data"} component={ContactData} />
                </div>
                )
        }

        return summary;
                
          
        
    }

}

const mapStatetoProps=(state)=>{
return{
    
    ings:state.burgerBuilder.Ingredient,
    purchased:state.order.purchased
}
}
// const mapDispatchtoProps=(dispatch)=>{
//     return{
// onPurchaseInit:()=> dispatch(actions.purchaseInit)
//     }
// }
export default connect(mapStatetoProps) (Checkout);