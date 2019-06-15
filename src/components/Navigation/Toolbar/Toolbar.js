import React from 'react';
import Classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';


const toolbar = (props) => (
    <header className={Classes.Toolbar}>
        <div className={Classes.DrawerToggle} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <Logo height='80%'/>
        <nav className={Classes.DesktopOnly}>
            <NavigationItems auth={props.isAuth}/>
        </nav>
    </header>
)

export default toolbar;