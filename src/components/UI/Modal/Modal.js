import React ,{Component}from 'react';
import classes from './Modal.module.css';
import BackDrop from '../BackDrop/BackDrop';
class Modal extends Component{
    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show!==this.props.show || nextProps.children !== this.props.children;

    }
    // componentDidUpdate(){
    //     console.log("[Modal.js] is updating");
    // }
    render(){
        return (
            <>
            <BackDrop show={this.props.show} clicked={this.props.ModalClosed}/>
            <div className={classes.Modal} style={{ 
                transform:this.props.show ? 'translatey(0)':'translatey(-100vh)',
                opacity:this.props.show?'1':'0'
            }}>
                {this.props.children}
            </div>
            </>
            
        
        );
    }
 
}
export default Modal;