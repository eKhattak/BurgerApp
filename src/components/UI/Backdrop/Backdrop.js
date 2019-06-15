import React from 'react';
import Classes from './Backdrop.module.css'
const backdrop = (props) => (
    props.show ? <div className={[Classes.Backdrop, props.otherClass].join(' ')} onClick={props.modalClosed}></div> : null
)

export default backdrop;