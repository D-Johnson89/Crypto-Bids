import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaUserCircle, FaPiggyBank, FaUserLock, FaShare, FaInfo, FaSignOutAlt, FaTrashAlt, FaHome } from 'react-icons/fa'
import NavbarBrand from 'react-bootstrap/esm/NavbarBrand'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { useSignOut, useAuthUser } from 'react-auth-kit'
import AuthCard from '../pages/AuthCard'

// Main User Nav Options
function Dashboard() {
    const signOut = useSignOut()
    const auth = useAuthUser()
    const navigate = useNavigate()

    function logout() {
        signOut()
        navigate('/')
    }
    
    
    return (
        <Navbar variant="secondary" bg="primary" expand="lg">
            <Container fluid>
                <NavbarBrand.Brand href="/"><FaHome /></NavbarBrand.Brand>
                <NavbarBrand.Toggle aria-controls="dashboard" />
                <NavbarBrand.Collapse id="dashboard">
                    <Nav>
                        <NavDropdown
                            id="log-options-dropdown"
                            title={<FaUserCircle />}
                            menuVariant="info"
                        >
                            <NavDropdown.Item href="#">
                                <Link to="/card">
                                    <AuthCard />
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#">
                                <Link to="/addressBook">
                                    <FaPiggyBank />Withdrawal Address
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#">
                                <Link to="/changePW">
                                    <FaUserLock />Change Password
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#">
                                <Link to="/invitation">
                                    <FaShare />VIP Level
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#">
                                <Link to="/aboutUs">
                                    <FaInfo />About Us
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#">
                                <Link to="/deleteAcc">
                                    <FaTrashAlt />Delete Account
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#">
                                <Button variant="primary" onClick={() => logout()}>
                                    <FaSignOutAlt />Logout
                                </Button>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </NavbarBrand.Collapse>
            </Container>
        </Navbar>
    )
}

export default Dashboard