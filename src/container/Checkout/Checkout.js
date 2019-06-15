import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
    // state = {
    //     ingredients: {
    //         Salad: 1,
    //         Bacon: 1,
    //         Meat: 1,
    //         Cheese: 1
    //     },
    //     totalPrice: 0
    // }

    // componentDidMount () {
    //     let ing = {};
    //     const query = new URLSearchParams(this.props.location.search)
    //     let price = 0;
    //     for(let key of query.entries()) {
    //         if(key[0] === 'price') {
    //             price = +key[1];
    //         } else {
    //             ing[key[0]] = +key[1];
    //         }
            
    //     }

    //     this.setState({ingredients: ing, totalPrice: price});

    // }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        console.log(this.props)

        let summary = <Redirect to="/" />

        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = 
            <div>
                {purchasedRedirect}
                <CheckoutSummary 
                    ingredients={this.props.ings} 
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}/>
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
            </div>
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        price: state.burger.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);