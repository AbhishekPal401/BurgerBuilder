import React ,{Component} from 'react';
import {connect} from 'react-redux';
import * as action from '../../Store/actions/index';
import {Redirect} from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import {updateObject,checkValidity} from '../../shared/utility';

class Auth extends Component{

state={
    controls:{
        email:{

            elementType:'input',
            elementConfig:{
                type:'email',
                placeholder:'Email Address'
                        },
            value:'',
            validation:{required:true,isEmail:true},
            valid:false,
            touched:false
        },
        password:{
            
            elementType:'input',
            elementConfig:{
                type:'password',
                placeholder:'password'
                        },
            value:'',
            validation:{required:true,minLength:6},
            valid:false,
            touched:false
        }

    },
    isSignUp:true


}

componentDidMount(){
    if(!this.props.buildingBurger && this.props.authRedirectPath !=='/'){
        this.props.onSetRedirectPath();

    }
}




inputChangeHandler=(event,controlName)=>{

    const updatedControls=updateObject(this.state.controls,{
        [controlName]:updateObject(this.state.controls[controlName],{
            value:event.target.value,
            valid:checkValidity(event.target.value,this.state.controls[controlName].validation),
            touched:true

        })

    });

    this.setState({controls:updatedControls});

}

submitHandler=(event)=>{
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);

}

switchAuthModeHandler=()=>{
  this.setState(prevState=>{return {isSignUp:!prevState.isSignUp}} );
}
    render(){
        const fromElementsArray=[];
        for(let Key in this.state.controls){
            fromElementsArray.push({
                id:Key,
                config:this.state.controls[Key]
            });
        }

        let form=fromElementsArray.map(formElement=>(
        <Input key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event)=>this.inputChangeHandler(event,formElement.id)}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
        />

        ));
        if(this.props.loading){
            form=<Spinner/>;
        }

        let errorMessage=null;

        if(this.props.error){
            errorMessage=(
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect=null;
        
        if(this.props.isAuthneticated){

            authRedirect=<Redirect to={this.props.authRedirectPath}/>

        }

        
        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                  {form}
                  <Button btnType='Success'>SUBMIT</Button>
                </form>
                <Button 
                clicked={this.switchAuthModeHandler}
                btnType='Danger'>SWITCH TO {this.state.isSignUp?"SIGNIN":"SIGNUP"}</Button>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthneticated:state.auth.token != null,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        onAuth:(email,password,isSignUp)=>dispatch(action.auth(email,password,isSignUp)),
        onSetRedirectPath:()=>dispatch(action.setAuthRedirectPath('/'))
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);