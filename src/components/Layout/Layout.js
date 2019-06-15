import React, { Component } from 'react';
import Classes from './Layout.module.css';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerOpenedHandler = () => {
        this.setState({showSideDrawer: true})
    }
    render () {
        
        return (
            <Aux>
            <Toolbar 
                clicked={this.sideDrawerOpenedHandler}
                isAuth={this.props.isAuthenticated}/>
            <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} 
                    isAuth={this.props.isAuthenticated}/>    
            <main className={Classes.Content}>
                {this.props.children}
            </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);