import React ,{Component} from "react";
import {Route,Switch,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import asyncComponent from './hoc/aysncComponent/asyncComponent';
import Layout from './container/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import logout from './container/Auth/logout/Logout';
import * as actions from './Store/actions/index';

const asyncCheckout=asyncComponent(()=>{
  return import('./container/Checkout/Checkout');
});

const asyncOrders=asyncComponent(()=>{
  return import('./container/Orders/Orders');
});

const asyncAuth=asyncComponent(()=>{
  return import('./container/Auth/Auth');
});




class App extends Component{

  componentDidMount(){
    this.props.onTryAutoSetup();
  }

  render(){

    let routes=(
      <Switch>
      <Route path="/auth" component={asyncAuth}/>
      <Route path="/"  exact component={BurgerBuilder}/>
      <Redirect to="/"/>
      </Switch>

    );

    if(this.props.isAuthenticated){
      routes=(
        <Switch>
          <Route path="/checkout" component={asyncCheckout}/>
          <Route path="/orders" component={asyncOrders}/>
          <Route path="/auth" component={asyncAuth}/>
          <Route path="/logout" component={logout}/>
          <Route path="/"  exact component={BurgerBuilder}/>
          <Redirect to="/"/>

        </Switch>

      );
    }

return( 
  <div>
<Layout>
  
  {routes}
  
</Layout>
  </div>
);

  }
}

const mapStateToProps=state=>{
  return{
    isAuthenticated:state.auth.token!==null
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    onTryAutoSetup:()=>dispatch(actions.authCheckState())
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(App);
