import React, { Component } from 'react';
import Classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

class Modal extends Component {
    
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    
    render () {

        return (
            <Aux>
                <Backdrop show={this.props.show} modalClosed={this.props.close}  />
                <div className={Classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1': '0'
                    }}> 
                {this.props.children} 
                </div>
            </Aux>
        );
    }
}


export default Modal;