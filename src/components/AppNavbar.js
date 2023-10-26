import { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom';
import { useValue } from '../UserContext';
import { CartToggler } from './cart/CartToggler';
import logo from '../images/logo.png'

export default function AppNavbar() {

    const { user } = useValue();

    /* const navigate = useNavigate();

    useEffect(() => {
        setUser({
            token: localStorage.getItem('token')
        })
    }
    ,[navigate, setUser]) */

    return (
        <Navbar bg="light" sticky="top" expand="lg">
            <Container fluid>
                <Navbar.Brand className='d-block d-lg-none' as={NavLink} to="/" exact="true">
                    <img src={logo} className='img-fluid' style={{ width: "150px" }} />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto align-items-center">
                        <Nav.Link as={NavLink} to="/products" exact="true">All Products</Nav.Link>
                        <Nav.Link as={NavLink} to="/products/prescription" exact="true">Prescription</Nav.Link>
                        <Navbar.Brand className='mx-4 d-none d-lg-block' as={NavLink} to="/" exact="true">
                            <img src={logo} className='img-fluid' style={{ width: "150px" }} />
                        </Navbar.Brand>
                        <Nav.Link as={NavLink} to="/products/sunglasses" exact="true">Sun Glasses</Nav.Link>
                        <Nav.Link as={NavLink} to="/products/reading" exact="true">Reading</Nav.Link>


                    </Nav>

                    <Nav className="ms-auto right-side-nav-controllers">
                        {(user.isAdmin === true) ?
                            <>
                                <Nav.Link as={NavLink} to="/dashboard" exact="true">Dashboard</Nav.Link>

                            </>

                            :
                            null
                        }

                        {(user.isAdmin !== true && user.id !== null) ?
                            <>
                                <Nav.Link as={NavLink} to="/profile" exact="true">Profile</Nav.Link>
                                <Nav.Link as={NavLink} to="/orders" exact="true">Orders</Nav.Link>
                            </>
                            : null}


                        {(user.id !== null) ?
                            <>


                                <CartToggler />
                                <Nav.Link as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
                                <Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
                            </>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
