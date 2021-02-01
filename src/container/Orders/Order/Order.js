import { checkPropTypes } from 'prop-types';
import React from 'react';
import classes from './Order.module.css';
const order=(props)=>{

    let ingredients=[];
    for( let ingredient in props.ingredients){
        ingredients.push({name:ingredient,quantity:props.ingredients[ingredient]});
    }

    const ingredientOutput = ingredients.map(ig=> {
        return <span key={ig.name} style={{textTransform:'capitalize',display:'inline-block',margin:'0 8px',padding:'5px',border:'1px solid #ccc'}}>{ig.name}({ig.quantity})</span>
    });

    return(
        <div className={classes.Order}>
            <p>Ingredients:{ingredientOutput} </p>
            <p>Price:<strong>USD {Number.parseFloat( props.price).toFixed(2)}</strong></p>
        </div>
    );

}
export default order;