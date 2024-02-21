import {Row, Col} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Product from '../components/Product'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetProductsQuery } from '../slices/productsApiSlices'

export default function HomeScreen() {
  const { pageNumber } = useParams();
  
  const {data,  isLoading, error} = useGetProductsQuery({pageNumber});

  return (
    <>
      {isLoading?(
        <Loader />
      ): error?(<Message variant='danger'>{error?.data?.message || error.error}</Message>):(
        <>
          <h1>Latest Products</h1>
          <Row>
              {data.products.map((product, index)=>(
                  <Col key={index} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product}></Product>
                  </Col>
              ))}

          </Row>
        </>
      )}
        
    </>
  )
}
