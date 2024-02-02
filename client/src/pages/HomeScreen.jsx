import { useEffect, useState } from 'react'
import axios from 'axios'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  console.log(products)

  useEffect(()=>{
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    fetchProducts();
  },[])


  return (
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
  )
}
