import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUserCircle, FaPiggyBank, FaUserLock, FaInfo, FaSignOutAlt, FaTrashAlt, FaHome } from 'react-icons/fa'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useSignOut } from 'react-auth-kit'
import { useAuthUser } from 'react-auth-kit'

// Main User Nav Options
function Dashboard() {
    const signOut = useSignOut()
    const navigate = useNavigate()
    const auth = useAuthUser()
    const user = auth().user


    function logout() {
        signOut()
        navigate('/')
    }

    const Card = () => {
        return (
            <Stack gap={3}>
                <div>
                    <Row>
                        <Col>Username</Col>
                        <Col>{user.username}</Col>
                    </Row>
                </div>
                <div>
                    <Row>
                        <Col>Balance</Col>
                        <Col>{user.balances.tether}</Col>
                    </Row>
                </div>
            </Stack>
        )
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
                                <Card />
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => { navigate('/addressBook')}} >
                                <FaPiggyBank />Withdrawal Address
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => { navigate('/changePW')}} >
                                <FaUserLock />Change Password
                            </NavDropdown.Item>
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