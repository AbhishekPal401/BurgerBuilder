import React, { Component } from 'react';
import {connect} from 'react-redux';

import axios from '../../../axios-Orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorhandler';
import * as actions from '../../../Store/actions/index';
import {updateObject,checkValidity} from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderform:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                            },
                value:'',
                validation:{required:true},
                valid:false,
                touched:false
            },
            street: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'', 
                validation:{required:true},
                valid:false,
                touched:false
            },
            zipcode: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip Code'
                },
                value:'',
                validation:{required:true,
                     minLength:5,
                    maxLength:5
                },
               
                valid:false,
                touched:false 
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{required:true},
                valid:false,
                touched:false  
            },
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                },
                value:'',
                validation:{required:true},
                valid:false,
                touched:false  
            },
            deliveryMethod: {
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'fastest'},
                        {value:'Cheapest',displayValue:'cheapest'}
                ]
                },
                value:'fastest',
                
                valid:true  
            }

        },
        
         formIsValid:false,

       

    }
    orderHandler = (event) => {
        event.preventDefault();
        
       
        const formData={};
        for(let formElementId in this.state.orderform){
            formData[formElementId]=this.state.orderform[formElementId].value;
        }
        const order = {
            Ingredient: this.props.ings,
            totalCost: this.props.price,
            formValue:formData,
            userId:this.props.userId
        }

        this.props.onOrderBurger(order,this.props.token);
       
    }
    

    inputChangeHandler=(event,inputIndentifier)=>{
       const updatedOrderForm={
           ...this.state.orderform
       };
       
       const updatedFormElement=updateObject(this.state.orderform[inputIndentifier],{
        value:event.target.value,
        valid:checkValidity(event.target.value,this.state.orderform.validation),
       touched:true

       });
       
      
      

      let formIsValid=true;
      for(let inputIdentifier in updatedOrderForm){

        formIsValid=updatedOrderForm[inputIdentifier].valid && formIsValid;

      }
       
       updatedOrderForm[inputIndentifier]=updatedFormElement;
       this.setState({orderform:updatedOrderForm,formIsValid:formIsValid});



    }
    render() {
        const fromElementsArray=[];
        for(let Key in this.state.orderform){
            fromElementsArray.push({
                id:Key,
                config:this.state.orderform[Key]
            });
        }

        let forum = (<form  onSubmit={this.orderHandler}>
           
            {fromElementsArray.map(fromElement=>{
                return(<Input 
                    key={fromElement.id}
                    elementType={fromElement.config.elementType} 
                    elementConfig={fromElement.config.elementConfig}
                    value={fromElement.config.value}
                    changed={(event)=>this.inputChangeHandler(event,fromElement.id)}
                    invalid={!fromElement.config.valid}
                    shouldValidate={fromElement.config.validation}
                    touched={fromElement.config.touched}
                    />)
                
            })}
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>

        </form>);
        if (this.props.loading) {
            forum = <Spinner />;
        }
        return (

            <div className={classes.ContactData}>
                <h3>Your Contact Details !</h3>
                {forum}
            </div>
        );

    }
}

const mapStatetoProps=(state)=>{
    return{
        ings:state.burgerBuilder.Ingredient,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchtoProps=(dispatch)=>{

    return{
        onOrderBurger: (orderData,token)=> dispatch(actions.purchaseBurger(orderData,token))

    }

   

}

export default connect(mapStatetoProps,mapDispatchtoProps)(withErrorHandler(ContactData,axios));






