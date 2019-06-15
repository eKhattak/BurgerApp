import React, { Component } from 'react';
import Classes from './BurgerIngredients.module.css';
import PropTypes from 'prop-types';

class BurgerIngredients extends Component {
    render () {
        let ingredient = null;

    switch (this.props.type) {
        case ('Bread-Bottom'):
            ingredient = <div className={Classes.BreadBottom}></div>;
            break;
        case ('Bread-Top'):
            ingredient = <div className={Classes.BreadTop}>
                <div className={Classes.Seeds1}></div>
                <div className={Classes.Seeds2}></div>
            </div>;
            break;
        case ('Meat'):
            ingredient = <div className={Classes.Meat}></div>;
            break;
        case ('Cheese'):
            ingredient = <div className={Classes.Cheese}></div>;
            break;
        case ('Salad'):
            ingredient = <div className={Classes.Salad}></div>;
            break;
        case ('Bacon'):
            ingredient = <div className={Classes.Bacon}></div>;
            break;
            default:
            ingredient = null;
    }

    return ingredient;
    }

} 

export default BurgerIngredients;

BurgerIngredients.propTypes = {
    type: PropTypes.string.isRequired
}