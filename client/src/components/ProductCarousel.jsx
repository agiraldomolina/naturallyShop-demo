import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from './Loader';
import Message from './Message';
import { useGetTopProductsQuery} from '../slices/productsApiSlices'
export default function ProductCarousel() {
    const {data: products, isLoading, error} = useGetTopProductsQuery();

  return isLoading? <Loader/> : error? <Message variant="danger">{error}</Message>
  :(
    <Carousel
        pause='hover'
        className="bd-primary mb-4"
    >
        {products.map((product, index)=>(
            <Carousel.Item
                key={index}
            >
                <Link to={`product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid className="mx-auto d-block" />
                    <Carousel.Caption className="carousel-caption">
                        <h2>{product.name} (${product.price}) </h2>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}
    </Carousel>
  ) 
}
