import React, { Component } from 'react';
import { connect} from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders } from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount () {
       this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render () {

        let orders = <Spinner />

        if(!this.props.loading) {
            orders = this.props.orders.map(order => 
                <Order 
                  key={order.id} 
                  price={order.price}  
                  ingredients={order.ingredients}/>
            )
        }

        return (
            <div>
                {orders}
            </div>
        )
    }
};


const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.localID
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));