import React from 'react';
import Classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import { connect } from 'react-redux';

const controls = [
    { label: 'Cheese', type:'cheese'},
    { label: 'Salad', type:'salad'},
    { label: 'Bacon', type:'bacon'},
    { label: 'Meat', type:'meat'}
]
const buildControls = (props) => (

    <div className={Classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                label={ctrl.label} 
                key={ctrl.label} 
                added={() => props.add(ctrl.label)}
                removed={() => props.remove(ctrl.label)}
                disabled={props.disabled[ctrl.label]}/>
        ))}
        <button className={Classes.OrderButton} 
                disabled={!props.purchasable}
                onClick={props.ordered}> {props.isAuthenticated ? 'Order Now' : 'Sign UP/IN'}</button>
    </div>
)


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(buildControls);