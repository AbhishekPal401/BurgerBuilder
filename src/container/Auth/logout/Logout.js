import React ,{Component}from 'react';
import { loggout } from '../../../Store/actions/Auth';
import {connect} from 'react-redux';
import * as actions from '../../../Store/actions/index';
import {Redirect} from 'react-router-dom';
class logout extends Component{
componentDidMount(){
    this.props.isLogout();
}

    render(){
        return <Redirect to="/"/>
    }
}

const mapDispatchToProps=dispatch=>{
    return{
isLogout:()=>dispatch(actions.loggout())
    }
}

export default connect(null,mapDispatchToProps)(logout);