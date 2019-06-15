import React from 'react';
import Classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {

    let transformIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                
                return <BurgerIngredients key={igKey + i} type={igKey} />
            });
        }).reduce((arr, el) =>  arr.concat(el),[])
        
        if(transformIngredients.length === 0) {
            transformIngredients = <p>Please Add Ingredients</p>
        }

        let ing = {
            "Banana": 2,
            "Apple": 1
        }
        console.log(Object.keys(ing).map(igKey =>{
            return [...Array(ing[igKey])]
        }))
        console.log(Object.keys(ing))
        console.log(ing)
        console.log(Object.keys(ing).map(igKey => {
            return [...Array(ing[igKey])].map((_, i) => {
                return igKey
            })
        }).reduce((arr, el) => arr.concat(el), []))
        
    return (
        <div className={Classes.Burger}>
            <BurgerIngredients type="Bread-Top" />
            {transformIngredients}
            <BurgerIngredients type='Bread-Bottom' />
        </div>
    )
}

export default burger;