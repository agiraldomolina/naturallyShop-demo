import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Row, Col, ListGroup, Image, Form, Button,Card} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart } from '../slices/cartSlice';

export default function CartScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler =async(product, qty)=>{
        dispatch(addToCart({...product, qty}));
    }
    
  return <Row>
    <Col md={8}>
        <h1 style={{marginBottom:'20px'}}>
            Shopping Cart
        </h1>
        {cartItems.length === 0 ? (
            <Message variant='info'>
                Shopping Cart is Empty <Link to='/'>Go Back</Link>
            </Message>
        ):(
            <ListGroup variant='flush'>
                {cartItems.map((item, index)=>(
                    <ListGroup.Item key={index}>
                        <Row>
                            <Col md={2}>
                                <Image 
                                    src={item.image} 
                                    alt={item.name} 
                                    fluid 
                                    rounded 
                                />
                            </Col>
                            <Col md={3}>
                                <Link to={`/product/${item._id}`}>
                                    {item.name}
                                </Link>
                            </Col>
                            <Col md={2}>
                                {item.price}
                            </Col>
                            <Col md={2}>
                                <Form.Control
                                    as='select'
                                    value={item.qty}
                                    style={{height: '50px'}}
                                    onChange={(e) => addToCartHandler(item,Number(e.target.value))}
                                >
                                    {[...Array(item.countInStock).keys()].map((el)=>(
                                        <option key={el+1} value={el+1}>
                                            {el+1}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                            <Col md={2}>
                                <Button
                                    className='btn-block'
                                    type='button'
                                    onClick={() =>{}}
                                >
                                    <FaTrash />
                                </Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )}
    </Col>
    <Col md={4}>
        <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>
                        Subtotal({cartItems.reduce((acc,el)=>(acc+el.qty),0)}) items
                    </h2>
                    ${cartItems.reduce((acc,el)=>(acc+el.qty * el.price),0).toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button
                        type='button'
                        className='btn-block'
                        disabled={cartItems.length === 0}
                    >
                        Proceed To Checkout
                    </Button>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    </Col>

  </Row>
}
