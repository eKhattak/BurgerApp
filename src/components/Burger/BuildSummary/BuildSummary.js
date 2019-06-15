import React, { Component } from 'react';
import Aux  from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';


class BuildSummary extends Component {

    componentWillUpdate () {
        console.log('BuildSummary Updated!!!');
    }


    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    {igKey}: {this.props.ingredients[igKey]}
                </li>
            )
        })

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A Delicious Burger with the Following Ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <Button type='Danger' click={this.props.cancel}>CANCEL</Button>
                <Button type='Success' click={this.props.continue}>CONTINUE</Button>
            </Aux>
        );

    }
}

export default BuildSummary;