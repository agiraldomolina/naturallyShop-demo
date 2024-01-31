import { Navbar, Nav, Container } from 'react-bootstrap';
import {FaShoppingCart, FaUser} from'react-icons/fa';
import hojas from '../assets/hojas.png'
import {LinkContainer} from 'react-router-bootstrap';


export default function Header() {
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
            <Container className='px-2'>
                <LinkContainer to='/'>
                    <Navbar.Brand >
                        <span>
                            <img src={hojas} alt='logo' width='30' height='30' className='d-inline-block align-top' />
                            Naturally<span style={{color:'#026100'}}>Shop</span>
                        </span>
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic=navbar-nav' />
                <Navbar.Collapse id='basic=navbar-nav'>
                    <Nav className='ms-auto'>
                        <LinkContainer to='/cart'>
                            <Nav.Link>
                                <FaShoppingCart/>Cart
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/login'>
                            <Nav.Link>
                                <FaUser/>Sign In
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}
