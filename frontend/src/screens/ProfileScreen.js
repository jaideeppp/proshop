import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderAction'

function ProfileScreen({ history, location }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const orderMyList = useSelector(state => state.orderMyList);
    const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;


    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile;



    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders());
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, dispatch, user.name, user.email])

    function submitHandler(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            const updatedUser = {
                id: user._id,
                name,
                email,
                password
            }
            dispatch(updateUserProfile(updatedUser))
        }
    }
    return (
        <>
            <Row>
                <Col md={3}>
                    <h2>User Profile</h2>
                    {message && <Message variant="danger">{message}</Message>}
                    {error && <Message variant="danger">{error}</Message>}
                    {success && <Message variant="success">Profile Updated</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="Enter name"
                                onChange={(e) => setName(e.target.value)}
                                value={name} />
                        </Form.Group>
                        <Form.Group controlId="email" >
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email} />
                        </Form.Group>
                        <Form.Group controlId="password" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword" >
                            <Form.Label >Confirm Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} />
                        </Form.Group>

                        <Button type="submit" variant="primary" >
                            Update
                </Button>
                    </Form>
                </Col>
                <Col md={9}>
                    <h2>My Orders</h2>
                    {
                        loadingOrders ? <Loader /> : errorOrders ?
                            <message variant="dangar">{errorOrders}</message> :
                            (
                                <Table striped bordered hover responsive className="table-sm">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>DATE</th>
                                            <th>TOTAL</th>
                                            <th>PAID</th>
                                            <th>DELIVERED</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order._id}>
                                                <td>{order._id}</td>
                                                <td>{order.createdAt.substring(0, 10)}</td>
                                                <td>{order.totalPrice}</td>
                                                <td>{order.isPaid ? (order.paidAt.substring(0, 10)) : (
                                                    <i className="fas fa-times" style={{ color: "red" }} ></i>
                                                )}</td>
                                                <td>{order.isDelivered ? (order.deliveredAt.substring(0, 10)) : (
                                                    <i className="fas fa-times" style={{ color: "red" }} ></i>
                                                )}</td>
                                                <td><LinkContainer to={`/order/${order._id}`}>
                                                    <Button className="btn-sm" variant="light" >Details</Button>
                                                </LinkContainer>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )
                    }
                </Col>
            </Row>
        </>
    )
}

export default ProfileScreen

