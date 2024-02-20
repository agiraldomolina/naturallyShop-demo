import { Container, Row, Col } from 'react-bootstrap';

export default function Footer  () {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container className='p-2'>
        <Row>
          <Col className='text-center py-3'>
            <p>NaturallyShop &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}