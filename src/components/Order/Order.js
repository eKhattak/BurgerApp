import React from 'react';
import Classes from './Order.module.css';

const Order = (props) => {

    const ingredients = [];

    for(let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientsOutput = ingredients.map(ig => {
        return <span 
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                }}
                key={ig.name}>{ig.name} ({ig.amount})</span>;
    })


    // console.log(ingredients)
    return (
        <div className={Classes.Order}>
        <p>Ingredients: {ingredientsOutput}</p>
        <p>Price: <strong>USD {props.price}</strong></p>
    </div>
    )
}

export default Order;