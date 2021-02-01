import React from 'react';
import {withRouter} from 'react-router-dom';
import classes from './Burger.module.css';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient';
// import BurgerBuilder from '../../container/BurgerBuilder/BurgerBuilder';

const burger =(props)=>{

    let transformIngredient = Object.keys(props.Ingredient).map(igkey=>{  
        return [...Array(props.Ingredient[igkey])].map((_,i)=>{  
            return <BurgerIngredient key={igkey+i} type={igkey}/> });  
        }).reduce((arr,el) => arr.concat(el),[]);
        
        if(transformIngredient.length===0){
            transformIngredient=<p>Please Start Adding Ingredients!</p>

        }
        // console.log(transformIngredient);
    return(
        <div className={classes.Burger}>
        <BurgerIngredient type='bread-top'/>
        {transformIngredient}
        <BurgerIngredient type='bread-bottom'/>     
         </div>
    );
}
export default withRouter(burger);