import React from 'react';
import Classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (

    <ul className={Classes.NavigationItems}>
        <NavigationItem link='/' exact>Burger Builder</NavigationItem>
        {props.auth ? <NavigationItem link='/orders'>Orders</NavigationItem> : null}

        {!props.auth 
            ? <NavigationItem link='/auth'>Sign In</NavigationItem>
            : <NavigationItem link='/logout'>Logout</NavigationItem>}
    </ul>
)

export default navigationItems;