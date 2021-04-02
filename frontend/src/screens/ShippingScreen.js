import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutStep from '../components/CheckoutStep'

function ShippingScreen({ history }) {

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    function submitHandler(e) {
        e.preventDefault();
        const newAddress = {
            address, city, postalCode, country
        }

        dispatch(saveShippingAddress(newAddress));
        history.push('/payment');

    }

    return (
        <FormContainer>
            <CheckoutStep step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address" >
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder="Enter Address"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address} />
                </Form.Group>
                <Form.Group controlId="city" >
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder="Enter City"
                        onChange={(e) => setCity(e.target.value)}
                        value={city} />
                </Form.Group>
                <Form.Group controlId="postalCode" >
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder="Enter Postal code"
                        onChange={(e) => setPostalCode(e.target.value)}
                        value={postalCode} />
                </Form.Group>
                <Form.Group controlId="country" >
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder="Enter country"
                        onChange={(e) => setCountry(e.target.value)}
                        value={country} />
                </Form.Group>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
