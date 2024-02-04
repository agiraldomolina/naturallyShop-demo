import { useParams } from 'react-router-dom'
import {  Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import Rating from '../components/Rating'
import { useGetProductDetailsQuery } from '../slices/productsApiSlices'

export default function ProductScreen() {
    const {id:productId} = useParams();
    console.log(productId);
    const {data: product, isLoading, error} = useGetProductDetailsQuery(productId);
    console.log(product);

  return (
    <>
        <Link
            className='btn btn-light my-3'
        >
            Go Bach
        </Link>
        {isLoading?(
            <h2>Loading...</h2>
        ):error?(<div>{error?.data?.message || error.error}</div>):(
            <Row>
                <Col md={5}>
                    <Image src={product.image} alt={product.image}fluid rounded />
                </Col>
                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col col={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        <strong>{product.countInStock >0? 'In Stock': 'Out of Stock'}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    className='btn-block'
                                    type='button'
                                    disabled={product.countInStock === 0}
                                >
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        )}
        
    </>
  )
}