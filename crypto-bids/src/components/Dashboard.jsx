import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUserCircle, FaPiggyBank, FaUserLock, FaInfo, FaSignOutAlt, FaTrashAlt, FaHome } from 'react-icons/fa'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import AuthCard from '../pages/AuthCard'
import { useSignOut } from 'react-auth-kit'

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
                <Navbar.Brand onClick={() => {navigate('/')}}><FaHome /></Navbar.Brand>
                <Navbar.Toggle aria-controls="dashboard" />
                <Navbar.Collapse id="dashboard">
                    <Nav>
                        <NavDropdown
                            id="log-options-dropdown"
                            title={<FaUserCircle />}
                            menuVariant="info"
                        >
                            <NavDropdown.Item onClick={() => { navigate('/authCard')}} >
                                <AuthCard bool={false} />
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => { navigate('/addressBook')}} >
                                <FaPiggyBank />Withdrawal Address
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => { navigate('/changePW')}} >
                                <FaUserLock />Change Password
                            </NavDropdown.Item>
                            {/*<NavDropdown.Item onClick={() => { navigate('/invitation')}} >
                                <FaShare />VIP Level
                            </NavDropdown.Item>*/}
                            <NavDropdown.Item onClick={() => { navigate('/aboutUs')}} >
                                <FaInfo />About Us
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => { navigate('/deleteAcc')}} >
                                <FaTrashAlt />Delete Account
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