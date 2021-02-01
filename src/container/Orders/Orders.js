import React ,{Component} from 'react';
import {connect} from 'react-redux';
import Order from '../Orders/Order/Order';
import axios from '../../axios-Orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorhandler';
import * as actions from '../../Store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component{
    

    componentDidMount(){
      this.props.onFetchOrders(this.props.token,this.props.userId);
    }
render(){
    let orders=<Spinner/>;
    if(!this.props.loading){
        orders=this.props.orders.map(
            order =>{
                 return <Order key={order.id} price={order.totalCost} ingredients={order.Ingredient}/>
             }
        )
    }
    return(
        <div>
            {orders}
        </div>
    )
}
}

const mapStateToProps =(state)=>{
    return{
orders:state.order.orders,
loading:state.order.loading,
token:state.auth.token,
userId:state.auth.userId

    }
}

const mapDispatchtoProps=(dispatch)=>{
    return{
        onFetchOrders:(token,userId)=> dispatch(actions.fetchOrders(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchtoProps)(withErrorHandler(Orders,axios));