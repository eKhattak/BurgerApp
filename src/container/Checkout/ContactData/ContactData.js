import React , {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as BurgerBuilderActions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utilities';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input', 
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                rules: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input', 
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                rules: {
                    required: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input', 
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your City'
                },
                value: '',
                rules: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input', 
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                rules: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input', 
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                rules: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value:'fastest', DisplayValue:'Fastest'},
                        {value:'cheapest', DisplayValue:'Cheapest'}
                    ]
                },
                value: ''
            }
            
        },
    }

    orderHandler = (event) => {

        event.preventDefault();
        const formData = {};

        for(let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }

        const order = {
            ingredients: this.props.ings,
            orderData: formData,
            price: this.props.price,
            userId: this.props.userId
        }
        
        this.props.onPurchaseBurger(order, this.props.token);
        
    }




    changeHandler = (event, identifier) => {
       

        const updatedFormElement = updateObject(this.state.orderForm[identifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[identifier].rules),
            touched: true
        })

        const updatedFormOrder = updateObject(this.state.orderForm, {
            [identifier]: updatedFormElement
        })

        this.setState({orderForm: updatedFormOrder});
    }
    render () {

        const formElementsArray = [];

        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        
        let form = (
            
            <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value} 
                            valid={!formElement.config.valid}
                            shouldValidate={formElement.config.rules}
                            touched={formElement.config.touched}
                            changed={(event) => this.changeHandler(event, formElement.id)}/>
                    ))}          

                <Button type="Success" click={this.orderHandler}>Order Now</Button>
            </form>);

        if(this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={Classes.ContactData}>
            <h4>Please Enter Your Details</h4>
                {form}

            </div>
        );
    }
}

const mapStateToProps = state => {

    return {
        ings: state.burger.ingredients,
        price: state.burger.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.localID
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseBurger: (orderData, token) => dispatch(BurgerBuilderActions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));