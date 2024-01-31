import { Navbar, Nav, Container } from 'react-bootstrap';
import {FaShoppingCart, FaUser} from'react-icons/fa';
import logo3 from '../assets/logo3.png';


export default function Header() {
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
            <Container className='px-2'>
                <Navbar.Brand href='/'>
                    Naturally Shop
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic=navbar-nav' />
                <Navbar.Collapse id='basic=navbar-nav'>
                    <Nav className='ms-auto'>
                        <Nav.Link href='/'><FaShoppingCart/>Cart</Nav.Link>
                        <Nav.Link href='/login'><FaUser/>Sign In</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}
