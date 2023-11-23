import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LogoApp from "../assets/images/logo192.png";
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext.js';

const Header = (props) => {
    const { logout, user } = useContext(UserContext);

    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/");
        toast.success("Logout success");
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">
                    <img src={LogoApp} width="30" height="30" className="d-inline-block align-top" alt="React Bootstrap logo" /> <span>Ngoc's App</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {(user && user.auth || window.location.pathname === "/") &&
                        <>
                            <Nav className="me-auto">
                                <NavLink to="/" className="nav-link" >Home</NavLink>
                                <NavLink to="/users" className="nav-link" >Manage users</NavLink>
                            </Nav>
                            <Nav>
                                {user && user.email && <span className='nav-link'>Welcome {user.email}</span>}
                                <NavDropdown title="Setting" id="basic-nav-dropdown">
                                    {user && user.auth ?
                                        <NavDropdown.Item onClick={() => handleLogout()} >Logout</NavDropdown.Item> :
                                        <NavLink to="/login" className="dropdown-item" >Login</NavLink>}


                                </NavDropdown>
                            </Nav>
                        </>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}
export default Header;