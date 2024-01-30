import React from 'react'
import './header.css'
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import {FaShoppingCart, FaUser} from'react-icons/fa';


export default function Header() {
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
            <Container className='px-2'>
                <Navbar.Brand href='/'>
                    NaturallyShop
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
