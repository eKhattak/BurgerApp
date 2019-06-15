import React from 'react';
import Classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => (
    <ul className={Classes.NavigationItem}>
        <NavLink to={props.link} 
        exact={props.exact}
        activeClassName={Classes.active}> {props.children}</NavLink>
    </ul>
)

export default navigationItem;