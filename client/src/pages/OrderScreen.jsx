import {Link, useParams} from 'react-router-dom';
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap';
import Message  from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';

export default function OrderScreen() {
    const {id: orderId} = useParams();

    const {data:order, refetch,isLoading, error} = useGetOrderDetailsQuery(orderId);
    console.log(order);
  

  return isLoading? <Loader/>:error?<Message variant='dander'/>:(
    <>
        <h1>Order &nbsp;{order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Name:&nbsp;</strong>
                            {order.user.name}
                        </p>
                        <p>
                            <strong>Email:&nbsp;</strong>
                            {order.user.email}
                        </p>
                        <p>
                            <strong>Address:&nbsp;</strong>
                            {order.shippingAddress.address},
                            {order.shippingAddress.city},
                            {order.shippingAddress.zipcode},
                            {order.shippingAddress.country} 
                        </p>
                        {order.isDelivered ? (
                            <Message variant='success'>
                                Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
                            </Message>
                        ):(
                            <Message variant='danger'>
                                Not Delivered
                            </Message>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method:&nbsp;</strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                            <Message variant='success'>
                                Paid on {new Date(order.paidAt).toLocaleDateString()}
                            </Message>
                        ):(
                            <Message variant='danger'>
                                Not Paid
                            </Message>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.map((item,index)=>(
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image 
                                            src={item.image} 
                                            alt={item.name} 
                                            fluid 
                                            rounded 
                                        />
                                    </Col>
                                    <Col>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={4}>
                                        {item.qty} x ${item.price} = ${item.qty * item.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {/* PAY ORDER PLACEHOLDER */}
                        {/* MARK AS DELIVERED PLACEHOLDER */}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}