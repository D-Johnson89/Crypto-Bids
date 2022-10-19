import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaUserCircle, FaPiggyBank, FaUserLock, FaShare, FaInfo, FaSignOutAlt, FaTrashAlt, FaHome } from 'react-icons/fa'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { useSignOut } from 'react-auth-kit'
import AuthCard from '../pages/AuthCard'

// Main User Nav Options
function Dashboard() {
    const signOut = useSignOut()
    const navigate = useNavigate()

    function logout() {
        signOut()
        navigate('/')
    }
    
    
    return (
        <Navbar variant="secondary" bg="primary" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/"><FaHome /></Navbar.Brand>
                <Navbar.Toggle aria-controls="dashboard" />
                <Navbar.Collapse id="dashboard">
                    <Nav>
                        <NavDropdown
                            id="log-options-dropdown"
                            title={<FaUserCircle />}
                            menuVariant="info"
                        >
                            <NavDropdown.Item>
                                <Link to="/authCard">
                                    <AuthCard />
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to="/addressBook">
                                    <FaPiggyBank />Withdrawal Address
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to="/changePW">
                                    <FaUserLock />Change Password
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to="/invitation">
                                    <FaShare />VIP Level
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to="/aboutUs">
                                    <FaInfo />About Us
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to="/deleteAcc">
                                    <FaTrashAlt />Delete Account
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Button variant="primary" onClick={() => logout()}>
                                    <FaSignOutAlt />Logout
                                </Button>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Dashboard