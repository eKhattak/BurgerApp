import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import BuildSummary from '../../components/Burger/BuildSummary/BuildSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';    
import * as burgerBuilderActions from '../../store/actions/index';



class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchase: false,
        }
    }

    componentDidMount () {
        this.props.onInitIngredient();    
        
    }

    updateButton = (ingredients) => {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el
            }, 0);

        return sum > 0
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({purchase: true})
        } else {
            this.props.onSetAuthPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchase: false})
    }

    purchaseSuccessHandler = () => {
        // const query = [];
        // for(let key in this.props.ing) {
        //     query.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.props.ing[key]))
        //     // query.push((key) + '=' + (this.props.ing[key]))
        // }
        // console.log(query)
        // query.push('price=' + this.props.price);
        // const queryString = query.join('&');
        // this.props.history.push({
        //     pathname:'/checkout',
        //     search: '?' + queryString
        // })

        this.props.onInitPurchase()
        this.props.history.push('/checkout');


    }


    render () {

        

        const disabledInfo = {
            ...this.props.ing
        }

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = <Spinner />
        let burger = this.props.error ? <p>Unable to Load Ingredients</p> : <Spinner />

        if(this.props.ing) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ing}/>
                <BuildControls 
                    add={this.props.onIngredientAdded} 
                    remove={this.props.onIngredientRemoved} 
                    disabled={disabledInfo}
                    price={this.props.price}
                    purchasable={this.updateButton(this.props.ing)}
                    ordered={this.purchaseHandler}/>
                </Aux>
            )
            orderSummary = <BuildSummary 
        ingredients={this.props.ing} 
        cancel={this.purchaseCancelHandler}
        continue={this.purchaseSuccessHandler}/>;

        }

        
        return (
            <Aux>
                <Modal show={this.state.purchase} close={this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                {burger}
                    
            </Aux>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        ing: state.burger.ingredients,
        price: state.burger.totalPrice,
        error: state.burger.error,
        purchased: state.order.purchased,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredient: () => dispatch(burgerBuilderActions.initIngredient()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthPath: (path) => dispatch(burgerBuilderActions.authRedirectPath(path))
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( withErrorHandler(BurgerBuilder, axios));