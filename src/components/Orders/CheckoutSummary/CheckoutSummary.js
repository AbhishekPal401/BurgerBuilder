import React from 'react';
import Burger from '../../Burger/Burger';
import  Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary =(props)=>{
    

    return(

        <div className={classes.OrderSummary}>

            <h1>We Hope it tastes tasty!!</h1>
            <div style={{width:'100%',margin:'auto'}} >
             <Burger Ingredient={props.ingredients}/>

            </div>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success"  clicked={props.checkoutContinue}>CONTINUE</Button>

        </div>

    );

}

export default checkoutSummary;