import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utilities'

const initialState = {
    ingredients: null,
    totalPrice: 2,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    Cheese: 2,
    Meat: 4,
    Salad: 1,
    Bacon: 3
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionType.ADD_INGREDIENT:
            const updatedIngredients = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            const updatedIngredient = updateObject(state.ingredients, updatedIngredients);
            const updateSt = {
                ingredients: updatedIngredient,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state, updateSt);
        case actionType.REMOVE_INGREDIENT:
        const updatedIngs = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1};
            const updatedIng = updateObject(state.ingredients, updatedIngs);
            const updateState = {
                ingredients: updatedIng,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state, updateState);

        case actionType.FETCH_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.ingredients,
                totalPrice: 2,
                error: false,
                building: false
            })
        case actionType.FETCH_INGREDIENTS_FAIL:
            return updateObject(state, { error: true} );
        default:
        return state;
    }

}

export default reducer;