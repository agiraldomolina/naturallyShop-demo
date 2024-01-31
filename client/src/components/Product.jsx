import {Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Product({ product }) {
  return (
    <Card
        className='my-3 p-3 rounded'
    >
        <Link
            to={`/product/${product._id}`}
        >
            <Card.Img variant="top" src={product.image} />
        </Link>
        <Card.Body>
            <Link to={`product/${product._id}`}>
                <Card.Title as='div'>
                <strong>{product.name}</strong>
            </Card.Title>
            </Link>
            <Card.Text as='h3'>
                ${product.price}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}
