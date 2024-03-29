import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutStep from '../components/CheckoutStep'

function PaymentScreen({ history }) {

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('Paypal');

    const dispatch = useDispatch();

    function submitHandler(e) {
        e.preventDefault();

        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');

    }

    return (
        <FormContainer>
            <CheckoutStep step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Group>
                        <Form.Label as="legand">
                            Select Method
                        </Form.Label>
                    </Form.Group>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="payPal or credit Card"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)} />
                        <Form.Check
                            type="radio"
                            label="Cash On Delivery(COD)"
                            id="COD"
                            name="paymentMethod"
                            value="COD"
                            onChange={(e) => setPaymentMethod(e.target.value)} />
                    </Col>
                </Form.Group>
                <Button type="submit" variant="primary" onClick={submitHandler}>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
