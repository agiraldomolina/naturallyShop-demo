import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import {FaShoppingCart, FaUser} from'react-icons/fa';
import hojas from '../assets/hojas.png'
import {LinkContainer} from 'react-router-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import {logout} from '../slices/authSlice';
import { toast} from "react-toastify";
import SearchBox from './SearchBox';

export default function Header() {
    const {cartItems}=useSelector((state)=> state.cart);
    const {userInfo}=useSelector((state)=> state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    // console.log(cartItems);

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        }
    }


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
                    <SearchBox />
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
                        <>
                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.name}
                                    id='username'
                                >
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ): (
                                <LinkContainer to='/login'>
                                <Nav.Link>
                                    <FaUser/>Sign In
                                </Nav.Link>
                            </LinkContainer>
                            )}
                        </>
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown
                                title='Admin'
                                id='adminMenu'
                            >
                                <LinkContainer to='/admin/order-list'>
                                    <NavDropdown.Item>
                                        Orders
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/product-list'>
                                    <NavDropdown.Item>
                                        Products
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/user-list'>
                                    <NavDropdown.Item>
                                        Users
                                    </NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}
