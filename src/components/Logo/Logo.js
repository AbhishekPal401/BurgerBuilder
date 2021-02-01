import React from 'react';
import burgerLogo from '../../assets/Images/burger-logo.png';
import classes from './Logo.module.css';
const logo=()=>{
    return(
        <div className={classes.Logo}>
            <img src={burgerLogo}/>
        </div>
    );
}
export default logo;