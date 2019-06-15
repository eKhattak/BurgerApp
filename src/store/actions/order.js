import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderID: id,
        orderData: orderData
    }
} 

export const purchaseBurgerFail = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.INIT_PURCHASE
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(err => {
                dispatch(purchaseBurgerFail())
            })
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = () => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_INIT
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'; 
        axios.get('/orders.json' + queryParams)
        .then(res => {
            const fetchOrders = [];
            for(let key in res.data) {
                fetchOrders.push({
                    ...res.data[key],
                    id:key
                })
            }
            dispatch(fetchOrdersSuccess(fetchOrders));
        }).catch(err => {
            dispatch(fetchOrdersFail());
        })
    }
}