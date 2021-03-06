import React ,{Component} from 'react';
import {connect} from 'react-redux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/Sidedrawer/SideDrawer';
class Layout extends Component {
    state={
        showSideDrawer:true
    }
    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false});

    }
    sideDrawerToggleHAndler=()=>{
        this.setState((prevState)=>{return { showSideDrawer :!prevState.showSideDrawer};});
    }
    render()
        {

            return (
                <>
                <Toolbar 
                isAuth={this.props.isAuthenticated}
                drawToggleClicked={this.sideDrawerToggleHAndler}></Toolbar>
                <SideDrawer
                isAuth={this.props.isAuthenticated}
                open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>{
                this.props.children} 
                </main>
                </>
            )
        }
        
            
    
        

            
}

const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.token !==null 
    }
}
export default connect(mapStateToProps)(Layout);