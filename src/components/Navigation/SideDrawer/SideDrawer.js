import React from 'react';
import Classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const sideDrawer = (props) => {
    let attachedClasses = [Classes.SideDrawer, Classes.Close];

    if(props.open) {
        attachedClasses = [Classes.SideDrawer, Classes.Open];
    }
    return (
        <Aux>
            <Backdrop 
                otherClass={Classes.Backdrop} 
                show={props.open} modalClosed={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={Classes.Logo}>
                    <Logo height='100%'/>
                </div>
                <nav>
                    <NavigationItems auth={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer;