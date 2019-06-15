import React from 'react';
import Burger from '../../Burger/Burger';
import Button from'../../UI/Button/Button';
import Classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className={Classes.CheckoutSummary}>
            <h1>We hope you like it!</h1>
            <div style={{width:'100%', height:'300px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                type="Danger" 
                click={props.checkoutCancelled}>CANCEL</Button>
            <Button 
                type="Success" 
                click={props.checkoutContinued}>CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary;