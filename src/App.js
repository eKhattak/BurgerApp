import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Logout from './container/Auth/Logout/Logout';
import {Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import asynComponent from './hoc/asyncComponent/asynComponent';

import './App.css';

const asyncAuth = asynComponent(() => {
  return import('./container/Auth/Auth');
})

const asyncOrders = asynComponent(() => {
  return import('./container/Orders/Orders');
})

const asynCheckout = asynComponent(() => {
  return import('./container/Checkout/Checkout');
})


class App extends Component {

  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    )

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asynCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      )
    }
    return (

      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch =>{
  return {
    checkAuthState: dispatch(actions.checkAuthState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
