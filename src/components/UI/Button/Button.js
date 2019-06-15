import React from 'react';
import Classes from './Button.module.css';

const button = (props) => (
    <button 
        className={[Classes.Button, Classes[props.type]].join(' ')} 
        onClick={props.click}>
        {props.children}
        </button>
)

export default button;