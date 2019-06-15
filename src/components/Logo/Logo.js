import React from 'react';

import BugerLogo from '../../assets/images/logo.png';
import Classes from './Logo.module.css';
const logo = (props) => (
    
    <div className={Classes.Logo} style={{height: props.height}}>
        <img src={BugerLogo} alt='Buger Logo'/>
    </div>
);

export default logo;
