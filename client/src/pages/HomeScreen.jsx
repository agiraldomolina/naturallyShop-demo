import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlices'

export default function HomeScreen() {
  const {data: products, isLoading, error} = useGetProductsQuery();
  console.log(products);

  return (
    <>
      {isLoading?(
        <h2>Loading...</h2>
      ): error?(<div>{error?.data?.message || error.error}</div>):(
        <>
          <h1>Latest Products</h1>
          <Row>
              {products.map((product, index)=>(
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
