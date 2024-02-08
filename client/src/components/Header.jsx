import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import {FaShoppingCart, FaUser} from'react-icons/fa';
import hojas from '../assets/hojas.png'
import {LinkContainer} from 'react-router-bootstrap';
import {useSelector} from'react-redux';

export default function Header() {
    const {cartItems}=useSelector((state)=> state.cart);
    console.log(cartItems);


  return (
    <header>
        <Navbar 
            variant='dark' 
            expand='md'
            style={{backgroundColor: 'var(--bs-dark)'}} 
            collapseOnSelect
        >
            <Container className='px-2'>
                <LinkContainer to='/'>
                    <Navbar.Brand >
                        <span>
                            <img src={hojas} alt='logo' width='30' height='30' className='d-inline-block align-top' />
                            Naturally<span style={{color:'#9dff2e'}}>Care</span>
                        </span>
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic=navbar-nav' />
                <Navbar.Collapse id='basic=navbar-nav'>
                    <Nav className='ms-auto'>
                        <LinkContainer to='/cart'>
                            <Nav.Link>
                                <FaShoppingCart/>Cart
                                {
                                    cartItems.length > 0 && (
                                        <Badge
                                            pill
                                            bg='success'
                                            style={{marginLeft:'5px'}}
                                        >
                                            {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                        </Badge>
                                    )
                                }
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
